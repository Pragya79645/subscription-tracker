import { Router } from "express";

const subsriptionRouter = Router();

subsriptionRouter.get('/', (req, res) => res.send({ body: { title: 'Get all Subscription' } }));

subsriptionRouter.get('/:id', (req, res) => res.send({ body: { title: 'Get Subscription Details' } }));

subsriptionRouter.post('/', (req, res) => res.send({ body: { title: 'Create Subscription' } }));

subsriptionRouter.put('/:id', (req, res) => res.send({ body: { title: 'Update Subscription' } }));

subsriptionRouter.delete('/:id', (req, res) => res.send({ body: { title: 'Delete Subscription' } }));

subsriptionRouter.get('/user/:id', (req, res) => res.send({ body: { title: 'Get all user Subscriptions' } }));

subsriptionRouter.put('/:id/cancel', (req, res) => res.send({ body: { title: 'Cancel Subscription' } }));

subsriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ body: { title: 'Get Upcoming Renewals' } }));
export default subsriptionRouter;