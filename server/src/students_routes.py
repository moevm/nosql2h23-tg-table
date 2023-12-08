from bson import ObjectId
from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Student, StudentWithRequests

router = APIRouter()


@router.get('/', response_description="List of all students", response_model=List[StudentWithRequests])
async def get_students(request: Request):
    students = list(request.app.database["Students"].find())
    for student in students:
        request_count = len(list(request.app.database["Requests"].find({
            "student.studentId": ObjectId(student["_id"])
        })))
        student["requestCount"] = request_count
    return students


@router.post(
    "/add_student",
    response_description="Operation status + inserted _id",
)
def create_student(request: Request, student: Student):
    student = jsonable_encoder(student)
    student["_id"] = ObjectId()
    new_user = request.app.database["Students"].insert_one(student)
    created_user = request.app.database["Students"].find_one(
        {"_id": new_user.inserted_id}
    )
    if created_user is not None:
        return {"status": 201, "_id": str(created_user.get("_id"))}
    else:
        return {"status": 400}


@router.put(
    "/update_student",
    response_description="Operation Status"
)
def update_student(request: Request, student: Student):
    student = jsonable_encoder(student)
    update_result = request.app.database["Students"].update_one(
        {"_id": ObjectId(student["_id"])}, {"$set": {
            "telegramId": student["telegramId"],
            "name": student["name"],
            "groupNumber": student["groupNumber"]
        }}
    )
    if update_result.modified_count == 0:
        return {"status": 400}
    else:
        return {"status": 200}


@router.delete(
    "/delete_student",
    response_description="Operations status"
)
def delete_student(request: Request, student: Student):
    student = jsonable_encoder(student)
    delete_result = request.app.database["Students"].delete_one(
        {"_id": ObjectId(student["_id"])}
    )
    if delete_result.deleted_count == 0:
        return {"status": 400}
    else:
        return {"status": 200}

@router.post(
    "/",
    response_description="Operation status"
)
def import_students(request: Request, students: List[Student]):
    students = jsonable_encoder(students)
    delete_result = request.app.database["Students"].delete_many({})
    for student in students:
        student["_id"] = ObjectId(student["_id"])
    insert_result = request.app.database["Students"].insert_many(students)
    print(insert_result.inserted_ids)

    if len(insert_result.inserted_ids) == len(students):
        return {"status": 200}
    else:
        return {"status": 400}


