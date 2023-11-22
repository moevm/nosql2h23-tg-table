from fastapi import FastAPI
from dotenv import dotenv_values
from pymongo import MongoClient
from starlette.middleware.cors import CORSMiddleware

from students_routes import router as users_router
from login_routes import router as login_router

config = dotenv_values(".env")

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config["ATLAS_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    print("Connected to the MongoDB database!")


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(users_router, tags=["users"], prefix="/users")
app.include_router(login_router, tags=["login"], prefix="/login")
