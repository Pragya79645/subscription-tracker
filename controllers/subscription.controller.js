import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {

    try {
       const subscription =  await Subscription.create({
        ...req.body, user: req.user._id
       });

       const { workflowRunId } = await workflowClient.trigger({
        url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        body: {
            subscriptionId: subscription.id,
        },
        headers: {
            'Content-Type': 'application/json',
        },
        retries: 0
       });

       // If you need to wait for the workflow to complete, call the appropriate client method:
       // await workflowClient.waitForRun(workflowRunId);

       res.status(201).json({
        success: true,
        data: subscription
       });
    }
    catch (e) {
        next(e);
    }
}

export const getUserSubscriptions = async (req, res, next) => {

    try {
      if(req.userid !== req.params.id){
       const error = new Error("Unauthorized access to subscriptions");
       error.statusCode = 403;
       throw error;
      }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            data: subscriptions
        });
    }
    catch(e){
        next(e)
    }
}