import { ProductClass, ProductInterface } from '../../models/product';

const newProduct = new ProductClass();

describe('Product Model Test', () => {
  describe('Definition Test', () => {
    it('create method', () => {
      expect(newProduct.create).toBeDefined();
    });
    it('index method', () => {
      expect(newProduct.index).toBeDefined();
    });
    it('show method', () => {
      expect(newProduct.show).toBeDefined();
    });
    it('update method', () => {
      expect(newProduct.update).toBeDefined();
    });
    it('delete method', () => {
      expect(newProduct.delete).toBeDefined();
    });
  });
  describe('Integration Test', () => {
    it('create instance in the database', async () => {
      const result = await newProduct.create({
        name: 'Apple',
        price: 23
      });
      expect(result).toEqual({
        id: 1,
        name: 'Apple',
        price: 23
      });
    });
    it('retun all record in the database', async () => {
      const result = await newProduct.index();
      expect(result).toEqual([
        {
          id: 1,
          name: 'Apple',
          price: 23
        }
      ]);
    });
    it('show instance in the database', async () => {
      const result = await newProduct.show('1');
      expect(result).toEqual({
        id: 1,
        name: 'Apple',
        price: 23
      });
    });
    it('update instance in the database', async () => {
      const result = await newProduct.update('1', {
        name: 'Orange',
        price: 18
      });
      expect(result).toEqual({
        id: 1,
        name: 'Orange',
        price: 18
      });
    });
    it('delete instance in the database', async () => {
      const result = await newProduct.delete('1');
      expect(result).toEqual(undefined);
    });
  });
});
