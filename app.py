import stripe
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Stripe with your secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

def create_payment_intent():
    try:
        # Create a PaymentIntent (represents a charge)
        intent = stripe.PaymentIntent.create(
            amount=2000, # $20.00 (amount in cents)
            currency='usd',
            automatic_payment_methods={'enabled': True},
            description="Sample Transaction"
        )
        print(f"Payment Intent Created: {intent.id}")
        return intent
    except stripe.error.StripeError as e:
        print(f"Stripe Error: {e}")
        return None

if __name__ == "__main__":
    create_payment_intent()
