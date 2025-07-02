from sqlalchemy.orm import Session
from fastapi import HTTPException
from app import models
from app.schema import BlogCreate


def create_blog(blog: BlogCreate, db: Session):
    new_blog = models.Blog(title=blog.title, content=blog.content)
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog


def get_blog(id: int, db: Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Not Found")
    return blog


def blog_list(db: Session):
    blogs = db.query(models.Blog).all()
    if not blogs:
        raise HTTPException(status_code=404, detail="Not Found")
    return blogs


def update_blog(id: int, blog_data: BlogCreate, db: Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Not Found")
    
    blog.title = blog_data.title
    blog.content = blog_data.content

    db.commit()
    db.refresh(blog)
    return blog


def delete_blog(id: int, db: Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Not Found")
    title=blog.title
    db.delete(blog)
    db.commit()
    return {"message": f"Blog with title '{title}' deleted successfully"}
