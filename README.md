# Company/Invoice Tracker API

This project establishes a RESTful API server using Express and PostgreSQL to manage company and invoice data.

## Setup

- Create a project folder, a Git repo, and a `package.json`.
- Install `express` and `pg` via NPM.
- Add `node_modules` to `.gitignore`.

## Database Setup

- Create a PostgreSQL database named `biztime`.
- Load initial data from `data.sql`.
- Update `db.js` to connect to the database and export the client object.

## Routes

### Companies

All company routes are found under `/companies/`.

- **GET /companies:** Returns a list of companies as JSON objects.
- **GET /companies/[code]:** Returns details of a specific company.
- **POST /companies:** Adds a new company.
- **PUT /companies/[code]:** Updates an existing company.
- **DELETE /companies/[code]:** Deletes a company.

### Invoices

All invoice routes are prefixed by `/invoices/`.

- **GET /invoices:** Retrieves information on invoices.
- **GET /invoices/[id]:** Returns details of a specific invoice.
- **POST /invoices:** Adds a new invoice.
- **PUT /invoices/[id]:** Updates an existing invoice.
- **DELETE /invoices/[id]:** Deletes an invoice.

## Usage

Ensure the database is set up, then start the server by running `node server.js`.

## Summary

This API server integrates with PostgreSQL to manage company and invoice data, providing endpoints for CRUD operations via HTTP requests in JSON format.

Feel free to explore and utilize these routes to interact with the company and invoice data.
