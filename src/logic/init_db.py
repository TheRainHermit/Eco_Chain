from app.db.session import Base, engine
from app.models import user, event, points

if __name__ == "__main__":
    print("Creando tablas de la base de datos...")
    Base.metadata.create_all(bind=engine)
    print("¡Tablas creadas correctamente!")
