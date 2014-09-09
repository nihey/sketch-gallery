CREATE TABLE IF NOT EXISTS sketch(
    id serial NOT NULL PRIMARY KEY,

    ip_address text NOT NULL,
    url text NOT NULL UNIQUE,
    email text NOT NULL,
    creation_date timestamp NOT NULL
);
