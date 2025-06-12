import {Router} from 'express'
import {createSubscription, getUserSubscriptions} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({title: 'Get All Subscriptions'});
});

subscriptionRouter.post('/', authorize,createSubscription);

subscriptionRouter.get('/:id', (req, res) => {
    res.send({title: `Get Subscription with ID ${req.params.id}`});
})

subscriptionRouter.put('/:id', (req, res) => {
    res.send({title: `Update Subscription with ID ${req.params.id}`});
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({title: `Delete Subscription with ID ${req.params.id}`});
});

subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({title: `Cancel Subscription with ID ${req.params.id}`});
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({title: 'Get Upcoming Renewals'});
});


export default subscriptionRouter;
