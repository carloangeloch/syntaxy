from fastapi import FastAPI
from lib.db import engine, create_db_and_tables
from contextlib import asynccontextmanager
from routes import auth

@asynccontextmanager
async def lifespan(app: FastAPI):   
    yield
    engine.begin()
    create_db_and_tables()
    
app = FastAPI(lifespan=lifespan)


@app.get('/')
async def home():
    return {'message':"Welcome"}

app.include_router(auth.router, prefix='/api', tags=['auth'])
