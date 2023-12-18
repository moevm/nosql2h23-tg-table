from datetime import datetime

from bson import ObjectId
from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from typing import List, Union

from models import RequestItemGroupNumber, RequestItem

router = APIRouter()

pageSize = 2

@router.get('/', response_description="List of all requests", response_model=List[RequestItemGroupNumber])
def get_requests(
        request: Request,
        page: int,
        dateFrom: Union[str,None] = None,
        dateTo: Union[str, None] = None,
        groupNumber: Union[str, None] = None,
        name: Union[str, None] = None,
        spreadsheet: Union[str,None] = None
):
    dateFrom = dateFrom if (dateFrom is not None) else '1970-2-2T00:00:00Z'
    dateTo = dateTo if (dateTo is not None) else '2999-1-1T:00:00:00Z'
    groupNumber = groupNumber if (groupNumber is not None) else ""
    name = name if (name is not None) else ""
    spreadsheet = spreadsheet if (spreadsheet is not None) else ""
    query = {
        "groupNumber": {
            "$regex": "{groupNumber}".format(groupNumber=groupNumber),
        },
        "student.studentName": {
            "$regex": "{name}".format(name=name),
            '$options': 'i'
        },
        "spreadsheet.spreadsheetName": {
            "$regex": "{spreadsheet}".format(spreadsheet=spreadsheet),
            '$options': 'i'
        },
        "timestamp": {
            "$gte": dateFrom,
            "$lte": dateTo
        }
    }
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
        },
        {
            "$match": query
        },
        {
            "$skip": page * pageSize
        },
        {
            "$limit": pageSize
        }
    ]))
    return requests

@router.get(
    "/all",
    response_description="List of all requests",
    response_model=List[RequestItem]
)
async def get_all_requests(request:Request):
    requests = list(request.app.database['Requests'].find())
    return requests


@router.post(
    "/",
    response_description="Operation status"
)
async def import_requests(request: Request, requests: List[RequestItem]):
    requests = jsonable_encoder(requests)
    for req in requests:
        req["_id"] = ObjectId(req["_id"])
        req["student"]["studentId"] = ObjectId(req["student"]["studentId"])
        req["spreadsheet"]["spreadsheetId"] = ObjectId(req["spreadsheet"]["spreadsheetId"])
    delete_result = request.app.database["Requests"].delete_many({})
    insert_result = request.app.database["Requests"].insert_many(requests)
    print(insert_result.inserted_ids)
    if len(insert_result.inserted_ids) == len(requests):
        return {"status": 200}
    else:
        return {"status": 400}


