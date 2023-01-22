import supertest from 'supertest';
import app from '../../index';


const request = supertest(app);

describe('orders routes', () => {
  let userToken: string;
  it('index', async () => {
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
      .get('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
  it('show', async () => {
    await request
      .get('/orders/3')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
  it('current', async () => {
    await request
      .get('/order/current')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
});
