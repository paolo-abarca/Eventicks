#!/usr/bin/python3
"""
Module that defines the Ticket class
"""
from models.base_model import BaseModel


class Ticket(BaseModel):
    """
    This class defines a ticket
    by various attributes
    """
    currency = ""
    type = ""
    amount_ticket = 0
    price = 0
    id_event = 0
