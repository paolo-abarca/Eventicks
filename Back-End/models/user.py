#!/usr/bin/python3
"""
Module that defines the User class
"""
from models.base_model import BaseModel


class User(BaseModel):
    """
    This class defines a user
    by various attributes
    """
    name = ""
    last_name = ""
    email = ""
    password = ""
    phone = 0
    country = ""
    city = ""
    gender = ""
    photo = ""
    document_type = ""
    number_document = 0
