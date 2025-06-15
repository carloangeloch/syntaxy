from authlib.jose import jwt,JoseError
from datetime import datetime, timedelta, timezone
import time
import os
from typing import Tuple
from fastapi import Request, status
from fastapi.responses import JSONResponse


SECRET_KEY = os.getenv('JWT_SECRET')
ALGORITHM = "HS256"
REFRESH_TOKEN_EXPIRE_SECONDS = 7 * 24 * 60 * 60  # 7 days
ACCESS_TOKEN_EXPIRE_SECONDS = 60 * 15 # 15 mins

def create_token(data:dict) -> Tuple[str,str]:
    access_payload = data
    access_expire = time.time() + ACCESS_TOKEN_EXPIRE_SECONDS
    access_payload.update({"exp": access_expire, "iat": time.time(), 'scope': 'access'})
    access_token= jwt.encode({"alg": ALGORITHM}, access_payload, SECRET_KEY).decode('utf-8')

    refresh_payload  = data
    refresh_expire = time.time() + REFRESH_TOKEN_EXPIRE_SECONDS
    refresh_payload.update({"exp": refresh_expire, "iat": time.time(), 'scope': 'refresh'})
    refresh_token = jwt.encode({"alg":ALGORITHM}, refresh_payload, SECRET_KEY).decode('utf-8')
    return access_token, refresh_token
 
def refreshing_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY)
        if payload.get('scope')!= 'refresh':
            return {'Error': 'Token Error'}
        new_payload = payload
        new_payload['scope'] = 'access'
        return jwt.encode({"alg":ALGORITHM}, payload, SECRET_KEY).decode('utf-8')
        
    except JoseError:
        return {'Error': JoseError.error}
    
def verify_token(req: Request, res: JSONResponse):
    access_token = req.cookies.get('jwt_access')
    refresh_token = req.cookies.get('jwt_refresh')
    if not refresh_token: 
        return res({"Error": "Authorization Error - No token found."}, status_code=status.HTTP_401_UNAUTHORIZED)
    if not access_token:
        access_token = refreshing_token(refresh_token)
    try:
        payload = jwt.decode(access_token, SECRET_KEY)
        return payload
    except JoseError:
        return res({'Error': JoseError.error})
   