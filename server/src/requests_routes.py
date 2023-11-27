from bson import ObjectId
from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from typing import List

from models import RequestItem

router = APIRouter()


@router.get('/', response_description="List of all requests", response_model=List[RequestItem])
def get_spreadsheets(request: Request):
    requests = list(request.app.database["Requests"].aggregate([
        {
            "$lookup": {
                "from": "Students",
                "localField": "student.studentId",
                "foreignField": "_id",
                "as": "tmpField"
            }
        },
        {
            "$addFields": {
                "groupNumber": "$tmpField.groupNumber"
            }
        },
        {
          "$unwind": "$groupNumber"
        },
        {
            "$project": {
                "tmpField": 0
            }
        }
    ]))
    return requests


@router.post(
    "/",
    response_description="Operation status"
)
def import_requests(request: Request, requests: List[RequestItem]):
    requests = jsonable_encoder(requests)
    for req in requests:
        req["_id"] = ObjectId(req["_id"])
        req["student"]["studentId"] = ObjectId(req["student"]["studentId"])
        req["spreadsheet"]["spreadsheetId"] = ObjectId(req["spreadsheet"]["spreadsheetId"])
        del req["groupNumber"]
    delete_result = request.app.database["Requests"].delete_many({})
    insert_result = request.app.database["Requests"].insert_many(requests)
    print(insert_result.inserted_ids)
    if len(insert_result.inserted_ids) == len(requests):
        return {"status": 200}
    else:
        return {"status": 400}


