import express from 'express';
import cors from 'cors';
import { PORT } from './config/app.config';
import './db/database';
import uRoutes from './routes/person_Routes';
import pRoutes from './routes/product_Routes';
import oRoutes from './routes/order_Route';
import opRoutes from './routes/order_Routes';


const app = express();

const port = PORT;

app.use(express.json());


app.use(cors());


app.get('/', (req, res) => {
  res.send('Ready to connect!');
});


app.use(uRoutes);
app.use(pRoutes);
app.use(oRoutes);
app.use(opRoutes);

app.get('*', (req, res) => {
  res.status(404).send('Data not Found!');
});


app.listen(port, () => {
  console.log(`the app listening to port to connect ${port}`);
});


export default app;
