from fastapi import FastAPI
from lib.db import engine, create_db_and_tables
from contextlib import asynccontextmanager
from routes import auth, post
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):   
    yield
    engine.begin()
    create_db_and_tables()
    
app = FastAPI(lifespan=lifespan)


# CORS (adjust for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def home():
    return {'message':"Welcome"}

app.include_router(auth.router, prefix='/api', tags=['auth'])
app.include_router(post.router, prefix='/api', tags=['post'])
