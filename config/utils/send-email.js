import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js"
import { EMAIL_USER } from "../env.js";
import transporter from "../nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {


    if (!to || !type) {
        throw new Error("Missing required parameters")
    }

    const template = emailTemplates.find(((template) => template.label === type));

    if (!template) {
        throw new Error("Invalid email type")
    }

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const emailOptions = {
        from: EMAIL_USER,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendMail(emailOptions, (error, info) => {

        if (error) {
            console.log("Error sending email", error);
        }

        console.log("Email sent :" + info)
    })


}