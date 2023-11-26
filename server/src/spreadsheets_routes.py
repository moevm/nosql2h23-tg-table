from bson import ObjectId
from fastapi import APIRouter, Body, Request, Response, HTTPException
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Spreadsheet, SpreadsheetShort

router = APIRouter()


@router.get('/', response_description="List of all spreadsheets", response_model=List[SpreadsheetShort])
def get_spreadsheets(request: Request):
    spreadsheets = list(request.app.database["Spreadsheets"].aggregate([
        {"$project": {"_id": 1, "name": 1, "link": 1}}
    ]))
    return spreadsheets


@router.post('/')
def add_spreadsheet(request: Request, spreadsheet: Spreadsheet):
    print(spreadsheet)
    spreadsheet = jsonable_encoder(spreadsheet)
    spreadsheet["_id"] = ObjectId()
    for sheet in spreadsheet["sheets"]:
        sheet["_id"] = ObjectId()
    new_spreadsheet = request.app.database["Spreadsheets"].insert_one(spreadsheet)
    created_spreadsheet = request.app.database["Spreadsheets"].find_one(
        {"_id": new_spreadsheet.inserted_id}
    )
    if spreadsheet is not None:
        return {"status": 201, "_id": str(created_spreadsheet.get("_id"))}
    else:
        return {"status": 400}


@router.delete(
    "/",
    response_description="Operations status"
)
def delete_student(request: Request, spreadsheet: SpreadsheetShort):
    spreadsheet = jsonable_encoder(spreadsheet)
    delete_result = request.app.database["Spreadsheets"].delete_one(
        {"_id": ObjectId(spreadsheet["_id"])}
    )
    if delete_result.deleted_count == 0:
        return {"status": 400}
    else:
        return {"status": 200}


@router.get('/{_id}', response_description="List of all spreadsheets", response_model=Spreadsheet)
def get_spreadsheet(_id: str, request: Request):
    spreadsheet = request.app.database['Spreadsheets'].find_one(
        {"_id": ObjectId(_id)}
    )
    return spreadsheet

