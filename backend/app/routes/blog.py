from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.session import SessionLocal
from app.views import blog as blog_view
from app.schema import BlogCreate, BlogResponse
from typing import List

router = APIRouter(prefix="/blogs", tags=["Blogs"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
def create(blog: BlogCreate, db: Session = Depends(get_db)):
    print("Received Blog:", blog.dict()) 
    return blog_view.create_blog(blog, db)

@router.put("/{id}", response_model=BlogResponse, status_code=status.HTTP_200_OK)
def update(id: int, blog: BlogCreate, db: Session = Depends(get_db)):
    return blog_view.update_blog(id, blog, db)

@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete(id: int, db: Session = Depends(get_db)):
    return blog_view.delete_blog(id, db)

@router.get("/{id}", response_model=BlogResponse)
def read(id: int, db: Session = Depends(get_db)):
    return blog_view.get_blog(id, db)

@router.get("/", response_model=List[BlogResponse])
def list(db: Session = Depends(get_db)):
    return blog_view.blog_list(db)
