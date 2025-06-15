from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import List, TYPE_CHECKING

if TYPE_CHECKING: #ensure that import post only user for type hints and not at runtime
    from .post import Post

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, description='user id')
    email: str = Field(description='user email', unique=True)
    password: str = Field(description='user password', min_length=8)
    created_date: datetime = Field(description='user creation date',default=datetime.now())
    updated_date : datetime = Field(description='user update date',default=datetime.now())
    user_type: str = Field(description='type of user, admin or user', default='user')
    username: str = Field(description='User screen name', min_length=16, unique=True)
    first_name: str
    middle_name: str
    last_name: str
    avatar_url: str = Field(description='user avatar image', default=None, nullable=True)
    
    posts: List["Post"] = Relationship(back_populates="user")