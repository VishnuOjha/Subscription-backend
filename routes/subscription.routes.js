import { Router } from "express";

const subscriptionRoutes = Router();

subscriptionRoutes.get('/', (req, res) => {
    res.send({ message: 'Get All Subscriptions' });
})

subscriptionRoutes.get('//:id', (req, res) => {
    res.send({ message: 'Get Single Subscription' });
})

subscriptionRoutes.post('/', (req, res) => {  
    res.send({ message: 'Create New Subscription' });
 })

subscriptionRoutes.put('/:id', (req, res) => {
    res.send({ message: 'Update Subscription' });
})

subscriptionRoutes.delete('/:id', (req, res) => {
    res.send({ message: 'Delete Subscription' });
})

subscriptionRoutes.get('/users/:id', (req, res) => {
    res.send({ message: 'Get A Users Subscription' });
})

subscriptionRoutes.delete('/:id/cancel', (req, res) => {
    res.send({ message: 'Cancel Subscription' });
})

subscriptionRoutes.get('/upcoming-renewals', (req, res) => {
    res.send({ message: 'Get Upcoming Subscription Renewals' });
})


export default subscriptionRoutes;