#!/usr/bin/python3
"""
Module that connects to the database
"""
import MySQLdb
import MySQLdb.cursors
import hashlib


class DBStorage():
    """
    Class that interacts with
    the MySQL database
    """
    def __init__(self):
        """
        Method that initializes the
        connection to the database
        """
        self.db = MySQLdb.connect(user='root', password='root',
                                  db='eventicks_db', host='localhost',
                                  port=3306,
                                  cursorclass=MySQLdb.cursors.DictCursor)

        self.cursor = self.db.cursor()

    def all(self, tablename):
        """
        Method that consults in the current session
        of the database and returns all the data
        of the indicated table
        """
        query = "SELECT * FROM {} ORDER BY id DESC;".format(tablename)
        self.cursor.execute(query)
        tupla = self.cursor.fetchall()

        return list(tupla)

    def delete(self, tablename, id):
        """
        Method that receives the name of the
        table and the id of the data that I want
        to delete from the database
        """
        self.cursor.execute("DELETE FROM {} WHERE id={};".format(tablename,
                                                                 id))
        self.db.commit()

    def create(self, dic, procedure):
        """
        Method that adds values to the
        indicated table of the current session
        """
        lis = []

        for values in dic.values():
            lis.append(values)

        if procedure == "sp_add_event":
            self.cursor.callproc(procedure, lis)
            event_id = self.cursor.fetchone()["LAST_INSERT_ID()"]
            self.cursor.nextset()
            self.db.commit()
            return event_id

        self.cursor.callproc(procedure, lis)
        self.db.commit()

    def update(self, dic, id, procedure):
        """
        Method that receives a dictionary from
        the api and an id, to update its indicated data
        """
        lis = []
        lis.append(id)

        black_list = ["id", "created_at", "updated_at"]

        for ignore in black_list:
            if ignore in dic:
                del dic[ignore]

        if "password" in dic:
            encrypt_pwd = hashlib.md5(dic['password'].encode())
            dic['password'] = encrypt_pwd.hexdigest()

        for values in dic.values():
            lis.append(values)

        self.cursor.callproc(procedure, lis)
        self.db.commit()

    def verify(self, tablename, email):
        """
        Method that checks if an
        email is in the database
        """
        query = "SELECT * FROM {} WHERE email='{}'".format(tablename, email)

        self.cursor.execute(query)
        tupla = self.cursor.fetchall()
        if len(tupla) > 0:
            return tupla[0]

        return False

    def get(self, tablename, id):
        """
        Method that obtains and returns the values
        of a single object of the current session
        """
        if tablename is None and id is None:
            return None

        query = "SELECT * FROM {} WHERE id = {}".format(tablename, id)

        self.cursor.execute(query)
        tupla = self.cursor.fetchall()
        if len(tupla) > 0:
            return tupla[0]

        return None

    def to_dict(self, cls_name=None, dic={}):
        """
        Method that returns a dictionary
        to be displayed in the APIs
        """
        dic["__class__"] = cls_name

        if "password" in dic:
            del dic["password"]

        return dic

    def count(self):
        """
        Method that returns a dictionary with all
        the tables and the number of their records
        """
        query = "SELECT table_name, table_rows FROM INFORMATION_SCHEMA.TABLES \
                 WHERE TABLE_SCHEMA = 'eventicks_db'"

        self.cursor.execute(query)
        tupla = self.cursor.fetchall()

        dict_result = {}
        for dictionary in tupla:
            values = list(dictionary.values())
            dict_result[values[0]] = values[1]

        return dict_result
