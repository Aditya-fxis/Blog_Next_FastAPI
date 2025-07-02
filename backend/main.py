from fastapi import FastAPI
from app.routes import blog
from app import models
from app.session import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can use ["http://localhost:3000"] for safety in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create DB tables
models.Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(blog.router)

@app.get("/")
def root():
    return {"msg": "Hello FastAPI 🚀"}
