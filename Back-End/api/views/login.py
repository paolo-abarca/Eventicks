#!/usr/bin/python3
"""
RestFul API that is responsible for verifying if
the users are in the database to be able
to enter the system
"""
from api.views import app_views
from flask import jsonify, abort, request, make_response
from models import storage
import hashlib
import jwt
import os
import time


@app_views.route("/login", methods=['POST'],
                 strict_slashes=False)
def login_user():
    """
    Method that verifies if a user can access
    the system through their email and password
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    obligatory = ["email", "password"]

    for needed in obligatory:
        if needed not in request.get_json():
            return "Missing {}".format(needed), 400

    data = request.get_json()
    email_user = data["email"]
    pwd_user = data["password"]

    user_found = storage.verify('user', email_user)
    if not user_found:
        return "Email Not Found", 404

    encrypt_pwd = hashlib.md5(pwd_user.encode())
    pwd_user = encrypt_pwd.hexdigest()

    if not user_found["password"] == pwd_user:
        return "Password Incorrect", 401

    token = generate_token(user_found["id"])
    response = make_response(jsonify({'token': token}), 200)
    response.headers['Authorization'] = f'Bearer {token}'

    return response


def generate_token(user_id):
    """
    Generates a JWT token for the given user ID
    """
    secret_key = os.environ.get('SECRET_KEY')
    exp_time = int(time.time()) + 120
    token = jwt.encode({'user_id': user_id, 'exp': exp_time},
                       secret_key, algorithm='HS256')
    return token.decode('utf-8')
