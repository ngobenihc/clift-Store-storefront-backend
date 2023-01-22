# Storefront Backend

## Overview

In this project we build a Backend API for Store Application with PostgresSQL and Express.

## How to build and start the server

The project can be built and run in the following ways

### 1. Install all dependencies


`npm init`

`npm install`

`npm i --save-dev typescript`

`npm i --save-dev ts-node`

`npm i --save-dev @types/node`

`npx tsc --init`


## express

`npm i express`

`npm i --save-dev @types/express`

## nodemon

`npm i --save-dev nodemon`


### 2. Build

'npm run build'

# 3. PSQL

in psql run the Following Command
`CREATE USER admin WITH PASSWORD '123456';`
` CREATE DATABASE store;`
` \c store`
` GRANT ALL PRIVILEGES ON DATABASE store TO admin;`

### 4. .env

Create .env File with The Following Information:
`ENVX=dev`
`PORT=3000`
`POSTGRES_HOST=127.0.0.1`
`POSTGRES_DB=store`
`POSTGRES_TEST_DB=testing`
`POSTGRES_PORT=5432`
`POSTGRES_USER=admin`
`POSTGRES_PASSWORD=123456`
`PEPPER=Udacity`
`SALT_ROUND=10`
`JWT=Udacity`

This command will build the typeScript code into JavaScript and save them in the `./dist` folder.

### 5. DB Migrate

`npx db-migrate up`

### 6. Start the Server after Build

`npm run start`

The server will run on port `3000`.

## DATABASE Schema

#### Products

- id -> SERIAL PRIMARY KEY
- name -> VARCHAR
- price -> INT

#### Persons

- id -> SERIAL PRIMARY KEY
- first_name -> VARCHAR
- last_name -> VARCHAR
- email -> VARCHAR
- password -> VARCHAR
- tokens -> VARCHAR[] - Automatically Generated

#### Orders

- id -> SERIAL PRIMARY KEY
- status -> VARCHAR
- person_id -> BIGINT REFERENCES persons(id)
- totalprice -> generated - Automatically Generated

#### Order_Products

- id -> SERIAL PRIMARY KEY
- quantity -> INT
- product_id -> BIGINT REFERENCES products(id)
- order_id -> BIGINT REFERENCES orders(id)


## Testing and Linting

Here, I will show you how to run the test and also how to check that our code respects all the eslint rules.

### 1. Linting

`npm run lint`

### 2. Formating

`npm run prettier`

### 3. Testing

`npm run test`

## Built With

- [NodeJS](https://nodejs.org/en/) - The JavaScript runtime.
- [Express](https://expressjs.com/) - The web framework.
- [TypeScript](https://www.typescriptlang.org/) - The language used.
- [postgres](https://www.postgresql.org/) - Relational DATABASE.
