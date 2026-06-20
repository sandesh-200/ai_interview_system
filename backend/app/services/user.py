from sqlalchemy.orm import Session
from models.user import User
from utils.security import hash_password
from fastapi import Depends,HTTPException,Request
from utils.security import decode_token
from core.database import get_db



def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, name: str, email: str, password: str):
    user = User(
        name=name,
        email=email,
        password_hash=hash_password(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
):
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    payload = decode_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == payload["user_id"]).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    user.jwt_role = payload.get("role")

    return user


def admin_required(current_user: User = Depends(get_current_user)):
    role = getattr(current_user, "jwt_role", current_user.role.value)

    if role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    return current_user


def candidate_required(current_user: User = Depends(get_current_user)):
    role = getattr(current_user, "jwt_role", current_user.role.value)

    if role != "candidate":
        raise HTTPException(status_code=403, detail="Candidate access required")

    return current_user