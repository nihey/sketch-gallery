# -*- coding: utf-8 -*-

from datetime import datetime
from hashlib import md5
import os

from flask import url_for
from storm.properties import DateTime, Unicode

from sketch.models.base import BaseModel


class Sketch(BaseModel):

    __storm_table__ = "sketch"

    url = Unicode()
    email = Unicode()
    ip_address = Unicode()
    creation_date = DateTime()

    def __init__(self):
        self.creation_date = datetime.now()

    #
    # Implicit Properties
    #

    @property
    def json_data(self):
        with open(self.file_path()) as sketch_file:
            return sketch_file.read()

    #
    # Public API
    #

    def filename(self):
        data = str(self.id) + str(self.creation_date)
        filename = md5(data).hexdigest() + str(self.id)
        return filename + '.json'

    def file_path(self):
        filename = self.filename()
        return os.path.join('static/', filename)

    def file_url(self):
        filename = self.filename()
        return url_for('static', filename=filename)
