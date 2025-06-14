from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.event import RecyclingEvent, RecyclingEventCreate
from app.services.event_service import EventService
from app.db.session import get_db

router = APIRouter()

@router.post("/events/", response_model=RecyclingEvent)
def create_event(event: RecyclingEventCreate, db: Session = Depends(get_db)):
    event_service = EventService(db)
    created_event = event_service.create_event(event)
    if not created_event:
        raise HTTPException(status_code=400, detail="Event could not be created")
    return RecyclingEvent.from_orm(created_event)

@router.get("/events/{event_id}", response_model=RecyclingEvent)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event_service = EventService(db)
    event = event_service.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return RecyclingEvent.from_orm(event)

@router.get("/events/", response_model=list[RecyclingEvent])
def get_events(db: Session = Depends(get_db)):
    event_service = EventService(db)
    events = event_service.get_all_events()
    return [RecyclingEvent.from_orm(e) for e in events]