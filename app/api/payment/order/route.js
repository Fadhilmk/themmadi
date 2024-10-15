// /app/api/payment/order/route.js
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { amount, currency, userId } = await request.json();

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // Store these in environment variables
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    // Create order
    const options = {
      amount: amount * 100, // Amount in smallest currency unit (e.g., paisa for INR)
      currency,
      receipt: `receipt#${userId}`,
    };

    const order = await razorpay.orders.create(options);

    // Return the order details
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating Razorpay order" });
  }
}
