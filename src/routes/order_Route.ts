import express from 'express';

import * as xOController from '../controllers/order_Controller';

import { auth } from '../middlewares/veryfication';


const routes = express.Router();

routes.get('/orders', auth, xOController.index);

routes.get('/orders/:id', auth, xOController.show);

routes.get('/order/current', auth, xOController.currentRecord);

export default routes;
