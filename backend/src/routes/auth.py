from fastapi import APIRouter, status, Request
from fastapi.responses import JSONResponse
from serializers.user import (
    UserSignupSerializer,
    UserGetSerializer,
    UserLoginSerializer
)
from models.user import User
from sqlmodel import select, Session
from lib.db import engine
import bcrypt
import json
from datetime import datetime
from lib.jwt import create_token, verify_token


router = APIRouter()

@router.get('/users')
async def get_users():
    return {"message":'user api'}

#signup
@router.post('/signup', response_model=UserSignupSerializer )
async def signup(req : UserSignupSerializer):
    if len(req.password) < 8:
        return JSONResponse({"error":"Password is less than 8 characters."}, status_code=status.HTTP_400_BAD_REQUEST)
    with Session(engine) as session:
        statement = select(User).where(User.email == req.email)
        result = session.exec(statement).first()
        if result:
            return JSONResponse({"error":"User already exists"}, status_code=status.HTTP_400_BAD_REQUEST)
        salt =  bcrypt.gensalt(10)
        hashedPassword =  bcrypt.hashpw(req.password.encode('utf-8'),salt)
        user = User(
            email = req.email,
            password = hashedPassword.decode('utf-8'),
            created_date=datetime.now(),
            updated_date=datetime.now()
        )
        session.add(user)
        session.commit()
        user_json = json.loads(UserGetSerializer.model_validate(user).model_dump_json())
        res = JSONResponse(user_json, status_code=status.HTTP_201_CREATED)
        res.set_cookie(key='jwt', value=create_token(user_json), httponly=True, secure=True, samesite='strict', max_age= 7 * 24 * 60 * 60 )
        session.refresh(user)
        return res
    return JSONResponse({'error':'Internal Error'}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

#login
@router.post('/login', response_model=UserGetSerializer)
async def login(req: UserLoginSerializer):
    with Session(engine) as session:
        statement = select(User).where(User.email == req.email)
        user = session.exec(statement).first()
        if not user:
            return JSONResponse({"Error":"Invalid Credentials"}, status_code=status.HTTP_401_UNAUTHORIZED)
        isMatch = bcrypt.checkpw(req.password.encode('utf-8'), user.password.encode('utf-8'))
        if not isMatch:
            return JSONResponse({"Error":"Invalid Credentials"}, status_code=status.HTTP_401_UNAUTHORIZED)
        user_json = json.loads(UserGetSerializer.model_validate(user).model_dump_json())
        res = JSONResponse(user_json, status_code=status.HTTP_200_OK)
        token = create_token(user_json)
        res.set_cookie(key='jwt', value=token.decode('utf-8') , httponly=True, secure=True, samesite='strict', max_age= 7 * 24 * 60 * 60 )
        return res
    return JSONResponse({'error':'Internal Error'}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

#logout
@router.post('/logout', )
async def logout():
    res = JSONResponse({'message':'Logged out'}, status_code=status.HTTP_200_OK)
    res.set_cookie(key='jwt', value='', max_age=0)
    return res

#check - check if user is logged in or not
@router.post('/check', response_model=UserGetSerializer)
async def check_auth(req: Request):
    token = req.cookies.get('jwt')
    if not token:
        return JSONResponse({"Error": "Authorization Error - No token found."}, status_code=status.HTTP_401_UNAUTHORIZED)
    with Session(engine) as session:
        decoded = verify_token(token.encode('utf-8'))
        statement = select(User).where(User.email == decoded.get('email'))
        user = session.exec(statement).first()
        if not user:
            return JSONResponse({"Error": "Authorization Error - No token found."}, status_code=status.HTTP_401_UNAUTHORIZED)
        user_json = json.loads(UserGetSerializer.model_validate(user).model_dump_json())
        res = JSONResponse(user_json, status_code=status.HTTP_200_OK)
        token = create_token(user_json)
        res.set_cookie(key='jwt', value=token.decode('utf-8'), httponly=True, secure=True, samesite='strict', max_age= 7 * 24 * 60 * 60 )
        return res
    return JSONResponse({'error':'Internal Error'}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)