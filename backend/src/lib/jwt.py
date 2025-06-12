from authlib.jose import jwt,JoseError
from datetime import datetime, timedelta, timezone
import time
import os


SECRET_KEY = os.getenv('JWT_SECRET')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 60 * 60 * 24 # 1 day

def create_token(data:dict):
    payload = data
    expire = time.time() + ACCESS_TOKEN_EXPIRE_SECONDS
    payload.update({"exp": expire, "iat": time.time()})
    return jwt.encode({"alg": ALGORITHM}, payload, SECRET_KEY,)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY)
        print('Payload from jwt', payload)
        return payload
    except JoseError:
        return {'Error': JoseError.error}