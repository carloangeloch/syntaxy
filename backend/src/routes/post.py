from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse
from lib.jwt import verify_token
from lib.db import engine
from sqlmodel import Session, select
from datetime import datetime

from models.user import User
from models.post import Post
from serializers.post import CreatePostSerializer

router = APIRouter()


#get all post
@router.get('/post/all')
async def get_posts(req: Request):
    payload = verify_token(req, JSONResponse)
    try:
        with Session(engine) as session:
            statement = select(User).where(User.email == payload.get('email'))
            user = session.exec(statement).first()
            if user.user_type == 'admin':
                return JSONResponse({"message":'post api'}, status_code=status.HTTP_401_UNAUTHORIZED)
            else:
                return JSONResponse({"Error":'not an admin user'}, status_code=status.HTTP_401_UNAUTHORIZED)
    except:
        return JSONResponse({'Error':'Error on get post all'}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
#create a category 

#create a post
@router.post('/post/create')
async def create_post(req: Request, serializer: CreatePostSerializer):
    payload = verify_token(req, JSONResponse)
    with Session(engine) as session:
        statement = select(User).where(User.email == payload.get('email'))
        user = session.exec(statement).first()
        print("result user", user)
        print("result user ID", user.id)
        post = Post(
            user_id=user.id,
            title = serializer.title,
            content =  serializer.content,
            image= serializer.image,
            tags = serializer.tags,
            status = "publish",
            created_at = datetime.now(),
            published_at =  datetime.now(),
            likes_count = 0)
        session.add(post)
        session.commit()
        session.refresh(post)
        return JSONResponse({"Message":"post Created"}, status_code=status.HTTP_201_CREATED)
    return JSONResponse({'Error':'Error on create post'}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

#get post by id
@router.get('/post/:id')
async def get_post(id, req: Request):
    pass

#edit post by id
#delete post by id
