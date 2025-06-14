-- SQL para Ecochain: estructura y usuario de prueba
DROP TABLE IF EXISTS recycling_events;
DROP TABLE IF EXISTS points;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    hashed_password TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1
);

CREATE TABLE points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE recycling_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    event_type TEXT,
    points_earned INTEGER,
    created_at TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Usuario de prueba (contraseña: 1234, hash generado con bcrypt)
INSERT INTO users (username, email, full_name, hashed_password, is_active)
VALUES (
    'demo',
    'demo@correo.com',
    'Usuario demo',
    '$2b$12$w1QwQwQwQwQwQwQwQwQwQeQwQwQwQwQwQwQwQwQwQwQwQwQwQw',
    1
);
