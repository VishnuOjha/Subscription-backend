import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        // Check if access is denied by the decision object
        if (decision.isDenied()) {
            // Check specific reason for denial and send appropriate response
            if (decision.reason.isRateLimit) {
                return res.status(429).json({ message: 'Rate limit exceeded' });
            }
            if (decision.reason.isBot) {
                return res.status(403).json({ message: 'Bot detected' });
            }

            // Default denied access message
            return res.status(403).json({ message: 'Access Denied' });
        }

        // Proceed to next middleware if decision is not denied
        next();
    } catch (error) {
        console.error(`Arcjet Middleware Error: ${error.message}`);

        // Send a generic error response if something goes wrong
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default arcjetMiddleware;
