from django.conf import settings
from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.nickname = data.get('nickname')
        user.birthday = data.get('birthday')
        user.phone_number = data.get('phone_number')
        user.artist_level = data.get('artist_level')
        user.revenue = data.get('revenue')
        user.save()
        return user