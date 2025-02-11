import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/workflow.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {

    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user.id
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
              subscriptionId: subscription._id,
            },
            headers: {
              'content-type': 'application/json',
            },
            retries: 0,
          })


        res.status(201).json({ success: true, data: {subscription , workflowRunId} });

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