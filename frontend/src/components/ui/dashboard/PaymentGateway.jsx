import React, { useState } from "react";
import { createOrder, verifyPayment } from "../../../services/payment";
import { FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

const PaymentGateway = ({ amount, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handlePaymentInitiation = async () => {
    setLoading(true);
    setPaymentStatus(null);
    setStatusMessage("Creating payment order...");

    try {
      const order = await createOrder(amount);
      setStatusMessage("Redirecting to payment gateway...");

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay Key ID
        amount: order.amount, // Amount in paise (100 INR = 10000 paise)
        currency: "INR",
        name: "Your Business Name",
        description: "Payment for Order #" + order.order_id,
        order_id: order.order_id,
        handler: async function (response) {
          setPaymentStatus("processing");
          setStatusMessage("Verifying your payment...");

          try {
            await verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
            setPaymentStatus("success");
            setStatusMessage("Payment successful!");
            onSuccess(response);
          } catch (error) {
            setPaymentStatus("error");
            setStatusMessage("Payment verification failed. Please contact support.");
            console.error(error);
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#6366F1",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setPaymentStatus("error");
      setStatusMessage("Failed to initialize payment. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStatusIcon = () => {
    switch (paymentStatus) {
      case "success":
        return <FiCheckCircle className="text-green-500 mr-2" />;
      case "error":
        return <FiAlertCircle className="text-red-500 mr-2" />;
      case "processing":
        return <FiLoader className="animate-spin text-indigo-500 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
      <p className="mb-4 text-lg font-medium">Amount: ₹{amount}</p>

      {/* Status message area */}
      {statusMessage && (
        <div
          className={`mb-4 p-3 rounded-md ${
            paymentStatus === "error"
              ? "bg-red-50"
              : paymentStatus === "success"
              ? "bg-green-50"
              : "bg-indigo-50"
          }`}
        >
          <div className="flex items-center">{renderStatusIcon()} <span>{statusMessage}</span></div>
        </div>
      )}

      {/* Initiate payment button */}
      <button
        onClick={handlePaymentInitiation}
        disabled={loading}
        className={`w-full px-4 py-2 rounded-md text-white flex items-center justify-center ${
          loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin mr-2" />
            Preparing Payment...
          </>
        ) : (
          "Pay Now"
        )}
      </button>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Secure payment processed by Razorpay
      </div>
    </div>
  );
};

export default PaymentGateway;
