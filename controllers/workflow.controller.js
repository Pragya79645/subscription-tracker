import dayjs from 'dayjs';
import {createRequire} from 'module';
import Subscription from '../models/subscription.model.js';
const require = createRequire(import.meta.url);


const REMINDERS = [7,5,3,1]; //days before renewal
const {serve}  = require('@upstash/workflow/express');

export const sendReminders = serve(async (context) => {
    const {subscriptionId} =context.requestPayload;
    const subscription = await fetchSubscriptionDetails(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return; 

    const renewalDate =  dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopped Workflow.`);
        return;
    }

    for(const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefore} Days before`, reminderDate);
        }

        await triggerReminder(context, `Reminder ${daysBefore} Days before`, subscription);
    }
});

const fetchSubscriptionDetails = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        // Fetch subscription from database
        return await Subscription.findById(subscriptionId).populate('user', 'email name');
    });
}
const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder for subscription ${subscription?._id || 'unknown'}`);
    });
};
