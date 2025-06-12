import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
     price:{
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative and must be a positive number"],
     },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'EGP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'education', 'health', 'technology', 'lifestyle'],
        required: [true, "Category is required"],
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        required: [true, "Payment method is required"],
        trim: true,
    },
    status:{
        type: String,
        enum: ['active', 'inactive', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function (value) {
                return value <= Date.now();
            },
            message: 'Start date cannot be in the future.'
        }
    },
    renewalDate: {
        type: Date,
        // required: [true, "Renewal date is required"],
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date.'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
        index: true,
    },


}, { timestamps: true })


subscriptionSchema.pre('save', async function (next) {
    if (!this.renewalDate) {
            const renewalPeriod={
                daily: 1,
                weekly: 7,
                monthly: 30,
                yearly: 365,
            };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
