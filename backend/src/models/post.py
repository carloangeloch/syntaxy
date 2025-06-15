from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from enum import Enum

if TYPE_CHECKING:
    from .user import User


class PostStatus(str, Enum):
    pending = 'pending'
    draft = 'draft'
    hidden = 'hidden'
    publish = 'publish'


class Post(SQLModel, table=True):
    id: int = Field (default=None, primary_key=True, description="post id")
    user_id: int = Field(foreign_key= "user.id", description="User id of post owner")
    title: str= Field(min_length=250, description='title of the post', nullable=True, default=None )
    content: str = Field(description='content of the post')
    image: str = Field(default=None, nullable=True, description='an image added to the post')
    tags: str = Field(default=None, nullable=True, description='string converted list of keywords or tags')
    status: PostStatus = Field(default=PostStatus.draft, description='post status')
    created_at: datetime = Field(default=datetime.now(), description='post creation date')
    published_at: datetime = Field(default=datetime.now(), description='post published date')
    likes_count: int = Field(default=0, description='Total number of likes')
    
    user: Optional["User"] = Relationship(back_populates="posts")