#!/usr/bin/python3
"""
Module that defines the User_Ticket class
"""
from models.base_model import BaseModel
from models import storage


class User_Ticket(BaseModel):
    """
    This class defines a user_ticket
    by various attributes
    """
    id_user = 0
    id_ticket = 0
    amount = 0

    @staticmethod
    def my_tickets(id_user):
        """
        Method that returns all tickets purchased by a user
        """
        query = "SELECT user.name_user, user.last_name, user.document_type, \
                user.number_document, ticket.type, user_ticket.amount, \
                event.id, event.name_event, event.photo_event, \
                event.date_start, event.start_time, event.date_end, \
                event.end_time, event.restriction, event.city, event.address \
                FROM user INNER JOIN user_ticket ON user.id = \
                user_ticket.id_user INNER JOIN ticket ON \
                user_ticket.id_ticket = ticket.id INNER JOIN event ON \
                ticket.id_event = event.id WHERE user_ticket.id_user = {} \
                ORDER BY user_ticket.id DESC;".format(id_user)

        list_result = []

        storage.cursor.execute(query)
        tupla = storage.cursor.fetchall()
        for ticket in list(tupla):
            ticket = storage.to_dict("Ticket", ticket)
            list_result.append(ticket)

        return list_result
