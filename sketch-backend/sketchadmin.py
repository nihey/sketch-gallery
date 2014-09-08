# -*- coding: utf-8 -*-

import sys

import IPython
from storm.tracer import debug

from sketch.database.runtime import *

from sketch.models.sketches import *


if __name__ == '__main__':
    store = get_default_store()

    if len(sys.argv) < 2:
        print 'Usage: python honadmin.py [OPTIONS]'
        print ''
        print "'OPTIONS' is one of:"
        print ''
        print '--sql                                       Show sql commands'
        print '--console                                   Enter console mode'
        print ''


    if '--sql' in sys.argv:
        debug(True, stream=sys.stdout)

    if '--console' in sys.argv:
        IPython.embed()
