import random
import string
import pandas as pd
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

from rest_framework import viewsets, generics, status
from rest_framework.generics import ListAPIView

from . import emotion
from .contents_based_recommendation import find_recommended_work, weighted_rating, \
    find_recommended_work_sorted_by_rating
from .paginations import MainPagination, RecommendationPagination, PopularPagination
from .serializers import ArtworkCommentSerializer, ArtworkSerializer, ArtworkPopularSerializer, CommentSerializer, \
    CommentIncludeNicknameSerializer
from .models import Artwork, Comment, RecentView, Image, File, FavoriteArtwork

from users.serializers import UserSerializer, RecentViewSerializer, FavoriteArtworkSerializer

from .utils import EnablePartialUpdateMixin


class ArtworkViewSet(EnablePartialUpdateMixin, viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    parser_classes = (MultiPartParser, )

    def create(self, request):
        request.data._mutable = True
        print(request.data)
        files_data = request.data.pop('file')

        artist = request.data.pop('artist')
        data = request.data.dict()
        file_category = data['file_category']

        artwork = Artwork.objects.create(
                                        category=data['category'],
                                        title=data['title'],
                                        like_count=data['like_count'],
                                        view_count=data['view_count'],
                                        description=data['description'],
                                        thumbnail_img=data['thumbnail_img'],
                                        file_category=data['file_category'],
                                        hashtag=data['hashtag'],
                                        artist=get_user_model().objects.get(nickname=artist[0])
                                       )
        if file_category == "image/*":
            for file_data in files_data:
                Image.objects.create(artwork=artwork, upload_file=file_data)
        else:
            for file_data in files_data:
                File.objects.create(artwork=artwork, upload_file=file_data)

        return Response(ArtworkSerializer(artwork).data, status=status.HTTP_201_CREATED)


# artworks/search
class ArtworkSearchViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        level = self.request.query_params.get('level')
        query = self.request.query_params.get('query')
        hash = self.request.query_params.get('hash')

        # if hash == 'True':
        #     return Artwork.objects.filter(artist__artist_level=level, hashtag__contains=query)
        # else:
        return Artwork.objects.filter(
                Q(artist__artist_level=level) &
                (Q(title__contains=query) | Q(artist__nickname__contains=query)| Q(hashtag__contains=query))
            )



# artworks/list
class ArtworkListViewSet(ListAPIView):
    queryset = Artwork.objects.select_related('artist')
    serializer_class = ArtworkSerializer
    pagination_class = MainPagination

    def get_queryset(self):
        level = self.request.query_params.get('level')
        category = self.request.query_params.get('category')
        order = self.request.query_params.get('order')
        queryset = Artwork.objects.filter(artist__artist_level=level, category=category).order_by('-id')

        if order == 'popular':
            queryset = queryset.order_by('-like_count')

        return queryset


# artworks/popular
class ArtworkPopularViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkPopularSerializer
    pagination_class = PopularPagination

    def get_queryset(self):
        level = self.request.query_params.get('level')
        queryset = Artwork.objects.filter(artist__artist_level=level).order_by('-like_count')

        return queryset


# artworks/byartist
class ArtworkByArtistViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        nickname = self.request.query_params.get('nickname')
        queryset = Artwork.objects.filter(artist__nickname=nickname)

        return queryset


# artworks/recommend
class ArtworkRecommendViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    pagination_class = RecommendationPagination

    def get_queryset(self):
        queryset = Artwork.objects.all()
        target_artwork = 1

        if not self.request.user.is_anonymous:
            artist_id = self.request.user.pk
            artist = RecentView.objects.filter(user=artist_id)
            if len(list(artist.values_list('recent', flat=True))) != 0:
                target_artwork = list(artist.values_list('recent', flat=True))[-1]

        print(target_artwork)

        artwork_id = [index for index in range(1, queryset.count() + 1)]
        title = list(queryset.values_list('title', flat=True))
        rating = list(queryset.values_list('rating', flat=True))
        rating_count = list(queryset.values_list('rating_count', flat=True))
        hashtag = list(queryset.values_list('hashtag', flat=True))
        for index, value in enumerate(rating):
            if rating_count[index] != 0:
                rating[index] = float(rating[index] / rating_count[index])

        d = {
            'id': artwork_id,
            'title': title,
            'rating': rating,
            'rating_count': rating_count,
            'hashtag': hashtag
        }
        artwork_df = pd.DataFrame(data=d)
        # artwork_df = artwork_df.sort_values(['id']).reset_index(drop=True)
        print(artwork_df)
        cnt_vector = CountVectorizer(min_df=0, ngram_range=(1, 2))
        tag_vector = cnt_vector.fit_transform(hashtag)
        tag_sim = cosine_similarity(tag_vector, tag_vector)
        tag_sim_idx = tag_sim.argsort(axis=1)

        artwork_df['weighted_rating'] = weighted_rating(artwork_df)
        target_artwork = artwork_id.index(int(target_artwork))

        similar_work_sorted_by_rating = find_recommended_work_sorted_by_rating(artwork_df, tag_sim_idx,
                                                                               work_num=target_artwork).iloc[::-1]
        print(target_artwork)
        print(artwork_df['id'][target_artwork])
        print("{:<10}\t{:10}\t\t{:10}\t\t{:10}\t{:}\t\t{:}"
              .format('title', 'weight_rating', ' rating', '  count', 'cosine similarity', 'hashtag'))

        print('-' * 100)
        s = "{:<10}\t{:^10}\t{:^10}\t{:^10}\t{:^10}\t\t{:}"
        for index, work in similar_work_sorted_by_rating.iterrows():
            print(s.format(work['title'], str(work['weighted_rating']), rating[index], rating_count[index],
                           str(tag_sim[target_artwork][index]), work['hashtag'], ))

        similar_work_sorted_by_rating = similar_work_sorted_by_rating['id'].tolist()
        print(similar_work_sorted_by_rating)

        return Artwork.objects.filter(id__in=similar_work_sorted_by_rating).order_by('-id')


# artworks/data
class ArtworkDataViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    flag = 0

    def get_queryset(self):
        queryset = Artwork.objects.all()

        if self.flag == 1:
            self.flag = 0
            return queryset
        self.flag = 1

        string_pool = string.ascii_letters + string.digits
        category_pool = ['art', 'music', 'literal']
        img_pool = ['default_image.jpeg']
        for i in range(0, 61):
            img_pool.append('img/thumbnail' + str(i) + '.jpeg')
        artist_size = get_user_model().objects.all().count()

        for _ in range(3000):
            category = random.choice(category_pool)
            title = ""
            for _ in range(random.randint(4, 12)):
                title += random.choice(string_pool)
            like_count = random.randint(0, 10)
            view_count = random.randint(1, 10000)
            rating = random.randint(0, 10000)
            rating_count = random.randint(int(rating / 5), rating)

            size = random.randint(2, 5)
            index = set()
            while len(index) != size:
                index.add(random.randint(0, len(emotion.tag) - 1))

            index = [emotion.tag[i] for i in index]
            hashtag = ' '.join(index)
            artist_id = random.randint(2, artist_size)
            thumbnail_img = random.choice(img_pool)
            artwork = Artwork.objects.create(category=category,
                                    title=title,
                                    like_count=like_count,
                                    view_count=view_count,
                                    rating=rating,
                                    rating_count=rating_count,
                                    hashtag=hashtag,
                                    file_category="image/*",
                                    thumbnail_img=thumbnail_img,
                                    artist=get_user_model().objects.get(id=artist_id)
                                   )
            Image.objects.create(artwork=artwork, upload_file=thumbnail_img)
        return queryset


class InfoAPI(generics.ListAPIView):
    #permission_classes = (IsAuthenticated, )
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class RecentViewSet(viewsets.ModelViewSet):
    queryset = RecentView.objects.all()
    serializer_class = RecentViewSerializer


class MyRecentViewSet(ListAPIView):
    queryset = RecentView.objects.all()
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('id')
        recent_view_list = list(RecentView.objects.filter(user=user_id).values_list('recent', flat=True))

        return Artwork.objects.filter(id__in=recent_view_list)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentListViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkCommentSerializer


class CommentGetViewSet(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentIncludeNicknameSerializer

    def get_queryset(self):
        return Comment.objects.filter(artwork=self.kwargs['artwork'])


class FavoriteArtworkViewSet(viewsets.ModelViewSet):
    queryset = FavoriteArtwork.objects.all()
    serializer_class = FavoriteArtworkSerializer


class MyFavoriteArtworkViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('id')
        favorite_artwork_list = list(FavoriteArtwork.objects.filter(user=user_id).values_list('artwork', flat=True))

        return Artwork.objects.filter(id__in=favorite_artwork_list)