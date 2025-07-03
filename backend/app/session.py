from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings
# Connection string
# DATABASE_URL = "postgresql://user:password@localhost:5432/Db"
# Create engine
engine = create_engine(settings.DATABASE_URL)

# SessionLocal is the DB session (used in each request)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base for models to inherit from
Base = declarative_base()
