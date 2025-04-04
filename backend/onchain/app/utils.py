from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from .config import settings
import smtplib
from email.mime.multipart import MIMEMultipart
from .config import settings
from email.mime.text import MIMEText

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
class AuthUtils:
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str):
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password: str):
        return pwd_context.hash(password)

    @staticmethod
    def create_token(data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now() + expires_delta
        else:
            expire = datetime.now() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
        )
        return encoded_jwt

    @staticmethod
    def decode_token(token: str):
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
            return payload
        except JWTError as e:
            print(e)
            return None

class EmailUtils:
    @staticmethod
    def send_email(subject: str, to: str, body: str):
        """
        Send an email using SMTP.
        """
        try:
            # Set up the server
            server = smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT)
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)

            # Create the email
            msg = MIMEMultipart()
            msg['From'] = settings.SMTP_USERNAME
            msg['To'] = to
            msg['Subject'] = subject

            # Attach the body with the msg instance
            msg.attach(MIMEText(body, 'plain'))

            # Send the email
            server.send_message(msg)
            server.quit()

        except Exception as e:
            print(f"Failed to send email: {e}")