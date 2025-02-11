import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRoutes = Router();


userRoutes.get('/', getUsers)

userRoutes.get('/:id', authorize, getUser)

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