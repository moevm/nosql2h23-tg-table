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


class StatusAndListStudents(BaseModel):
    students: List[StudentWithRequests] = Field()
    status: int = Field()


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


class SheetStatus(BaseModel):
    sheet: Sheet = Field()
    status: int = Field()


class SpreadsheetShort(MongoDbEntity):
    name: str = Field()


class Spreadsheet(SpreadsheetShort):
    sheets: List[Sheet]
    link: str = Field()


class SpreadsheetStatus(BaseModel):
    spreadsheet: Spreadsheet = Field()
    status: int = Field()


class RequestStudent(BaseModel):
    studentId: Optional[PyObjectId] = Field(default=None)
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


class RequestItemGroupNumber(RequestItem):
    groupNumber: str = Field()


class StudentAndStatus(BaseModel):
    student: Optional[Student] = Field(default=None)
    status: int = Field()


class StudentAndSpreadsheet(BaseModel):
    userName: str = Field()
    table: str = Field()
