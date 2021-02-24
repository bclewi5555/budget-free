/* 
===================================
POSTGRESQL COMMANDS FOR REFERENCE
===================================

MacOS Terminal Commands ( -- MacOS: <command> )
    MacOS Dependencies:
        Postgres App for MacOS
        Add psql PATH to .bash
*/

-- Connect to default database with postgres user
-- MacOS: psql -U postgres

CREATE DATABASE budgetfree;

-- Switch to budgetfree database using existing connection
-- MacOS: \c budgetfree

-- OR Start new connection to budgetfree database with postgres user
-- MacOS: psql -U postgres -d budgetfree

CREATE TABLE users (
  id UUID NOT NULL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  UNIQUE (username),
  UNIQUE (email)
);

-- List all tables in database
-- MacOS: \dt

/*
Insert test data into table
https://www.postgresql.org/docs/13/functions-uuid.html
*/

INSERT INTO users (id, username, email, hashedPassword)
values (gen_random_uuid(), 'AlexaAllistair1', 'aa1@example.com', 'y5E$g&jSWfp42As');

INSERT INTO users (id, username, email, hashedPassword)
values (gen_random_uuid(), 'BobBurns2', 'bb2@example.com', 'v4tl$KanIr8@dF');

INSERT INTO users (id, username, email, hashedPassword)
values (gen_random_uuid(), 'CourtneyCopeland3', 'cc3@example.com', 'avlg47avwgt#sing');

-- List all tables in database
-- MacOS: \dt

-- Quit connection to database
-- MacOS: \q