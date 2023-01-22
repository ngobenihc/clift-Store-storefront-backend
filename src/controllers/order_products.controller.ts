// import express { Request, Response }
import { Request, Response } from 'express';


import { ProductClass, ProductInterface } from '../models/product';


const new_Product = new ProductClass();

import { OrderClass, OrderInterface } from '../models/order';

const new_Order = new OrderClass();

import {
  OrderProductsClass,
  OrderProductsInterface
} from '../models/order_products';

const new_OrderProducts = new OrderProductsClass();


export const create = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const pID = req.params.id;
    const order: any = await new_Order.currentRecord(id);
    const oID = order.id;
    const exist = await new_OrderProducts.show(pID, oID);
    if (!exist) {
      const result = await new_OrderProducts.create({
        product_id: pID,
        order_id: oID,
        quantity: req.body.quantity
      });
      let totalprice = 0;
      (await new_OrderProducts.cart(oID)).forEach(
        (x) => (totalprice += x.price * x.quantity)
      );
      await new_Order.update(id, { totalprice });
      return res.send(result);
    }
    const result = await new_OrderProducts.update(pID, oID, {
      quantity: req.body.quantity || 1
    });
    let totalprice = 0;
    (await new_OrderProducts.cart(oID)).forEach(
      (x) => (totalprice += x.price * x.quantity)
    );
    await new_Order.update(id, { totalprice });
    return res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};


export const show = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const pID = req.params.id;
    const order: any = await new_Order.currentRecord(id);
    const oID = order.id;
    const result = await new_OrderProducts.show(pID, oID);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};


export const cart = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await new_OrderProducts.cart(id);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};


export const currentRecord = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const order: any = await new_Order.currentRecord(id);
    const oID = order.id;
    const result = await new_OrderProducts.cart(oID);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const pID = req.params.id;
    const order: any = await new_Order.currentRecord(id);
    const oID = order.id;
    const result = await new_OrderProducts.update(pID, oID, req.body);
    let totalprice = 0;
    (await new_OrderProducts.cart(oID)).forEach(
      (x) => (totalprice += x.price * x.quantity)
    );
    await new_Order.update(id, { totalprice });
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const complete = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const result = await new_Order.update(id, { status: 'Complete' });
    await new_Order.create(id);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const remove = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const pID = req.params.id;
    const order: any = await new_Order.currentRecord(id);
    const oID = order.id;
    const result = await new_OrderProducts.delete(pID, oID);
    let totalprice = 0;
    (await new_OrderProducts.cart(oID)).forEach(
      (x) => (totalprice += x.price * x.quantity)
    );
    await new_Order.update(id, { totalprice });
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};
