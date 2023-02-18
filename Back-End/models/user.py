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
    name_user = ""
    last_name = ""
    email = ""
    password = ""
    phone = 0
    country = ""
    city = ""
    gender = ""
    photo_user = ""
    document_type = ""
    number_document = 0
