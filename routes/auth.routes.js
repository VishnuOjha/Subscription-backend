import { Router } from "express";

const authRoutes = Router();

authRoutes.get('/sign-up', (req, res) => {
    res.send({ message: 'Sign up page' });
});
authRoutes.get('/sign-in', (req, res) => {
    res.send({ message: 'Sign up in' });
});
authRoutes.get('/sign-out', (req, res) => {
    res.send({ message: 'Sign up out' });
});


export default authRoutes;