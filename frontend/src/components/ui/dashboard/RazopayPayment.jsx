import { useEffect, useState } from "react";

const RazorpayPayment = ({ rechargeAmount }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false); // Track script loading status

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        // Add onload event listener to track when the script is loaded
        script.onload = () => {
            console.log("Razorpay script loaded successfully");
            setIsScriptLoaded(true); // Update state to indicate script is ready
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        if (!isScriptLoaded) {
            console.error("Razorpay script is not loaded yet.");
            return;
        }

        console.log("💰 Recharge Amount:", rechargeAmount);
        const options = {
            key: "rzp_test_Q9P2EdVpOEFDI9", // Razorpay API Key
            amount: (rechargeAmount * 100).toString(), // Amount in paise (INR 1.00)
            currency: "INR",
            name: "PEC Devs",
            description: "Purchase Description",
            image: "vk.jpg",
            handler: function (response) {
                console.log("✅ Payment ID:", response);
            },
            prefill: {
                name: "PEC Devs",
                email: "ngpanimalar@gmail.com",
                contact: "9999999999"
            },
            notes: {
                shopping_order_id: "21"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <button
            type="submit"
            onClick={handlePayment}
            className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!isScriptLoaded} // Disable button until script is loaded
        >
            {isScriptLoaded ? "Recharge Wallet" : "Loading Payment Gateway..."}
        </button>
    );
};

export default RazorpayPayment;