from sqlalchemy.orm import Session
from app.models.points import Points
from app.models.user import User
from app.schemas.points import PointsCreate, PointsUpdate
from app.core.security import verify_password, hash_password
from fastapi import Depends, HTTPException, status

class PointsService:
    def __init__(self, db: Session):
        self.db = db

    def create_points(self, points_create: PointsCreate, user: User):
        points = Points(**points_create.dict(), user_id=user.id)
        self.db.add(points)
        self.db.commit()
        self.db.refresh(points)
        return points

    def update_points(self, points_id: int, points_update: PointsUpdate, user: User):
        points = self.db.query(Points).filter(Points.id == points_id, Points.user_id == user.id).first()
        if not points:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Points not found")
        for key, value in points_update.dict(exclude_unset=True).items():
            setattr(points, key, value)
        self.db.commit()
        self.db.refresh(points)
        return points

    def get_user_points(self, user: User):
        return self.db.query(Points).filter(Points.user_id == user.id).all()

    def calculate_total_points(self, user: User):
        total_points = self.db.query(Points).filter(Points.user_id == user.id).count()
        return total_points

    def delete_points(self, points_id: int, user: User):
        points = self.db.query(Points).filter(Points.id == points_id, Points.user_id == user.id).first()
        if not points:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Points not found")
        self.db.delete(points)
        self.db.commit()
        return {"detail": "Points deleted successfully"}