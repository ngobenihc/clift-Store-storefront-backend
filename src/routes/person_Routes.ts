// import express
import express from 'express';

// import controllers
import * as pController from '../controllers/person_Controller';

// import auth
import { auth } from '../middlewares/veryfication';

// Create routes using express.Router()
const route_Controll = express.Router();

// create route
route_Controll.post('/persons', pController.create);

// index route
route_Controll.get('/persons', auth, pController.index);

// show route
route_Controll.get('/persons/profile', auth, pController.show);

// update route
route_Controll.patch('/persons', auth, pController.update);

// delete route
route_Controll.delete('/persons', auth, pController.remove);

// authentication route
route_Controll.post('/persons/login', pController.authentication);

// logout route
route_Controll.delete('/persons/logout', auth, pController.logout);


route_Controll.delete('/persons/logoutall', auth, pController.logoutAll);


export default route_Controll;
