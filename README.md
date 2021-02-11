# BudgetFree

This work in progress project will meet the need for a free and open-source personal budgeting software which is accessible from any device.

## Local Install for Developers

1. Install [npm](https://www.npmjs.com/), [yarn](https://classic.yarnpkg.com/), and [postgreSQL](https://www.postgresql.org/) on your local machine.

2. Clone this repo: ```git clone https://github.com/bclewi5555/budget-free.git```

3. Start up a PosgreSQL database on the default port (5432)

4. Initialize database with sample data using ```database.sql``` (in the server directory) for reference

## Run Development Server

1. Navigate to the server directory

2. Create a new environment config file named ```.env``` with the contents below, replacing ```secretpassword``` with your actual database user password.
```
PORT=3001

PGUSER=postgres
PGHOST=localhost
PGPASSWORD=secretpassword
PGDATABASE=budgetfree
PGPORT=5432 
```

3. Run: ```npm run start```

## Run Development Client

1. Navigate to the client directory in a new terminal

2. Run: ```yarn start```

## Server API Reference

### User API

CRUD Restful API at the ```/user``` endpoint to work with the ```person``` table (user table is reserved) in the ```budgetfree``` database.

- CREATE person using ```POST``` at ```http://localhost:3001/user``` with ```res.body.username```, ```res.body.email```, and ```res.body.password```
- READ person by id using ```GET``` at ```http://localhost:3001/user/:id``` with ```res.params.id```
- READ all person entries using ```GET``` at ```http://localhost:3001/user```
- UPDATE person username by id using ```PUT``` at ```http://localhost:3001/user/:id``` with ```res.params.id``` and ```res.body.username```
- UPDATE person email by id using ```PUT``` at ```http://localhost:3001/user/:id``` with ```res.params.id``` and ```res.body.email```
- UPDATE person password by id using ```PUT``` at ```http://localhost:3001/user/:id``` with ```res.params.id``` and ```res.body.password```
- UPDATE person username and email by id using ```PUT``` at ```http://localhost:3001/user/:id``` with ```res.params.id```, ```res.body.username```, and ```res.body.email```
- DELETE person by id  using ```DELETE``` at ```http://localhost:3001/user/:id``` with ```res.params.id```

See ```server > routes > user.js``` for details

## Project Description

This project will be a free, open-source, and secure web-based application which can be run from a compatible browser on any device. The app will adopt the envelope system budgeting strategy (as opposed to “set and forget”) in order to empower users to better understand and control their finances. Users can organize monthly budgets with categories (Income, Food, Utilities, etc.), each customizable with a list of subcategories, also known as envelopes (Power, Water, Internet, ...) which transactions can be added to. Budget owners can invite others to join their budget and revoke shared access at any time, create dependent collaborators (children for example) as well as import or export their budget data.
