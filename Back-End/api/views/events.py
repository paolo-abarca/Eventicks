#!/usr/bin/python3
"""
Methods that handle all default
RestFul API actions for events
"""
from api.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.event import Event
from models.ticket import Ticket


@app_views.route("/events", methods=['GET'],
                 strict_slashes=False)
def get_events_all():
    """
    Method that returns the list of all events
    """
    events = Event.get_all_event()
    return jsonify(events), 200


@app_views.route("/events/<event_id>", methods=['GET'],
                 strict_slashes=False)
def get_event_id(event_id=None):
    """
    Method that returns the values of
    a event by means of their ID
    """
    event = storage.get("event", int(event_id))
    if not event:
        return "Event not found", 404

    return jsonify(Event.get_event_and_ticket(event_id)), 200


@app_views.route("/users/<user_id>/my_events", methods=['GET'],
                 strict_slashes=False)
def get_my_events(user_id=None):
    """
    Method that returns the events created by a user
    """
    user = storage.get("user", int(user_id))
    if not user:
        return "User not found", 404

    return jsonify(Event.my_events(user_id)), 200


@app_views.route("/events/<event_id>", methods=['DELETE'],
                 strict_slashes=False)
def delete_event(event_id=None):
    """
    Method that deletes a event by their ID
    """
    event = storage.get("event", int(event_id))
    if not event:
        return "Event not found", 404

    storage.delete("event", int(event_id))

    return "Event Deleted", 204


@app_views.route("/tickets/<ticket_id>", methods=['DELETE'],
                 strict_slashes=False)
def delete_ticket(ticket_id=None):
    """
    Method that deletes a ticket by their ID
    """
    ticket = storage.get("ticket", int(ticket_id))
    if not ticket:
        return "Ticket not found", 404

    storage.delete("ticket", int(ticket_id))

    return "Ticket Deleted", 204


@app_views.route("/users/<user_id>/events", methods=['POST'],
                 strict_slashes=False)
def post_event(user_id=None):
    """
    Method that creates a event
    """
    user = storage.get("user", int(user_id))
    if not user:
        return "User not found", 400

    if not request.get_json():
        abort(400, description="Not a JSON")

    obligatory_event = ["name_event", "id_category", "description",
                        "photo_event", "date_start", "start_time",
                        "date_end", "end_time", "visibility",
                        "restriction", "city", "address"]

    data_event = {"id_user": user_id}
    data_event.update({
        k: v for k, v in request.get_json().items() if k != "tickets"
    })

    for needed in obligatory_event:
        if needed not in data_event:
            return "Missing {}".format(needed), 400

    instance = Event(**data_event)
    event_id = instance.new('sp_add_event')

    obligatory_ticket = ["currency", "type", "amount_ticket", "price"]

    data_tickets = request.get_json()["tickets"]

    for ticket in data_tickets:
        for needed in obligatory_ticket:
            if needed not in ticket:
                return "Missing {}".format(needed), 400

        ticket["id_event"] = event_id
        instance = Ticket(**ticket)
        instance.new('sp_add_ticket')

    return "Event Created", 201


@app_views.route('/events/<event_id>', methods=['PUT'],
                 strict_slashes=False)
def put_event(event_id=None):
    """
    Method that updates a event by their ID
    """
    event = storage.get("event", int(event_id))
    if not event:
        return "Event not found", 404

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at', 'id_user']

    data = request.get_json()

    for key, value in data.items():
        for key_2 in event.keys():
            if key not in ignore:
                if key == key_2:
                    event[key] = value

    storage.update(event, event_id, "sp_update_event")
    return "Updated Event", 200


@app_views.route('/tickets/<ticket_id>', methods=['PUT'],
                 strict_slashes=False)
def put_ticket(ticket_id=None):
    """
    Method that updates a ticket by their ID
    """
    ticket = storage.get("ticket", int(ticket_id))
    if not ticket:
        return "Ticket not found", 404

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at', 'id_event']

    data = request.get_json()

    for key, value in data.items():
        for key_2 in ticket.keys():
            if key not in ignore:
                if key == key_2:
                    ticket[key] = value

    storage.update(ticket, ticket_id, "sp_update_ticket")
    return "Updated Ticket", 200


@app_views.route("/events/banner", methods=['GET'],
                 strict_slashes=False)
def get_banner():
    """
    method that returns 5 random event photos for the banner
    """
    events = storage.all("event")
    return jsonify(events), 200


@app_views.route("/events/filters", methods=['POST'],
                 strict_slashes=False)
def filter_events():
    """
    Method that returns all the events that meet the indicated filters
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()

    if data.get("price_min") and data.get("price_max"):
        events = Event.filters("price", data["price_min"], data["price_max"])

    elif data.get("category_id"):
        events = Event.filters("category", data["category_id"])

    elif data.get("city_name"):
        events = Event.filters("city", data["city_name"])

    elif data.get("date_min") and data.get("date_max"):
        events = Event.filters("date", data["date_min"], data["date_max"])

    return jsonify(events), 200
