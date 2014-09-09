# -*- coding: utf-8 -*-

import json
import re

from flask import request
from flask.ext.restful import fields, marshal
import psycopg2

from app import api
from sketch.api.base import BaseResource
from sketch.api.decorators import FinalResource
from sketch.api.fields import DateTimeInt
from sketch.utils import json_response
from sketch.models.sketches import Sketch
from sketch.database.runtime import get_default_store


@FinalResource
class SketchResource(BaseResource):

    properties = {
        'id': fields.Integer,
        'url': fields.String,
        'email': fields.String,
        'created_on': DateTimeInt,
        'json_data': fields.String,
    }

    table = Sketch

    filters = {
        'url': Sketch.url,
        'email': Sketch.email,
    }

    def post(self):
        url = request.form['url']
        url = re.sub("[\W]", "_", url.strip())
        email = request.form.get('email', u'')
        json_data = request.form['json']

        try:
            json.loads(json_data)
        except ValueError:
            return json_response(400, {'error': 'Malformed JSON'})

        sketch = Sketch()
        sketch.url = url
        sketch.email = email
        sketch.ip_address = unicode(request.remote_addr)

        store = get_default_store()
        store.add(sketch)

        try:
            store.commit()
        except psycopg2.IntegrityError:
            return json_response(400, {'error': 'IntegrityError'})

        with open(sketch.file_path(), 'w') as sketch_file:
            sketch_file.write(json_data)
        return marshal(sketch, self.properties)


def register_sketches_resources():
    api.add_resource(SketchResource, '/sketches', endpoint='sketches')
