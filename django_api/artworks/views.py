import random
import string
import pandas as pd

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

from rest_framework import viewsets
from rest_framework.generics import ListAPIView

from . import emotion
from .contents_based_recommendation import weighted_rating, find_recommended_work
from .serializers import ArtworkSerializer, ArtworkMainSerializer
from .models import Artwork


# artworks/
class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer


# artworks/search
class ArtworkSearchViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        level = self.request.query_params.get('level')
        query = self.request.query_params.get('query')

        queryset = Artwork.objects.filter(level=level, title__contains=query)

        return queryset


# artworks/list
class ArtworkListViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkMainSerializer

    def get_queryset(self):
        level = self.request.query_params.get('level')
        category = self.request.query_params.get('category')
        order = self.request.query_params.get('order')
        queryset = Artwork.objects.filter(level=level, category=category)

        if order == 'popular':
            queryset = queryset.order_by('-like_count')

        return queryset


# artworks/popular
class ArtworkPopularViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkMainSerializer

    def get_queryset(self):
        level = self.request.query_params.get('level')
        queryset = Artwork.objects.filter(level=level).order_by('-like_count')

        return queryset


# artworks/recommend
class ArtworkRecommendViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        queryset = Artwork.objects.all()
        target_artwork = self.request.query_params.get('id')

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

        return Artwork.objects.filter(id__in=similar_work)


# artworks/data
class ArtworkDataViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        queryset = Artwork.objects.all()

        string_pool = string.ascii_letters + string.digits
        email_pool = ['@gmail.com', '@naver.com', '@daum.net']
        category_pool = ['art', 'music', 'literal']
        level_pool = ['pro', 'adv', 'nov']
        for _ in range(5):
            artist_email = ""
            for _ in range(random.randint(4, 12)):
                artist_email += random.choice(string_pool)
            artist_email += random.choice(email_pool)
            category = random.choice(category_pool)
            title = ""
            for _ in range(random.randint(4, 12)):
                title += random.choice(string_pool)
            like_count = random.randint(0, 10)
            view_count = random.randint(1, 10000)
            level = random.choice(level_pool)
            artist_nickname = ""
            for _ in range(random.randint(4, 10)):
                artist_nickname += random.choice(string_pool)

            size = random.randint(3, 7)
            index = set()
            while len(index) != size:
                index.add(random.randint(0, len(emotion.tag) - 1))

            index = [emotion.tag[i] for i in index]
            hashtag = ' '.join(index)

            Artwork.objects.create(artist_email=artist_email,
                                   category=category,
                                   title=title,
                                   like_count=like_count,
                                   view_count=view_count,
                                   level=level,
                                   artist_nickname=artist_nickname,
                                   hashtag=hashtag)
        return queryset
