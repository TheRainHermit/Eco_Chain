from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class Points(Base):
    __tablename__ = 'points'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    total_points = Column(Integer, default=0)
    level = Column(Integer, default=1)

    user = relationship("User", back_populates="points")