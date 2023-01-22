import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('persons routes', () => {
  let userToken: string;
  it('create', async () => {
    await request
      .post('/persons')
      .send({
        first_name: 'John',
        last_name: 'Jones',
        email: 'john@gmail.com',
        password: '123456'
      })
      .expect((x) => {
        expect(x.status).toEqual(200);
        userToken = x.body.token;
      });
  });
  it('index', async () => {
    await request
      .get('/persons')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
  it('show', async () => {
    await request
      .get('/persons/profile')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
  it('update', async () => {
    await request
      .patch('/persons')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        email: 'john.jones@gmail.com'
      })
      .expect(200);
  });
  it('logout', async () => {
    await request
      .delete('/persons/logout')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
  it('login', async () => {
    await request
      .post('/persons/login')
      .send({
        email: 'john.jones@gmail.com',
        password: '123456'
      })
      .expect((x) => {
        expect(x.status).toEqual(200);
        userToken = x.body.token;
      });
  });
  it('delete', async () => {
    await request
      .delete('/persons')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });
});
