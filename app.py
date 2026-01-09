import os
import stripe
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route("/")
def index():
    return render_template(
        "index.html",
        publishable_key=os.getenv("STRIPE_PUBLISHABLE_KEY")
    )

@app.route("/create-payment-intent", methods=["POST"])
def create_payment_intent():
    try:
        intent = stripe.PaymentIntent.create(
            amount=2000,  # $20.00
            currency="usd",
            automatic_payment_methods={"enabled": True},
        )
        return jsonify({
            "clientSecret": intent.client_secret
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

@app.route("/success")
def success():
    return render_template("success.html")

if __name__ == "__main__":
    app.run(debug=True)
