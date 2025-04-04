from fastapi import APIRouter, Request, status
from fastapi import Request, Header, HTTPException
from ..config import settings
import hmac
import hashlib
import json

webhook_secret = settings.RAZORPAY_WEBHOOK_SECRET

router = APIRouter(prefix="/webhook", tags=["auth"])

@router.post("/razorpay", status_code=status.HTTP_201_CREATED)
async def razorpay_webhook(request: Request, x_razorpay_signature: str = Header(None)):
    if not x_razorpay_signature:
        raise HTTPException(status_code=400, detail="Missing signature header")

    # Read request body
    body = await request.body()

    # Generate HMAC signature
    generated_signature = hmac.new(
        webhook_secret.encode(), body, hashlib.sha256
    ).hexdigest()

    # Verify signature
    if not hmac.compare_digest(generated_signature, x_razorpay_signature):
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Parse JSON payload
    payload = json.loads(body)
    event = payload.get("event")
    print(payload)

    if event == "payment.captured":
        payment_details = payload["payload"]["payment"]["entity"]

        # Extract payment details
        transaction_id = payment_details["id"]
        amount = payment_details["amount"] / 100  # Convert to INR
        currency = payment_details["currency"]
        status = payment_details["status"]
        method = payment_details["method"]
        order_id = payment_details["order_id"]
        email = payment_details.get("email", "N/A")
        contact = payment_details.get("contact", "N/A")

        # Store in database or perform required actions
        print(
            "✅ Payment Success:",
            {
                "transactionId": transaction_id,
                "amount": amount,
                "currency": currency,
                "status": status,
                "method": method,
                "orderId": order_id,
                "email": email,
                "contact": contact,
            },
        )

        # Respond to Razorpay
        return {"message": "Webhook received"}

    raise HTTPException(status_code=400, detail="Unhandled event")
