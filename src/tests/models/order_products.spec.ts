import {
  OrderProductsClass,
  OrderProductsInterface
} from '../../models/order_products';
const newOrderProducts = new OrderProductsClass();

import { ProductClass, ProductInterface } from '../../models/product';
const newProduct = new ProductClass();

describe('Order_Products Model Test', () => {
  describe('Definition Test', () => {
    it('create method', () => {
      expect(newOrderProducts.create).toBeDefined();
    });
    it('show method', () => {
      expect(newOrderProducts.show).toBeDefined();
    });
    it('cart method', () => {
      expect(newOrderProducts.cart).toBeDefined();
    });
    it('update method', () => {
      expect(newOrderProducts.update).toBeDefined();
    });
    it('delete method', () => {
      expect(newOrderProducts.delete).toBeDefined();
    });
  });
  describe('Integration Test', () => {
    it('create instance in the database', async () => {
      await newProduct.create({
        name: 'Banana',
        price: 12
      });
      const result = await newOrderProducts.create({
        order_id: 1,
        product_id: 2,
        quantity: 1
      });
      expect(result).toEqual({
        id: 1,
        order_id: '1',
        product_id: '2',
        quantity: 1
      });
    });
    it('show instance in the database', async () => {
      const result = await newOrderProducts.show('2', '1');
      expect(result).toEqual({
        id: 1,
        order_id: '1',
        product_id: '2',
        quantity: 1
      });
    });
    it('cart instance in the database', async () => {
      const result = await newOrderProducts.cart('1');
      expect(result).toEqual([
        {
          id: 1,
          order_id: '1',
          product_id: '2',
          quantity: 1,
          name: 'Banana',
          price: 12
        }
      ]);
    });
    it('update instance in the database', async () => {
      const result = await newOrderProducts.update('2', '1', {
        quantity: 12
      });
      expect(result).toEqual({
        id: 1,
        order_id: '1',
        product_id: '2',
        quantity: 12
      });
    });
    it('delete instance in the database', async () => {
      const result = await newOrderProducts.delete('2', '1');
      expect(result).toEqual(undefined);
    });
  });
});
