/* 
===================================
POSTGRESQL COMMANDS FOR REFERENCE
===================================

MacOS Terminal Commands ( -- MacOS: <command> )
    MacOS Dependencies:
        Postgres App for MacOS
        Add psql PATH to .bash
*/

-- Connect to default database
-- MacOS: psql

CREATE DATABASE budgetfree;

-- Connect to budgetfree database
-- MacOS: \c budgetfree

CREATE TABLE person (
  id UUID NOT NULL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  UNIQUE (username),
  UNIQUE (email)
);

/*
Insert into user
https://www.postgresql.org/docs/13/functions-uuid.html
*/

INSERT INTO person (id, username, email, password)
values (gen_random_uuid(), 'AlexaAllistair1', 'aa1@example.com', 'avlg47avwgt#sing');

INSERT INTO person (id, username, email, password)
values (gen_random_uuid(), 'BobBurns2', 'bb2@example.com"', 'avlg47avwgt#sing');

INSERT INTO person (id, username, email, password)
values (gen_random_uuid(), 'CourtneyCopeland3', 'cc3@example.com', 'avlg47avwgt#sing');

-- Quit connection to database
-- MacOS: \q