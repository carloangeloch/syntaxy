from sqlmodel import SQLModel, Field
from datetime import datetime

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, description='user id')
    email: str = Field(description='user email', unique=True)
    password: str = Field(default='user password', min_length=8)
    created_date: datetime = Field(description='user creation date',default=datetime.now())
    updated_date : datetime = Field(description='user update date',default=datetime.now())
