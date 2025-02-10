import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [100, "Name must be at most 100 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be at least 0"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "INR"],
        default: "INR"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        default: "monthly"
    },
    category: {
        type: String,
        enum: ["business", "entertainment", "general", "health", "science", "sports", "technology", "others"],
        default: "general",
        required: true
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment Method is required"],
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: [true, "Start Date is required"],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Start Date must be a past date"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Renewal Date must be after the start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true
    }

}, { timestamps: true }
);


// Auto calculate renewal date if missing
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPerios = {
            daily: 1,
            weekly: 7,
            monthly: 1,
            yearly: 1
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPerios[this.frequency]);
    }

    // Auto update renewal date if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
});



const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;