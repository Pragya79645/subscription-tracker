import { Router } from "express";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";
import path from "path";
import authorize from "../middlewares/auth.middleware.js";

const subsriptionRouter = Router();

subsriptionRouter.get('/', (req, res) => res.send({ body: { title: 'Get all Subscription' } }));

subsriptionRouter.get('/:id', (req, res) => res.send({ body: { title: 'Get Subscription Details' } }));

subsriptionRouter.post('/', authorize, createSubscription);

subsriptionRouter.put('/:id', (req, res) => res.send({ body: { title: 'Update Subscription' } }));

subsriptionRouter.delete('/:id', (req, res) => res.send({ body: { title: 'Delete Subscription' } }));

subsriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subsriptionRouter.put('/:id/cancel', (req, res) => res.send({ body: { title: 'Cancel Subscription' } }));

subsriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ body: { title: 'Get Upcoming Renewals' } }));
export default subsriptionRouter;