from fastapi import FastAPI
from lib.db import engine
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):    
    yield
    engine.begin()

app = FastAPI(lifespan=lifespan)



@app.get('/')
async def home():
    return {'message':"Welcome"}