#!/usr/bin/python3
"""
This module defines a base class
for all models
"""
import hashlib
import models


class BaseModel:
    """
    The BaseModel class contains methods
    needed by the other classes
    """
    def __init__(self, *args, **kwargs):
        """
        Method that sets a json to an object
        """
        if kwargs:
            for key, value in kwargs.items():
                setattr(self, key, value)

    def new(self, procedure):
        """
        Method that sends the dictionary full of object information
        to the create method of Db_storage. If the dictionary contains
        (password) then it is encrypted with hashlib and then sent
        """
        dict_result = self.__dict__.copy()

        if 'password' in dict_result:
            encrypt_pwd = hashlib.md5(dict_result['password'].encode())
            dict_result['password'] = encrypt_pwd.hexdigest()

        if procedure == "sp_add_event":
            event_id = models.storage.create(dict_result, procedure)
            return event_id

        else:
            models.storage.create(dict_result, procedure)
