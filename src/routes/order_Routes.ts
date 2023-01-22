// import express
import express from 'express';

// import controllers
import * as xOPController from '../controllers/order_products.controller';


import { auth } from '../middlewares/veryfication';


const route_Order = express.Router();

route_Order.post('/products/:id/cart', auth, xOPController.create);

route_Order.get('/orders/:id/cart', auth, xOPController.cart);

route_Order.get('/cart', auth, xOPController.currentRecord);

route_Order.patch('/products/:id/cart', auth, xOPController.update);

route_Order.delete('/products/:id/cart', auth, xOPController.remove);


route_Order.post('/cart/complete', auth, xOPController.complete);

export default route_Order;
