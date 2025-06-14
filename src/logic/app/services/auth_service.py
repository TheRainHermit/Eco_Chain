from sqlalchemy.orm import Session
from app.models.user import User as UserModel
from app.core.security import verify_password, hash_password
from fastapi import HTTPException, status
from app.schemas.user import UserCreate, User
from app.db.session import get_db

class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def register_user(self, user: UserCreate) -> User:
        db_user = self.db.query(UserModel).filter(UserModel.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        
        hashed_password = hash_password(user.password)
        new_user = UserModel(username=user.username, email=user.email, full_name=user.full_name, hashed_password=hashed_password)
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        return User.from_orm(new_user)

    def authenticate_user(self, username_or_email: str, password: str) -> User:
        user = self.db.query(UserModel).filter(
            (UserModel.email == username_or_email) | (UserModel.username == username_or_email)
        ).first()
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        return User.from_orm(user)