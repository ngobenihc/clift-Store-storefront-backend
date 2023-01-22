// import jwt
import jwt from 'jsonwebtoken';

// import express { Request, Response }
import { Request, Response } from 'express';

// import app config
import { JWT } from '../config/app.config';

// import express
import { PersonClass, PersonInterface } from '../models/person';

// create instance from PersonClass
const newPerson = new PersonClass();

// authorization method
export const auth = async (req: Request | any, res: Response, next: any) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    const decode: any = jwt.verify(token as string, JWT as string);
    const user = await newPerson.authorization({
      decode,
      token
    });
    if (!user) {
      throw new Error();
    }
    req.id = decode?.id;
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please Authenticate' });
  }
};
