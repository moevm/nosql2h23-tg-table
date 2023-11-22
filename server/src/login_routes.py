from fastapi import APIRouter, Request

router = APIRouter()


@router.get('/', response_description="")
def auth(request: Request):
    login, password = request.headers["Authorization"].split(":")
    user = request.app.database["Users"].find_one({
        "login": login,
        "password": password
    })
    if user is not None:
        print("Success")
        return {"status": 200}
    else:
        print("Fail")
        return {"status": 400}
