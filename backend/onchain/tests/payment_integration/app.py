import os
import razorpay
import json
from flask import Flask, render_template, request
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

app = Flask(__name__, static_folder="static", static_url_path="")

# Initialize Razorpay client with API credentials
razorpay_client = razorpay.Client(auth=(os.getenv("KEY_ID"), os.getenv("KEY_SECRET")))

@app.route('/')
def app_create():
    return render_template('app.html')

@app.route('/charge', methods=['POST'])
def app_charge():
    try:
        amount = 100  # Razorpay expects amount in paise (INR 51.00)
        payment_id = request.form.get('razorpay_payment_id')

        print("🔍 Debug: Received Payment ID:", payment_id)  # Debugging log

        if not payment_id:
            return json.dumps({"error": "No payment ID received!"})

        # Capture the payment
        response = razorpay_client.payment.capture(payment_id, amount)
        print("✅ Payment Captured:", response)  # Debugging log

        return json.dumps(razorpay_client.payment.fetch(payment_id))

    except razorpay.errors.BadRequestError as e:
        print("❌ Razorpay Error:", str(e))
        return json.dumps({"error": "Invalid Payment ID or Payment already captured!"})
    
    except Exception as e:
        print("❌ General Error:", str(e))
        return json.dumps({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
