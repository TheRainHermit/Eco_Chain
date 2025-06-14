from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.schemas.points import PointsCreate, PointsUpdate, Points
from app.services.points_service import PointsService
from app.db.session import get_db
from app.models.user import User as UserModel
from app.models.points import Points

router = APIRouter()

@router.post("/", response_model=Points)
def create_points(points: PointsCreate, db: Session = Depends(get_db)):
    return PointsService.create_points(db=db, user=None, points=points)

@router.get("/{user_id}", response_model=Points)
def get_user_points(user_id: int, db: Session = Depends(get_db)):
    points = PointsService.get_user_points(db=db, user_id=user_id)
    if points is None:
        raise HTTPException(status_code=404, detail="Points not found")
    return points

@router.put("/{user_id}", response_model=Points)
def update_user_points(user_id: int, points: PointsUpdate, db: Session = Depends(get_db)):
    updated_points = PointsService.update_user_points(db=db, user_id=user_id, points=points)
    if updated_points is None:
        raise HTTPException(status_code=404, detail="Points not found")
    return updated_points

@router.get("/statistics", response_model=dict)
def get_points_statistics(db: Session = Depends(get_db)):
    return PointsService.get_statistics(db=db)

@router.get("/user/points", response_model=dict)
def get_user_points(username: str = Query(...), db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    points = db.query(Points).filter(Points.user_id == user.id).first()
    return {"points": points.total_points if points else 0}

@router.get("/user/eth", response_model=dict)
def get_user_eth(username: str = Query(...)):
    # Blockchain simulada: 1 ETH por cada 1000 puntos
    # En producción, aquí iría la consulta real a la blockchain
    # Para la demo, simplemente calcula ETH a partir de puntos
    # (En el frontend, se puede mostrar el mismo valor)
    # Puedes mejorar esto para que use la base de datos si lo deseas
    # pero aquí lo dejamos fijo para la simulación
    return {"eth": 0.0}  # Inicialmente 0 ETH

@router.post("/user/convert_points_to_eth", response_model=dict)
def convert_points_to_eth(username: str = Query(...), db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    points = db.query(Points).filter(Points.user_id == user.id).first()
    if not points or points.total_points < 1000:
        raise HTTPException(status_code=400, detail="No tienes suficientes puntos para convertir")
    eth = points.total_points // 1000
    points.total_points = points.total_points % 1000
    db.commit()
    # Aquí podrías guardar el saldo ETH simulado en otra tabla si lo deseas
    return {"eth": eth, "remaining_points": points.total_points}