import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get('/', (req, res) => {
    res.send({ message: 'Get All Subscriptions' });
})

subscriptionRoutes.get('/:id', (req, res) => {
    res.send({ message: 'Get Single Subscription' });
})

subscriptionRoutes.post('/', authorize, createSubscription)

subscriptionRoutes.put('/:id', (req, res) => {
    res.send({ message: 'Update Subscription' });
})

subscriptionRoutes.delete('/:id', (req, res) => {
    res.send({ message: 'Delete Subscription' });
})

subscriptionRoutes.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRoutes.delete('/:id/cancel', (req, res) => {
    res.send({ message: 'Cancel Subscription' });
})

subscriptionRoutes.get('/upcoming-renewals', (req, res) => {
    res.send({ message: 'Get Upcoming Subscription Renewals' });
})


export default subscriptionRoutes;