import random
import string
import pandas as pd
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

from rest_framework import viewsets, generics
from rest_framework.generics import ListAPIView

from . import emotion
from .contents_based_recommendation import find_recommended_work
from .paginations import MainPagination, RecommendationPagination
from .serializers import ArtworkCommentSerializer, ArtworkSerializer, ArtworkPopularSerializer, CommentSerializer, \
    CommentIncludeNicknameSerializer
from .models import Artwork, Comment, RecentView

from users.serializers import UserSerializer, RecentViewSerializer


class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    parser_classes = (MultiPartParser, FormParser, )

    def perform_create(self, serializer, format=None):
        owner = self.request.user
        if self.request.data.get('file_category') == 'image/*':
            images = self.request.data.get('file')
            for image in images:
                serializer.save(owner=owner, product_image=images)
        else:
            serializer.save(owner=owner)


# artworks/search
class ArtworkSearchViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        level = self.request.query_params.get('level')
        query = self.request.query_params.get('query')

        queryset = Artwork.objects.filter(
            Q(artist__artist_level=level) &
            (Q(title__contains=query) | Q(artist__nickname__contains=query) | Q(hashtag__contains=query))
        )

        return queryset


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

    def get_queryset(self):
        level = self.request.query_params.get('level')
        queryset = Artwork.objects.filter(artist__artist_level=level).order_by('-like_count')

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
            print("I'm User")
            artist_id = self.request.user.pk
            artist = RecentView.objects.filter(user=artist_id)
            if len(list(artist.values_list('recent', flat=True))) != 0:
                target_artwork = list(artist.values_list('recent', flat=True))[-1]
            print(target_artwork)

        artwork_id = list(queryset.values_list('id', flat=True))
        title = queryset.values_list('title', flat=True)
        rating = queryset.values_list('like_count', flat=True)
        rating_count = queryset.values_list('view_count', flat=True)
        hashtag = queryset.values_list('hashtag', flat=True)

        d = {
            'id': artwork_id,
            'title': title,
            'rating': rating,
            'rating_count': rating_count,
            'hashtag': hashtag
        }
        artwork_df = pd.DataFrame(data=d)

        cnt_vector = CountVectorizer(min_df=0, ngram_range=(1, 2))
        tag_vector = cnt_vector.fit_transform(hashtag)
        tag_sim = cosine_similarity(tag_vector, tag_vector)
        tag_sim_idx = tag_sim.argsort(axis=1)

        # artwork_df['weighted_rating'] = weighted_rating(artwork_df)
        target_artwork = list(artwork_id).index(int(target_artwork))
        similar_work = find_recommended_work(artwork_df, tag_sim_idx, work_num=target_artwork).tolist()

        for index, work in enumerate(similar_work):
            similar_work[index] = artwork_id[work]

        return Artwork.objects.filter(id__in=similar_work).order_by('-id')


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
        for i in range(1, 21):
            img_pool.append('default/default_image' + str(i) + '.jpeg')
        artist_size = get_user_model().objects.all().count()

        for _ in range(1000):
            category = random.choice(category_pool)
            title = ""
            for _ in range(random.randint(4, 12)):
                title += random.choice(string_pool)
            like_count = random.randint(0, 10)
            view_count = random.randint(1, 10000)

            size = random.randint(3, 7)
            index = set()
            while len(index) != size:
                index.add(random.randint(0, len(emotion.tag) - 1))

            index = [emotion.tag[i] for i in index]
            hashtag = ' '.join(index)
            artist_id = random.randint(2, artist_size)
            file_img = random.choice(img_pool)
            Artwork.objects.create(category=category,
                                   title=title,
                                   like_count=like_count,
                                   view_count=view_count,
                                   file_img=file_img,
                                   hashtag=hashtag,
                                   artist=get_user_model().objects.get(id=artist_id)
                                   )
        return queryset


class InfoAPI(generics.ListAPIView):
    #permission_classes = (IsAuthenticated, )
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class RecentViewSet(viewsets.ModelViewSet):
    queryset = RecentView.objects.all()
    serializer_class = RecentViewSerializer


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