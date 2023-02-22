CREATE TABLE details
(
    id int not null unique,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    PRIMARY KEY (id)
);