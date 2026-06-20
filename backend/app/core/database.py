from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from core.config import settings
from typing import Generator


engine = create_engine(settings.DATABASE_URL,pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

def get_db() -> Generator:
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close
