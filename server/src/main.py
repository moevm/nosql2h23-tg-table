import uvicorn
from fastapi import FastAPI
from pymongo import MongoClient
from starlette.middleware.cors import CORSMiddleware
import os

from students_routes import router as students_router
from login_routes import router as login_router
from spreadsheets_routes import router as spreadsheets_router
from requests_routes import router as requests_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"]
)

ATLAS_URI='mongodb://localhost:27017/?retryWrites=true&w=majority'
DB_NAME='TelegramBotNoSQL'

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(ATLAS_URI)
    app.database = app.mongodb_client[DB_NAME]


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(students_router, tags=["students"], prefix="/students")
app.include_router(login_router, tags=["login"], prefix="/login")
app.include_router(spreadsheets_router, tags=['spreadsheets'], prefix='/spreadsheets')
app.include_router(requests_router, tags=['requests'], prefix='/requests')

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)