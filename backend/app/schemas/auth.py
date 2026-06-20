from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    send_verification: bool = False


class LoginRequest(BaseModel):
    email: EmailStr
    password: str