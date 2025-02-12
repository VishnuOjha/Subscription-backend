import dayjs from "dayjs";
import { EMAIL_USER } from "../config/env.js";
import { emailTemplates } from "./email-template.js"
import { createTransporter } from "../config/nodemailer.js";


export const sendReminderEmail = async ({ to, type, subscription }) => {
    try {
        // Input validation
        if (!to || !type) {
            throw new Error("Missing required parameters: 'to' and 'type' are required");
        }

        const template = emailTemplates.find((template) => template.label === type);

        if (!template) {
            throw new Error(`Invalid email type: ${type}`);
        }

        // Validate subscription data
        if (!subscription?.user?.name || !subscription.name || !subscription.renewalDate) {
            throw new Error("Invalid subscription data");
        }

        const mailInfo = {
            userName: subscription.user.name,
            subscriptionName: subscription.name,
            renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
            planName: subscription.name,
            price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
            paymentMethod: subscription.paymentMethod,
        };

        console.log("Preparing email with info:", mailInfo);

        const message = template.generateBody(mailInfo);
        const subject = template.generateSubject(mailInfo);

        const emailOptions = {
            from: EMAIL_USER,
            to: to,
            subject: subject,
            html: message
        };
        const transport = await createTransporter();
        // Use Promise-based approach instead of callback
        const result = await transport.sendMail(emailOptions);

        console.log("Email sent successfully:", {
            messageId: result.messageId,
            to: to,
            subject: subject,
            timestamp: new Date().toISOString()
        });

        return result;

    } catch (error) {
        // Enhanced error logging
        console.error("Failed to send reminder email:", {
            error: error.message,
            code: error.code,
            command: error.command,
            to: to,
            type: type,
            timestamp: new Date().toISOString()
        });

        // Rethrow the error for the caller to handle
        throw error;
    }
};

// Example usage with retry logic
export const sendReminderEmailWithRetry = async (params, maxRetries = 3, retryDelay = 2000) => {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await sendReminderEmail(params);
            return result;
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${attempt} failed:`, error.message);

            if (attempt < maxRetries) {
                console.log(`Retrying in ${retryDelay}ms...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
    }

    throw new Error(`Failed to send email after ${maxRetries} attempts. Last error: ${lastError.message}`);
};