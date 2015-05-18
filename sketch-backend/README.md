# Sketch Backend

Sketch Backend will serve the drawings data to Sketch Frontend, it relies on
[Flask RESTful](https://flask-restful.readthedocs.org/en/0.3.2/) with [Storm](https://storm.canonical.com/).

## Dependencies

You will have to install dependencies via pip with:

```
$ pip install -r requirements.txt // or
```

Be warned, psycopg might fail for depending on libpq-dev (you could install it
via APT)

## Running

* `make server`
* Data will be served from http://localhost:50000.
