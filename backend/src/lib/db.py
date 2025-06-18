from supabase import Client, create_client
from sqlmodel import create_engine, SQLModel
from dotenv import load_dotenv
import os

load_dotenv()

supabase: Client = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))
DB_NAME = f'postgresql://postgres.dpcpvqlqpmkbbcilbpij:{os.getenv('SQL_PWD')}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres'

engine = create_engine(DB_NAME, echo=True)
# engine = create_engine('sqlite:///database.db', echo=True)
print('Server Running . . . ')

def create_db_and_tables():
    #migrate all tables
    SQLModel.metadata.create_all(engine)
    print('models migrated . . .')


