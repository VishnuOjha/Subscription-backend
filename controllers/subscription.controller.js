import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {

    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user.id
        });

        res.status(201).json({ success: true, data: subscription });

    } catch (error) {
        next(error);
    }

}


export const getUserSubscriptions = async (req, res, next) => {

    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("you are not authorized to access this account");
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        if (!subscriptions) {
            res.status(404).json({ message: 'No subscriptions found' });
        }

        res.status(200).json({ success: true, data: subscriptions });

    } catch (e) {
        next(e)
    }
}