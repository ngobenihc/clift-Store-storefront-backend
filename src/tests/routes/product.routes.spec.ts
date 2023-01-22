// import supertest
import supertest from 'supertest';

// import app
import app from '../../index';

// Create request
const request = supertest(app);

describe('products routes', () => {
  let userToken: string;
  it('create', async () => {
    await request
      .post('/persons')
      .send({
        first_name: 'Alex',
        last_name: 'Alex',
        email: 'alex@gmail.com',
        password: '123456'
      })
      .expect((x) => {
        expect(x.status).toEqual(200);
        userToken = x.body.token;
      });
    await request
      .post('/products')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Apple',
        price: 2
      })
      .expect(200);
  });
  it('index', async () => {
    await request.get('/products').expect(200);
  });
  it('show', async () => {
    await request.get('/products/3').expect(200);
  });
  it('update', async () => {
    await request
      .patch('/products/3')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        price: 4
      })
      .expect(200);
  });
  it('delete', async () => {
    await request
      .delete('/products/3')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
});
