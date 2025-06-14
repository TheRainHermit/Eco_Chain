from sqlalchemy.orm import Session
from app.models.points import Points
from app.models.event import RecyclingEvent
from app.models.user import User

class StatsService:
    def __init__(self, db: Session):
        self.db = db

    def get_total_points(self) -> int:
        return self.db.query(Points).count()

    def get_user_points(self, user_id: int) -> int:
        return self.db.query(Points).filter(Points.user_id == user_id).count()

    def get_event_participation_stats(self) -> dict:
        return self.db.query(RecyclingEvent).group_by(RecyclingEvent.event_id).count()

    def get_user_statistics(self) -> dict:
        total_users = self.db.query(User).count()
        total_events = self.db.query(RecyclingEvent).count()
        return {
            "total_users": total_users,
            "total_events": total_events,
            "total_points": self.get_total_points()
        }