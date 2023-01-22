// import express
import express from 'express';

// import controllers
import * as xPController from '../controllers/product_Controller';

import { auth } from '../middlewares/veryfication';

const route_Product = express.Router();

route_Product.post('/products', auth, xPController.create);

route_Product.get('/products', xPController.index);

route_Product.get('/products/:id', xPController.show);

route_Product.patch('/products/:id', auth, xPController.update);


route_Product.delete('/products/:id', auth, xPController.remove);

export default route_Product;
