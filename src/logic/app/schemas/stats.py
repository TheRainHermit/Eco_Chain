# Archivo de esquema de estadísticas para FastAPI
from pydantic import BaseModel
from typing import List, Dict

class StatsResponse(BaseModel):
    total_events: int
    total_participants: int
    total_waste_kg: float
    avg_waste_per_event: float
    user_ranking: List[Dict]
    material_distribution: Dict[str, float]
    chart_image: str