import requests
from google.auth.transport import requests
from google.oauth2 import id_token
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from .models import CustomUser
import time 

class Google():
    @staticmethod
    def validate(access_token):
        try:
            time.sleep(1)
            id_info = id_token.verify_oauth2_token(access_token, requests.Request())
            print('Token Verified: ', id_info)

            # Check if the token's issuer is valid
            if 'accounts.google.com' in id_info['iss']:
                return id_info
            else:
                return "Invalid issuer"
        except ValueError as e:
            print(f"Token verification failed: {e}")
            return "The token is either invalid or has expired"




def register_social_user(provider, email, first_name, last_name):
    try:
        # Check if a user with the same email already exists
        existing_user = CustomUser.objects.get(email=email)
        
        # If the user exists, verify the auth provider
        if existing_user.auth_provider == provider:
            # Authenticate the user without a password (since it's a social login)
            login_user = existing_user  # No need to use `authenticate` for social login
            print('the user already exist')
            # Return the tokens and user info
            return {
                'full_name': login_user.get_full_name(),  # Ensure parentheses are present
                'email': login_user.email,
                'tokens': login_user.tokens()  # Assuming tokens() is defined
            }
        else:
            raise AuthenticationFailed(
                detail=f"Please continue your login with {existing_user.auth_provider}"
            )
    
    except CustomUser.DoesNotExist:
        # Register a new user if not found
        user_data = {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'password': settings.SOCIAL_AUTH_PASSWORD  # Default password for social users
        }
        
        # Create the new user
        new_user = CustomUser.objects.create_user(**user_data)
        new_user.auth_provider = provider
        new_user.is_verified = True
        new_user.save()
        
        # No need to authenticate again, use the newly created user
        login_user = new_user

        # Return the tokens and user info
        return {
            'email': login_user.email,
            'full_name': login_user.get_full_name(),
            'access_token': str(login_user.tokens().get('access')),  # Assuming tokens() is defined
            'refresh_token': str(login_user.tokens().get('refresh'))
        }
