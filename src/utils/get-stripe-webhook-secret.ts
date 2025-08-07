export const getStripeWebhookSecret = () => {
    return process.env.STRIPE_WEBHOOK_SECRET || '';
}