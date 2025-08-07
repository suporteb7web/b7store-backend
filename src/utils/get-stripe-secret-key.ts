export const getStripeSecretKey = () => {
    return process.env.STRIPE_SECRET_KEY || '';
}