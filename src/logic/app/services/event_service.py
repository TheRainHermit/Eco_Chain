from sqlalchemy.orm import Session
from app.models.event import RecyclingEvent
from app.schemas.event import RecyclingEventCreate, RecyclingEvent
from datetime import datetime

class EventService:
    def __init__(self, db: Session):
        self.db = db

    def create_event(self, event_data: RecyclingEventCreate) -> RecyclingEvent:
        new_event = RecyclingEvent(
            user_id=event_data.user_id,
            event_type=event_data.event_type,
            points_awarded=event_data.points_awarded,
            timestamp=event_data.timestamp
        )
        self.db.add(new_event)
        self.db.commit()
        self.db.refresh(new_event)
        return new_event

    def get_events(self, user_id: int):
        return self.db.query(RecyclingEvent).filter(RecyclingEvent.user_id == user_id).all()

    def get_event_by_id(self, event_id: int) -> RecyclingEvent:
        event = self.db.query(RecyclingEvent).filter(RecyclingEvent.id == event_id).first()
        return event

    def delete_event(self, event_id: int) -> bool:
        event = self.db.query(RecyclingEvent).filter(RecyclingEvent.id == event_id).first()
        if event:
            self.db.delete(event)
            self.db.commit()
            return True
        return False