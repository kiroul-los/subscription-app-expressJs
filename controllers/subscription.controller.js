import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res,next) => {
    try {
        const subscription = await Subscription.create({
            user: req.user._id,
            ...req.body

        });
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {

        if(req.user.id!== req.params.id) {
            const error = new Error("You are not authorized to view this user's subscriptions");
            error.statusCode = 403;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            message: "Subscriptions fetched successfully",
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({});
        res.status(200).json({
            success: true,
            message: "All subscriptions fetched successfully",
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Subscription Not Found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Subscription fetched successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}
