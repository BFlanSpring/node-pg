const request = require('supertest');
const app = require('./app');

describe('Companies Routes', () => {
  test('GET /companies should return a list of companies', async () => {
    const response = await request(app).get('/companies');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('companies');
  });

  test('GET /companies/:code should return a specific company', async () => {
    const response = await request(app).get('/companies/apple');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('company');
    expect(response.body.company.code).toBe('apple');
  });

  test('POST /companies should create a new company', async () => {
    const newCompany = {
      name: 'New Company',
      description: 'A newly created company',
    };

    const response = await request(app)
      .post('/companies')
      .send(newCompany);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('company');
    expect(response.body.company.name).toBe(newCompany.name);
    expect(response.body.company.description).toBe(newCompany.description);
  });

  test('PUT /companies/:code should update a company', async () => {
    const updatedInfo = {
      name: 'Updated Company Name',
      description: 'An updated description',
    };

    const response = await request(app)
      .put('/companies/apple')
      .send(updatedInfo);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('company');
    expect(response.body.company.name).toBe(updatedInfo.name);
    expect(response.body.company.description).toBe(updatedInfo.description);
  });

  test('DELETE /companies/:code should delete a company', async () => {
    const response = await request(app).delete('/companies/apple');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'deleted' });
  });
});

describe('Invoices Routes', () => {
  test('GET /invoices should return a list of invoices', async () => {
    const response = await request(app).get('/invoices');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('invoices');
  });

  test('GET /invoices/:id should return a specific invoice', async () => {
    const response = await request(app).get('/invoices/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('invoice');
    expect(response.body.invoice.id).toBe(1);
  });

  test('POST /invoices should create a new invoice', async () => {
    const newInvoice = {
      comp_code: 'apple',
      amt: 500,
    };

    const response = await request(app)
      .post('/invoices')
      .send(newInvoice);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('invoice');
    expect(response.body.invoice.comp_code).toBe(newInvoice.comp_code);
    expect(response.body.invoice.amt).toBe(newInvoice.amt);
  });

  test('PUT /invoices/:id should update an invoice', async () => {
    const updatedInfo = {
      amt: 600,
      paid: true,
    };

    const response = await request(app)
      .put('/invoices/1')
      .send(updatedInfo);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('invoice');
    expect(response.body.invoice.amt).toBe(updatedInfo.amt);
    expect(response.body.invoice.paid).toBe(updatedInfo.paid);
  });

  test('DELETE /invoices/:id should delete an invoice', async () => {
    const response = await request(app).delete('/invoices/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'deleted' });
  });
});
