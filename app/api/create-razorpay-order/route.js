// app/api/create-razorpay-order/route.js

import Razorpay from "razorpay";

// Ensure that environment variables are correctly set in your .env file
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Replace with your Razorpay key secret
});

export async function POST(request) {
  try {
    const { userId } = await request.json();

    // Validate the incoming data
    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create an order
    const options = {
      amount: 50000, // Amount in paise (₹500)
      currency: "INR",
      receipt: `receipt_${userId}`,
    };

    const order = await razorpay.orders.create(options);

    // Return the order details to the client
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return new Response(
      JSON.stringify({ message: "Error creating Razorpay order", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
