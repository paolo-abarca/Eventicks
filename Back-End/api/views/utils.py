#!/usr/bin/python3
"""
Implementing methods that verify a JWT token
"""
import jwt
import os


SECRET_KEY = os.environ.get('SECRET_KEY')


def verify_user_id(token):
    """
    Decode token and get user id
    """
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'],
                             verify_exp=True)
        user_id = decoded['user_id']
    except jwt.exceptions.ExpiredSignatureError:
        user_id = None
    except jwt.exceptions.InvalidSignatureError:
        user_id = None
    return user_id


def verify_token(token):
    """
    Check if the token is valid
    """
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'],
                             verify_exp=True)
        return True
    except jwt.exceptions.ExpiredSignatureError:
        return False
    except jwt.exceptions.InvalidSignatureError:
        return False
