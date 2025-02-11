import { createRequire } from 'module';
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 2, 1]

export const sendReminders = serve(async (context) => {

    const { subscriptionId } = context.requestPayload
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription && subscription.status !== "active")return ;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        // return context.send({ message: "Subscription already renewed" });
        console.log(`Renewal date has passed for ${subscriptionId}. Stopping Workflow`);
        return;
    }


    for (const daysBefor of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefor, 'day');

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefor} days before`, reminderDate);
        }
       
       
        await triggerReminder(context, `Reminder ${daysBefor} days before`);

    }
});


const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get-subscription", () => {
        return Subscription.findById(subscriptionId).populate('user').select("name email");
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // send email, notification, etc.
    })
}