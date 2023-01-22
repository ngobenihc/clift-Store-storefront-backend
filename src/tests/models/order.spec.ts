import { OrderClass, OrderInterface } from '../../models/order';
const newOrder = new OrderClass();

import { PersonClass, PersonInterface } from '../../models/person';
const newPerson = new PersonClass();

describe('Order Model Test', () => {
  describe('Definition Test', () => {
    it('create method', () => {
      expect(newOrder.create).toBeDefined();
    });
    it('index method', () => {
      expect(newOrder.index).toBeDefined();
    });
    it('show method', () => {
      expect(newOrder.show).toBeDefined();
    });
    it('current method', () => {
      expect(newOrder.currentRecord).toBeDefined();
    });
    it('update method', () => {
      expect(newOrder.update).toBeDefined();
    });
  });
  describe('Integration Test', () => {
    it('create instance in the database', async () => {
      await newPerson.create({
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@gmail.com',
        password: '123456'
      });
      const result = await newOrder.create('2');
      expect(result).toEqual({
        id: 1,
        status: 'Active',
        person_id: '2',
        totalprice: 0
      });
    });
    it('retun all record in the database', async () => {
      const result = await newOrder.index('2');
      expect(result).toEqual([
        {
          id: 1,
          status: 'Active',
          person_id: '2',
          totalprice: 0
        }
      ]);
    });
    it('show instance in the database', async () => {
      const result = await newOrder.show('1', '2');
      expect(result).toEqual({
        id: 1,
        status: 'Active',
        person_id: '2',
        totalprice: 0
      });
    });
    it('current instance in the database', async () => {
      const result = await newOrder.currentRecord('2');
      expect(result).toEqual({
        id: 1,
        status: 'Active',
        person_id: '2',
        totalprice: 0
      });
    });
    it('update instance in the database', async () => {
      const result = await newOrder.update('2', {
        status: 'Complete',
        totalprice: 18
      });
      expect(result).toEqual({
        id: 1,
        status: 'Complete',
        person_id: '2',
        totalprice: 18
      });
    });
  });
});
