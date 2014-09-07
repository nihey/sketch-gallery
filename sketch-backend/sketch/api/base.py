# -*- coding: utf-8 -*-

from flask import request
from flask.ext.restful import Resource
from storm.properties import Unicode, Int
from storm.expr import And

from sketch.database.runtime import get_default_store


class BaseResource(Resource):
    method_decorators = []

    properties = {}

    table = None

    order_by = None

    limit = None

    filters = {}

    def query(self, column, value):
        cls = column.cls
        column_type = type(cls.__dict__.get(column.name))
        if column_type is Unicode:
            return column == unicode(value)
        if column_type is Int:
            return column == int(value)
        raise

    def request_filters(self):
        query = []
        for key, value in request.args.iteritems():
            column = self.filters.get(key, None)

            if column is None:
                continue

            query.append(self.query(column, value))

        if query:
            query = And(*query)
        return query

    def is_count(self):
        return request.args.get('c', None) is not None

    def get(self, id=None):
        store = get_default_store()

        if id is not None:
            id = int(id)
            data = self.table.find(store, id)
            return data

        data = store.find(self.table)

        filters = self.request_filters()
        if filters:
            data = data.find(filters)
        if self.order_by:
            data = data.order_by(self.order_by)
        if self.limit:
            data = data.order_by(self.limit)
        if self.is_count():
            return data.count()

        return self.filter(data)

    def filter(self, data):
        return data
