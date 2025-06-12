from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime

class UserSignupSerializer(BaseModel):
    email: EmailStr
    password: str
    created_date: datetime
    updated_date : datetime
    
class UserGetSerializer(BaseModel):
    email: EmailStr
    created_date: datetime
    updated_date : datetime
    
    model_config = ConfigDict(from_attributes=True)

class UserLoginSerializer(BaseModel):
    email: EmailStr
    password: str