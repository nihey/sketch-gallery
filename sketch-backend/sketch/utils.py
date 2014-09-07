# -*- coding: utf-8 -*-

import json

from flask import make_response, session


class Settable(object):

    def __init__(self, **kwargs):
        for key, value in kwargs.iteritems():
            setattr(self, key, value)


def json_response(status_code, json_dict):
    response = make_response(json.dumps(json_dict))
    response.status_code = status_code
    response.content_type = 'application/json'
    return response


def is_logged_in():
    return 'username' in session and 'id' in session
