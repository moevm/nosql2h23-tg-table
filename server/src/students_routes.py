from bson import ObjectId
from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List, Optional, Union

from models import Student, StudentWithRequests, StatusAndListStudents

router = APIRouter()


# @router.get('/', response_description="List of all students", response_model=List[StudentWithRequests])
# async def get_students_requests(request: Request):
#     students = list(request.app.database["Students"].find())
#     for student in students:
#         request_count = len(list(request.app.database["Requests"].find({
#             "student.studentId": ObjectId(student["_id"])
#         })))
#         student["requestCount"] = request_count
#     return students

pageSize = 2

@router.get('/', response_description="List of all students", response_model=List[StudentWithRequests])
async def get_students_requests_params(
        request: Request,
        page: int,
        groupNumber: Union[str, None] = None,
        name: Union[str, None] = None,
        telegramId: Union[str, None] = None,
        requestCount: Union[int, None] = None,
):
    telegramId = telegramId if (telegramId is not None) else ""
    groupNumber = groupNumber if (groupNumber is not None) else ""
    name = name if (name is not None) else ""
    requestCount = requestCount if (requestCount is not None) else -1
    query = {
        "groupNumber": {
            "$regex": "{group}".format(group=groupNumber),
        },
        "name": {
            "$regex": "{name}".format(name=name),
            '$options': 'i'
        },
        "telegramId": {
            "$regex": "{telegram_id}".format(telegram_id=telegramId),
            '$options': 'i'
        },
        "requestCount": ({"$gt": requestCount} if (requestCount==-1) else requestCount)
    }
    students = list(request.app.database["Students"].aggregate([
        {
            "$lookup": {
                "from": "Requests",
                "localField": "_id",
                "foreignField": "student.studentId",
                "as": "tmpField"
            }
        },
        {
            "$addFields": {
                "requestCount": {"$size": "$tmpField"}
            }
        },
        {
            "$unwind": "$requestCount"
        },
        {
            "$match": query
        },
        {
            "$skip": page*pageSize
        },
        {
            "$limit": pageSize
        }
    ]))
    return students


@router.get('/all', response_description="List of all students", response_model=List[Student])
async def get_students(request: Request):
    students = list(request.app.database["Students"].find())
    return students


@router.post(
    "/add_student",
    response_description="Operation status + inserted _id",
    response_model=StatusAndListStudents
)
def create_student(request: Request, student: Student):
    student = jsonable_encoder(student)
    student["_id"] = ObjectId()
    insert_result = request.app.database["Students"].insert_one(student)
    if insert_result.inserted_id is not None:
        students = list(request.app.database["Students"].aggregate([
            {
                "$lookup": {
                    "from": "Requests",
                    "localField": "_id",
                    "foreignField": "student.studentId",
                    "as": "tmpField"
                }
            },
            {
                "$addFields": {
                    "requestCount": {"$size": "$tmpField"}
                }
            },
            {
                "$unwind": "$requestCount"
            },
            {
                "$skip": 0 * pageSize
            },
            {
                "$limit": pageSize
            }]))
        return {"status": 201, "students": students}
    else:
        return {"status": 400, "students": []}


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
    response_description="Operations status",
    response_model=StatusAndListStudents
)
def delete_student(request: Request, student: Student):
    student = jsonable_encoder(student)
    delete_result = request.app.database["Students"].delete_one(
        {"_id": ObjectId(student["_id"])}
    )
    if delete_result.deleted_count == 0:
        return {"status": 400, "students": []}
    else:
        students = list(request.app.database["Students"].aggregate([
            {
                "$lookup": {
                    "from": "Requests",
                    "localField": "_id",
                    "foreignField": "student.studentId",
                    "as": "tmpField"
                }
            },
            {
                "$addFields": {
                    "requestCount": {"$size": "$tmpField"}
                }
            },
            {
                "$unwind": "$requestCount"
            },
            {
                "$skip": 0 * pageSize
            },
            {
                "$limit": pageSize
            }]))
        return {"status": 200, "students": students}


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
    if len(insert_result.inserted_ids) == len(students):
        return {"status": 200}
    else:
        return {"status": 400}
