from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.models.user import User as UserModel
from app.schemas.user import User, UserCreate
from app.services.auth_service import AuthService
from app.db.session import get_db


router = APIRouter()

@router.post("/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    new_user = auth_service.register_user(user)
    return new_user

@router.post("/restore-password")
def restore_password(email: str = Query(...), new_password: str = Query(...), db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    user = auth_service.get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    auth_service.update_password(user, new_password)
    return {"detail": "Contraseña actualizada correctamente"}