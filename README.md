# Banking API

A simple API to manipulate bank accounts & transactions.

## Used tools

- Node.js
- Typescript
- MongoDB
- Swagger

## Endpoints

Available endpoints are:

- `GET   /api-docs`, interactive API documentation using OpenAPI & Swagger
- `GET   /api/accounts/:id/balance`, checks account's balance
- `POST  /api/accounts`, opens new account
- `POST  /api/transactions/:accountId/deposit`, deposits specified amount into account
- `POST  /api/transactions/:accountId/withdraw`, withdraws specified amount from account

## Running app

After cloning repo and running `npm i`, the following commands are available

```
# From app directory
cd /app

# update env variables
cp .env.exampel .env

# run using dev server
npm run start:dev

# build
npm run build

# start production server
npm run start

# testing
npm run test
```