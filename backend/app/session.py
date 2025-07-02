from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Connection string
DATABASE_URL = "postgresql://aditya:password@localhost:5432/blogDb"

# Create engine
engine = create_engine(DATABASE_URL)

# SessionLocal is the DB session (used in each request)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base for models to inherit from
Base = declarative_base()
