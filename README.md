# BudgetFree

This work in progress project will meet the need for a free and open-source personal budgeting software which is accessible from any device.

## Local Development Installation

1. Install [npm](https://www.npmjs.com/) and [postgreSQL](https://www.postgresql.org/) on your local machine.

2. Start a PosgreSQL localhost server on the default port (5432)

3. Initialize database with sample data using ```database.sql``` (in the server directory) for reference

4. Clone this repo: ```git clone https://github.com/bclewi5555/budget-free.git```

## Run Development Server

1. Navigate to the server directory

2. Run: ```npm run start```

## Run Development Client

1. Navigate to the client directory in a new terminal

2. Run: ```yarn start```

## Project Description

This project will be a free, open-source, and secure web-based application which can be run from a compatible browser on any device. The app will adopt the envelope system budgeting strategy (as opposed to “set and forget”) in order to empower users to better understand and control their finances. Users can organize monthly budgets with categories (Income, Food, Utilities, etc.), each customizable with a list of subcategories, also known as envelopes (Power, Water, Internet, ...) which transactions can be added to. Budget owners can invite others to join their budget and revoke shared access at any time, create dependent collaborators (children for example) as well as import or export their budget data.