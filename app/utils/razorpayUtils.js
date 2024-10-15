// app/utils/razorpayUtils.js

// Function to load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Function to create an order on the server (backend)
export const createOrderOnServer = async (userId) => {
  try {
    const response = await fetch("/api/create-razorpay-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create Razorpay order");
    }

    const data = await response.json();
    return data; // The order details returned by the server
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};
