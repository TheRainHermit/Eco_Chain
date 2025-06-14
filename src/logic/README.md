# EcoChain Points Management System

## Overview
EcoChain is a backend system designed to manage points for users participating in recycling events. The system includes user authentication, event logging, points calculation, and statistics retrieval.

## Features
- User authentication with token generation
- Points management based on recycling events
- Event logging for recycling activities
- Statistics generation for user engagement and points distribution

## Project Structure
```
ecochain-backend
├── app
│   ├── main.py                # Entry point of the application
│   ├── api                    # API endpoints
│   │   ├── auth.py            # Authentication endpoints
│   │   ├── points.py          # Points management endpoints
│   │   ├── events.py          # Recycling events endpoints
│   │   └── stats.py           # Statistics endpoints
│   ├── core                   # Core application logic
│   │   ├── config.py          # Configuration settings
│   │   └── security.py        # Security utilities
│   ├── models                 # Database models
│   │   ├── user.py            # User model
│   │   ├── event.py           # Recycling event model
│   │   └── points.py          # Points model
│   ├── schemas                # Pydantic schemas for validation
│   │   ├── user.py            # User schemas
│   │   ├── event.py           # Event schemas
│   │   └── points.py          # Points schemas
│   ├── services               # Business logic services
│   │   ├── auth_service.py    # Authentication logic
│   │   ├── points_service.py   # Points management logic
│   │   ├── event_service.py   # Recycling event logic
│   │   └── stats_service.py   # Statistics generation logic
│   └── db                     # Database connection and session management
│       ├── session.py         # Database session handling
├── requirements.txt           # Project dependencies
└── README.md                  # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd ecochain-backend
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up the database (if applicable).

## Usage
To run the application, execute the following command:
```
uvicorn app.main:app --reload
```

Visit `http://localhost:8000/docs` to access the API documentation and test the endpoints.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.