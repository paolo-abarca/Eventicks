#!/usr/bin/python3
"""
Methods that handle all default
RestFul API actions for users_tickets
"""
from api.views import app_views
from flask import jsonify, abort, request
from models.user_ticket import User_Ticket
from models import storage


@app_views.route("/users/<user_id>/my_tickets", methods=['GET'],
                 strict_slashes=False)
def get_my_tickets(user_id=None):
    """
    Method that returns all tickets purchased by a user
    """
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
