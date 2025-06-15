from pydantic import BaseModel, ConfigDict
from typing import Optional
from models.post import PostStatus
from datetime import datetime

class CreatePostSerializer(BaseModel):
    title: str
    content: str
    image: str
    tags: str

    model_config = ConfigDict(from_attributes=True)