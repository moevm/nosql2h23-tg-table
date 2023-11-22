from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Student

router = APIRouter()


@router.get('/', response_description="List of all students", response_model=List[Student])
def get_users(request: Request):
    users = list(request.app.database["Students"].find())
    return users


@router.post(
    "/",
    response_description="Create a new student",
    status_code=status.HTTP_201_CREATED,
    response_model=Student
)
def create_student(request: Request, student: Student = Body(...)):
    student = jsonable_encoder(student)
    new_user = request.app.database["Students"].insert_one(student)
    created_user = request.app.database["Students"].find_one(
        {"_id": new_user.inserted_id}
    )
    return created_user
