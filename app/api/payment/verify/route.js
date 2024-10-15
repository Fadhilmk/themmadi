// /app/api/payment/verify/route.js
import crypto from "crypto";
import { doc, setDoc } from "firebase/firestore"; // For Firestore
import { db } from "@/firebaseConfig"; // Your Firebase configuration

export async function POST(request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userId } = await request.json();

    const secret = process.env.RAZORPAY_SECRET_KEY;

    // Create HMAC for signature verification
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // If the signature is valid, store payment details in Firestore
      const userDocRef = doc(db, "users", userId);
      const paymentsCollection = collection(userDocRef, "payments");

      await setDoc(doc(paymentsCollection), {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        timestamp: new Date(),
      });

      return NextResponse.json({ status: "success", message: "Payment verified and saved" });
    } else {
      return NextResponse.json({ status: "error", message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "error", message: "Error verifying payment" });
  }
}
