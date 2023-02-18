#!/usr/bin/python3
"""
Module that defines the Event class
"""
from models.base_model import BaseModel
from models import storage


class Event(BaseModel):
    """
    This class defines a event
    by various attributes
    """
    id_user = 0
    name_event = ""
    id_category = 0
    description = ""
    information = ""
    photo_event = ""
    video = ""
    date_start = ""
    start_time = ""
    date_end = ""
    end_time = ""
    visibility = ""
    restriction = 0
    city = ""
    address = ""
    reference = ""

    @staticmethod
    def get_all_event():
        """
        Method that returns all events for the main page
        """
        list_result = []

        query = "SELECT id, photo_event, name_event, date_start, start_time, \
                date_end, end_time FROM event WHERE visibility = 'yes' \
                ORDER BY id DESC;"

        storage.cursor.execute(query)
        tupla = storage.cursor.fetchall()
        for event in tupla:
            id = event["id"]
            query = "SELECT ticket.currency, MIN(ticket.price) as price FROM \
                    ticket INNER JOIN event ON ticket.id_event = event.id \
                    WHERE event.id = {} GROUP BY ticket.currency;".format(id)
            storage.cursor.execute(query)
            tupla = storage.cursor.fetchall()
            event["currency"] = tupla[0]["currency"]
            event["price"] = tupla[0]["price"]
            list_result.append(event)

        return list_result

    @staticmethod
    def get_event_and_ticket(id_event):
        """
        Method that returns an event and its tickets
        """
        query = "SELECT event.id, event.name_event, event.description, \
                event.information, event.photo_event, event.video, \
                event.date_start, event.start_time, event.date_end, \
                event.end_time, event.restriction, event.city, event.address, \
                event.reference, user.name_user, user.last_name, \
                user.photo_user FROM event INNER JOIN user ON user.id = \
                event.id_user WHERE event.id = {}".format(id_event)

        storage.cursor.execute(query)
        tupla = storage.cursor.fetchall()
        dic_result = storage.to_dict("Event", tupla[0])

        query = "SELECT ticket.id, ticket.currency, ticket.type, \
                ticket.amount_ticket, ticket.price FROM ticket WHERE \
                ticket.id_event = {}".format(id_event)

        list_tickets = []
        storage.cursor.execute(query)
        tupla = storage.cursor.fetchall()
        for ticket in list(tupla):
            list_tickets.append(storage.to_dict("Ticket", ticket))

        dic_result["tickets"] = list_tickets

        return dic_result

    @staticmethod
    def my_events(id_user):
        """
        Method that returns all the events and their tickets of a user
        """
        query = "SELECT * FROM event WHERE id_user = {} ORDER \
                BY id DESC;".format(id_user)
        list_result = []

        storage.cursor.execute(query)
        tupla = storage.cursor.fetchall()
        for event in list(tupla):
            id_event = event["id"]
            event = storage.to_dict("Event", event)

            query = "SELECT * FROM ticket WHERE ticket.id_event \
                    = {}".format(id_event)
            list_tickets = []

            storage.cursor.execute(query)
            tupla = storage.cursor.fetchall()
            for ticket in list(tupla):
                list_tickets.append(storage.to_dict("Ticket", ticket))

            event["tickets"] = list_tickets
            list_result.append(event)

        return list_result
