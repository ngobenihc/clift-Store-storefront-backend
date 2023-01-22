import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('products routes', () => {
  let userToken: string;
  it('create', async () => {
    await request
      .post('/persons/login')
      .send({
        email: 'alex@gmail.com',
        password: '123456'
      })
      .expect((x) => {
        expect(x.status).toEqual(200);
        userToken = x.body.token;
      });
    await request
      .post('/products/2/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
  it('show', async () => {
    await request
      .get('/orders/3/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
  it('current', async () => {
    await request
      .get('/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
  it('update', async () => {
    await request
      .patch('/products/2/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        quantity: 4
      })
      .expect(200);
  });
  it('delete', async () => {
    await request
      .delete('/products/2/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
  it('complete', async () => {
    await request
      .post('/cart/complete')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
});
