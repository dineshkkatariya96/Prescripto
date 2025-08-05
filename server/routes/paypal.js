import express, { json } from 'express';
import {getAccessToken,createOrder,capturePayment} from '../controllers/paypalController.js';

const paypalRouter = express.Router();

paypalRouter.get('/access-token',getAccessToken )
paypalRouter.post('/create-order',createOrder )
paypalRouter.get('/capturePayment/:paymentId',capturePayment )

export default paypalRouter;