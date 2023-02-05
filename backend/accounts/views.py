from urllib.parse import urlencode

from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from django.urls import reverse
from django.conf import settings
from django.shortcuts import redirect
import requests
from django.core.exceptions import ValidationError


def google_get_access_token(*, code, redirect_uri):
    # Reference: https://developers.google.com/identity/protocols/oauth2/web-server#obtainingaccesstokens
    
    GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://accounts.google.com/o/oauth2/token'
    # GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'

    data = {
        'code': code,
        'client_id': settings.GOOGLE_CLIENT_ID,
        'client_secret': settings.GOOGLE_CLIENT_SECRET,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    print(data)
    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)
    for x in response:
        print(x)

    if not response.ok:
        raise ValidationError('Failed to obtain access token from Google.')

    access_token = response.json()['access_token']

    return access_token

def google_get_user_info(*, access_token):
    # Reference: https://developers.google.com/identity/protocols/oauth2/web-server#callinganapi
    GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )
    if not response.ok:
        raise ValidationError('Failed to obtain user info from Google.')

    return response.json()



class GoogleLoginApi(APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error') 
        print(code)
        login_url = f'{settings.FRONTEND_BASE_URL}login'

        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')

        domain = "http://localhost:3000"
        api_uri = "/signup/"
        redirect_uri = f'{domain}{api_uri}'

        access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)

        profile_data = {
            'email': user_data['email'],
            'name': user_data['name'],
            'first_name': user_data['given_name'],
            'last_name': user_data['family_name'],
            'profile_picture' : user_data['picture']
        }
        print(user_data)
        print(settings.FRONTEND_BASE_URL)


        return Response(user_data, status=status.HTTP_201_CREATED)
    


    