import { Request, Response } from 'express';
import { ProductClass, ProductInterface } from '../models/product';
const new_Product = new ProductClass();
export const create = async (req: Request, res: Response) => {
  try {
    const result = await new_Product.create(req.body);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const index = async (_req: Request, res: Response) => {
  try {
    const result = await new_Product.index();
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await new_Product.show(id);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await new_Product.update(id, req.body);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await new_Product.delete(id);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};
