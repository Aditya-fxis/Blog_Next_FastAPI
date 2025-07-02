from pydantic import BaseModel
from datetime import datetime

class BlogCreate(BaseModel):
    title: str
    content: str

class BlogResponse(BlogCreate):
    id: int
    created_at: datetime
    # updated_at: datetime

    class Config:
        orm_mode = True
