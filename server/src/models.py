from __future__ import annotations

from typing import Annotated, Optional

from bson import ObjectId
from pydantic import BaseModel, Field, BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]


class Student(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    telegramId: str = Field()
    name: str = Field()
    groupNumber: str = Field()

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True


class StudentWithRequests(Student):
    requestCount: int = Field()
