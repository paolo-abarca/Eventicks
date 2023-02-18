#!/usr/bin/python3
"""
RestFul API that is responsible for verifying if
the users are in the database to be able
to enter the system
"""
from api.views import app_views
from flask import jsonify, abort, request
from models import storage
import hashlib


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

    return jsonify(user_found["id"]), 200
