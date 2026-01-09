# Stripe Embedded Payment Demo

A simple demo showing how to integrate **Stripe Payment Element** with a Python Flask backend. This project allows users to pay $20 using Stripe’s test environment. Designed for demo and learning purposes.  

---

## Features

- Flask backend that creates Stripe **PaymentIntents**
- Frontend using **Stripe Payment Element**
- Fully testable with **Stripe test cards**
- Error handling for frontend and backend
- Easily configurable with `.env` for API keys
- Mac-friendly setup

---

## Prerequisites

- Python 3.8+
- pip
- Stripe account ([Sign up here](https://stripe.com))
- Mac (tested) or any system that supports Flask

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd stripe-embedded-demo
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

```requirements.txt``` should include:

```
Flask
stripe
python-dotenv
```

### 3. Create environment file

Create a ```.env``` file in the **same directory as** ```app.py```:
```
touch .env
nano .env
```

Add your Stripe API keys:

```
STRIPE_SECRET_KEY=sk_test_51XXXXXXXXXXXX
STRIPE_PUBLISHABLE_KEY=pk_test_51XXXXXXXXXXXX
```
### 4. Run the Flask server

```
python app.py
```

By default, the app will run on:

```
http://127.0.0.1:5000/
```
You should see:
- Payment form with card input
- Pay $20 button

### 5. Test payment

Use Stripe **test card**:

```
Card number: 4242 4242 4242 4242
Expiry: any future date
CVC: any 3 digits
ZIP: any 5 digits
```

- Successful payment redirects to ```/success```
- PaymentIntent is created in the Stripe Dashboard (Test Mode)

### Demo Video

<video width="600" controls>
  <source src="assets/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


### References
- [Stripe Docs: Accept a Payment](https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=embedded-form)
- [Stripe Payment Element](https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=embedded-form)
- [Python Stripe SDK](https://stripe.com/docs/api/python)

