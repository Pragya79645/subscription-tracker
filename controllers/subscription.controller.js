import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'
import { sendReminderEmail } from '../utils/send-email.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    let workflowRunId = null;
    
    // Only trigger workflow if Upstash client is properly configured
    if (workflowClient) {
      try {
        const result = await workflowClient.trigger({
          url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
          body: {
            subscriptionId: subscription.id,
          },
          headers: {
            'content-type': 'application/json',
          },
          retries: 0,
        });
        workflowRunId = result.workflowRunId;
      } catch (workflowError) {
        console.warn('Workflow trigger failed:', workflowError.message);
      }
    } else {
      console.log('Upstash workflow disabled - missing configuration');
    }

    res.status(201).json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}

export const testEmail = async (req, res, next) => {
  try {
    const { subscriptionId } = req.params;
    
    const subscription = await Subscription.findById(subscriptionId).populate('user', 'name email');
    
    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    // Send test email immediately
    await sendReminderEmail({
      to: subscription.user.email,
      type: '7 days before reminder',
      subscription,
    });

    res.status(200).json({ 
      success: true, 
      message: `Test email sent to ${subscription.user.email}`,
      data: {
        subscriptionName: subscription.name,
        userEmail: subscription.user.email
      }
    });
  } catch (e) {
    next(e);
  }
}