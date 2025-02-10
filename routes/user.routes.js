import { Router } from "express";

const userRoutes = Router();


userRoutes.get('/', (req, res) => {
    res.send({ message: 'Get All Users' });
})

userRoutes.get('/:id', (req, res) => {
    res.send({ message: 'Get Single Users' });
})

userRoutes.post('/', (req, res) => {
    res.send({ message: 'Create New User' });
})

userRoutes.put('/:id', (req, res) => {
    res.send({ message: 'Update User' });
})

userRoutes.delete('/:id', (req, res) => {
    res.send({ message: 'Delete User' });
})

export default userRoutes;