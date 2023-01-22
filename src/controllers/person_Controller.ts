import { Request, Response } from 'express';
import { PersonClass, PersonInterface } from '../models/person';
const newPerson = new PersonClass();
import { OrderClass, OrderInterface } from '../models/order';


const new_Order = new OrderClass();


export const create = async (req: Request, res: Response) => {
  try {
    const result: any = await newPerson.create(req.body);
    new_Order.create(result.user.id);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};


export const index = async (_req: Request, res: Response) => {
  try {
    const result = await newPerson.index();
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};


export const show = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const result = await newPerson.show(id);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const result = await newPerson.update(id, req.body);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const remove = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const result = await newPerson.delete(id);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const authentication = async (req: Request, res: Response) => {
  try {
    const result = await newPerson.authentication(req.body);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};


export const logout = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const user = req.user;
    const token = req.token;
    const result = await newPerson.logout(id, user, token);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};


export const logoutAll = async (req: Request | any, res: Response) => {
  try {
    const id = req.id;
    const result = await newPerson.logoutAll(id);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};
