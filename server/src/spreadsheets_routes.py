from bson import ObjectId
from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Spreadsheet, SpreadsheetShort, SpreadsheetStatus, Sheet, SheetStatus
from sheets_service2 import fill_columns

router = APIRouter()


@router.get(
    '/',
    response_description="List of all spreadsheets",
    response_model=List[SpreadsheetShort]
)
def get_spreadsheets_short(request: Request):
    spreadsheets = list(request.app.database["Spreadsheets"].aggregate([
        {"$project": {"_id": 1, "name": 1, "link": 1}}
    ]))
    return spreadsheets


@router.post(
    '/',
    response_description="Operations status"
)
def add_spreadsheet(request: Request, spreadsheet: Spreadsheet):
    spreadsheet = jsonable_encoder(spreadsheet)
    result = fill_columns(spreadsheet)
    if not result:
        return {"status": 400}
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
def delete_spreadsheet(request: Request, spreadsheet: SpreadsheetShort):
    spreadsheet = jsonable_encoder(spreadsheet)
    delete_result = request.app.database["Spreadsheets"].delete_one(
        {"_id": ObjectId(spreadsheet["_id"])}
    )
    if delete_result.deleted_count == 0:
        return {"status": 400}
    else:
        return {"status": 200}


@router.get(
    '/{_id}',
    response_description="Concrete spreadsheet",
    response_model=Spreadsheet
)
def get_spreadsheet(_id: str, request: Request):
    spreadsheet = request.app.database['Spreadsheets'].find_one(
        {"_id": ObjectId(_id)}
    )
    return spreadsheet


@router.put(
    "/{_id}",
    response_description="Operation Status",
    response_model=SpreadsheetStatus
)
def update_spreadsheet(request: Request, spreadsheet: Spreadsheet):
    print(spreadsheet,flush=True)
    spreadsheet = jsonable_encoder(spreadsheet)
    spreadsheet["_id"] = ObjectId(spreadsheet["_id"])
    for sheet in spreadsheet["sheets"]:
        sheet["_id"] = ObjectId(sheet["_id"])
        for column in sheet['columns']:
            column["_id"] = ObjectId(column["_id"])
    old_spreadsheet = request.app.database['Spreadsheets'].find_one(
        {"_id": spreadsheet["_id"]}
    )
    flag = False
    for old_sheet, new_sheet in zip(old_spreadsheet["sheets"], spreadsheet["sheets"]):
        if old_sheet['headerRow'] != new_sheet['headerRow']:
            new_sheet['columns'] = []
            flag = True
    if (old_spreadsheet['link'] != spreadsheet['link']):
        flag = True
    if flag:
        result = fill_columns(spreadsheet)
        if not result:
            return {"status": 400, "spreadsheet": None}
    update_result = request.app.database["Spreadsheets"].update_one(
        {"_id": ObjectId(spreadsheet["_id"])}, {"$set": {
            "sheets": spreadsheet["sheets"],
            "link": spreadsheet['link']
        }}
    )
    if update_result.modified_count == 0:
        return {"status": 400, "spreadsheet": None}
    else:
        return {"status": 200, "spreadsheet": spreadsheet}


@router.put(
    "/{_id}/add_sheet",
    response_description="Operation Status",
    response_model=SheetStatus
)
def add_sheet(_id: str, request: Request, sheet: Sheet):
    sheet = jsonable_encoder(sheet)
    spreadsheet = request.app.database['Spreadsheets'].find_one(
        {"_id": ObjectId(_id)}
    )
    sheet["_id"] = ObjectId()
    spreadsheet["sheets"].append(sheet)
    result = fill_columns(spreadsheet)
    if not result:
        return {"status": 400}
    update_result = request.app.database["Spreadsheets"].update_one(
        {"_id": ObjectId(spreadsheet["_id"])}, {"$set": {
            "sheets": spreadsheet["sheets"],
        }}
    )
    if update_result.modified_count == 0:
        return {"status": 400, "sheet": None}
    else:
        return {"status": 200, "sheet": spreadsheet["sheets"][-1]}

@router.get(
    "/bot/{telegram_id}",
    response_description="List of spreadsheets",
    response_model=List[SpreadsheetShort]
)
def get_spreadsheets_by_telegram_id(telegram_id: str, request: Request):
    student = request.app.database['Students'].find_one(
        {"telegramId": telegram_id}
    )
    if student is not None:
        group_number = student['groupNumber']
        query = {
            "name": {
                "$regex": "{groupNumber}".format(groupNumber=group_number),
            }
        }
        spreadsheets = request.app.database['Spreadsheets'].aggregate([
            {
                "$project": {
                    "name": 1,
                    "_id": 1
                }
            },
            {
                "$match": query
            },
        ])
        return spreadsheets
    else:
        return []

