// Ensure Stripe.js is loaded in your HTML before this script
// <script src="https://js.stripe.com/v3/"></script>

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Payment.js loaded");

  // Get your publishable key from template variable
  const stripe = Stripe(window.STRIPE_PUBLISHABLE_KEY);

  let elements;

  // 1️⃣ Create PaymentIntent on backend
  async function initializePayment() {
    try {
      const res = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log("Client secret received:", data.clientSecret);

      if (!data.clientSecret) {
        throw new Error("No clientSecret returned from backend");
      }

      // 2️⃣ Initialize Elements with clientSecret
      elements = stripe.elements({ clientSecret: data.clientSecret });

      const paymentElement = elements.create("payment");
      paymentElement.mount("#payment-element");
    } catch (err) {
      console.error("Error initializing payment:", err);
      document.getElementById("error-message").textContent = err.message;
    }
  }

  // 3️⃣ Handle form submission
  const form = document.getElementById("payment-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Pay button clicked");

    document.getElementById("submit").disabled = true;

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/success",
        },
      });

      if (error) {
        console.error("Stripe error:", error.message);
        document.getElementById("error-message").textContent = error.message;
        document.getElementById("submit").disabled = false;
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      document.getElementById("error-message").textContent = err.message;
      document.getElementById("submit").disabled = false;
    }
  });

  // Initialize payment on page load
  initializePayment();
});
