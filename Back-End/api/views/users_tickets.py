#!/usr/bin/python3
"""
Methods that handle all default
RestFul API actions for users_tickets
"""
from api.views import app_views
from flask import jsonify, abort, request
from models.user_ticket import User_Ticket
from models import storage
from .utils import verify_user_id


@app_views.route("/users/<user_id>/my_tickets", methods=['GET'],
                 strict_slashes=False)
def get_my_tickets(user_id=None):
    """
    Method that returns all tickets purchased by a user
    """
    auth_error = comprobation_token_user(user_id)
    if auth_error:
        return auth_error

    user = storage.get("user", int(user_id))
    if not user:
        return "User not found", 404

    return jsonify(User_Ticket.my_tickets(user_id)), 200


@app_views.route("/buy_tickets", methods=['POST'],
                 strict_slashes=False)
def post_buy_tickets():
    """
    Method that link user ticket
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    obligatory = ["id_user", "id_ticket", "amount"]
    data_result = request.get_json()

    for data in data_result:
        for needed in obligatory:
            if needed not in data:
                return "Missing {}".format(needed), 400

        auth_error = comprobation_token_user(data["id_user"])
        if auth_error:
            return auth_error

        user = storage.get("user", int(data["id_user"]))
        if not user:
            return "User not found", 400

        ticket = storage.get("ticket", int(data["id_ticket"]))
        if not ticket:
            return "Ticket not found", 400

        instance = User_Ticket(**data)
        instance.new('sp_add_user_ticket')

    return "Successful Purchase", 201


@app_views.route("/category", methods=['GET'],
                 strict_slashes=False)
def get_all_categorys():
    """
    Method that returns all categories
    """
    list_categorys = []
    categorys = storage.all("category")

    for category in categorys:
        list_categorys.append(storage.to_dict("Category", category))

    return jsonify(list_categorys), 200


def comprobation_token_user(user_id):
    """
    Method that checks if the token is inside the request,
    if it is authorized or if the token has expired for users
    """
    auth_header = request.headers.get('Authorization')

    if auth_header:
        token = auth_header.split(" ")[1]
        current_user_id = verify_user_id(token)
    else:
        return 'Token is missing!', 401

    if current_user_id:
        if current_user_id != int(user_id):
            return 'Unauthorized access', 401
    else:
        return 'Expired Token', 401

    return None
