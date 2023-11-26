from __future__ import annotations

from datetime import datetime
from typing import Annotated, Optional, List

from bson import ObjectId
from pydantic import BaseModel, Field, BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]


class MongoDbEntity(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True


class Student(MongoDbEntity):
    telegramId: str = Field()
    name: str = Field()
    groupNumber: str = Field()


class StudentWithRequests(Student):
    requestCount: int = Field()

class Column(MongoDbEntity):
    name: str = Field()
    index: int = Field()
    isTelegramId: bool = Field()
    isAccesible: bool = Field()


class Sheet(MongoDbEntity):
    startRow: int = Field()
    endRow: int = Field()
    headerRow: int = Field()
    startColumn: int = Field()
    endColumn: int = Field()
    columns: List[Column]


class SpreadsheetShort(MongoDbEntity):
    name: str = Field()


class Spreadsheet(SpreadsheetShort):
    sheets: List[Sheet]
    link: str = Field()


class RequestStudent(BaseModel):
    studentId: Optional[PyObjectId] = Field(efault=None)
    studentName: str = Field()

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True


class RequestSpreadsheet(BaseModel):
    spreadsheetId: Optional[PyObjectId] = Field(default=None)
    spreadsheetName: str = Field()

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True


class RequestItem(MongoDbEntity):
    student: RequestStudent = Field()
    spreadsheet: RequestSpreadsheet = Field()
    timestamp: datetime = Field()
    groupNumber: str = Field()

