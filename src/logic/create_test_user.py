from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import hash_password

def create_test_user():
    db = SessionLocal()
    # Elimina usuarios previos con el mismo username/email
    db.query(User).filter((User.username == 'demo') | (User.email == 'demo@correo.com')).delete()
    user = User(
        username='demo',
        email='demo@correo.com',
        full_name='Usuario demo',
        hashed_password=hash_password('12345'),
        is_active=True
    )
    db.add(user)
    db.commit()
    db.close()
    print('Usuario de prueba creado: demo / 12345')

if __name__ == "__main__":
    create_test_user()
