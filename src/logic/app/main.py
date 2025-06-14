from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, points, events, stats
from app.core.config import settings

app = FastAPI(title="EcoChain Points Management")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(points.router, prefix="/points", tags=["points"])
app.include_router(events.router, prefix="/events", tags=["events"])
app.include_router(stats.router, prefix="/stats", tags=["stats"])

@app.get("/")
def read_root():
    return {"message": "Welcome to EcoChain Points Management API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)