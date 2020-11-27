DROP TABLE if EXISTS datasources;
CREATE TABLE datasources (
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    url      VARCHAR(255) NOT NULL,
    type     VARCHAR(255) NOT NULL
);
