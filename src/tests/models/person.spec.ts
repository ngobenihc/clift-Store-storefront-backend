import { PersonClass, PersonInterface } from '../../models/person';

const newPerson = new PersonClass();

describe('Person Model Test', () => {
  describe('Definition Test', () => {
    it('create method', () => {
      expect(newPerson.create).toBeDefined();
    });
    it('index method', () => {
      expect(newPerson.index).toBeDefined();
    });
    it('show method', () => {
      expect(newPerson.show).toBeDefined();
    });
    it('update method', () => {
      expect(newPerson.update).toBeDefined();
    });
    it('delete method', () => {
      expect(newPerson.delete).toBeDefined();
    });
  });
  describe('Integration Test', () => {
    it('create instance in the database', async () => {
      const result = await newPerson.create({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@gmail.com',
        password: '123456'
      });
      expect(result).toBeTruthy();
    });
    it('retun all record in the database', async () => {
      const result = await newPerson.index();
      expect(result).toBeTruthy();
    });
    it('show instance in the database', async () => {
      const result = await newPerson.show('1');
      expect(result).toBeTruthy();
    });
    it('update instance in the database', async () => {
      const result = await newPerson.update('1', {
        email: 'john.doe@gmail.com'
      });
      expect(result).toBeTruthy();
    });
    it('delete instance in the database', async () => {
      const result = await newPerson.delete('1');
      expect(result).toEqual(undefined);
    });
  });
});
