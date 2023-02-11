#!/usr/bin/python3
"""
Methods that handle all default
RestFul API actions for users
"""
from api.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.user import User
import re


@app_views.route("/users/<user_id>", methods=['GET'],
                 strict_slashes=False)
def get_user_id(user_id=None):
    """
    Method that returns the values of
    a user by means of their ID
    """
    user = storage.get("user", int(user_id))
    if not user:
        abort(400, description="User not found")

    return jsonify(storage.to_dict("User", user))


@app_views.route("/users/<user_id>", methods=['DELETE'],
                 strict_slashes=False)
def delete_user(user_id=None):
    """
    Method that deletes a user by their ID
    """
    user = storage.get("user", int(user_id))
    if not user:
        abort(400, description="User not found")

    storage.delete("user", int(user_id))

    return jsonify({"message": "User Deleted"}), 200


@app_views.route("/users", methods=['POST'],
                 strict_slashes=False)
def post_user():
    """
    Method that creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    obligatory = ["name", "last_name", "email", "password",
                  "phone", "country", "city", "gender"]

    for needed in obligatory:
        if needed not in request.get_json():
            abort(400, description="Missing {}".format(needed))

    data = request.get_json()
    email_user = data["email"]

    regex = r"^[A-Za-z0-9.+-_]+@[A-Za-z0-9.-]+.[a-zA-Z]*$"
    if not re.search(regex, email_user):
        abort(400, description="Invalid Email")

    comprobation = storage.verify('user', email_user)
    if comprobation:
        abort(400, description="Email has already been used")

    instance = User(**data)
    instance.new('sp_add_user')

    return jsonify({'message': 'Registered User'}), 201


@app_views.route('/users/<user_id>', methods=['PUT'],
                 strict_slashes=False)
def put_user(user_id=None):
    """
    Method that updates a user by their ID
    """
    user = storage.get("user", int(user_id))
    if not user:
        abort(400, description="User not found")

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()

    if 'email' in data:
        email_user = data["email"]

        regex = r"^[A-Za-z0-9.+-_]+@[A-Za-z0-9.-]+.[a-zA-Z]*$"
        if not re.search(regex, email_user):
            abort(400, description="Invalid Email")

        comprobation = storage.verify('user', email_user)
        if comprobation:
            abort(400, description="Email has already been used")

    for key, value in data.items():
        for key_2 in user.keys():
            if key not in ignore:
                if key == key_2:
                    user[key] = value

    storage.update(user, user_id, "sp_update_user")
    return jsonify({'message': 'Updated User'}), 200
