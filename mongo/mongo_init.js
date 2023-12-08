db = db.getSiblingDB('admin')
db.auth('root', 'root')
db = db.getSiblingDB('TelegramBotNoSQL')

db.createCollection('Users')
db.Users.insertOne({
    "login": "admin",
    "password": "admin"
})

db.createCollection('Students')
db.Students.insertMany([
    {
        "_id": ObjectId("653527df62d4a2a9cab87131"),
        "telegramId": "dizadan",
        "name": "Chegodaev Kondratiy Sergeevich",
        "groupNumber": "0382"
    },
    {
        "_id": ObjectId("65352ba662d4a2a9cab87140"),
        "telegramId": "elizacheee",
        "name": "Chegodaeva ELIZAVETA ALEXANDROVNA",
        "groupNumber": "0382"
    },
    {
        "_id": ObjectId("653542aa8c2c31c163e62069"),
        "telegramId": "dise0126",
        "name": "Sergeev Dmitriy Andreevich",
        "groupNumber": "3333"
    },
    {
        "_id": ObjectId("6560fd498f8db1f5705f4fba"),
        "telegramId": "liza0382",
        "name": "Liza",
        "groupNumber": "0382"
    }
])

db.createCollection('Spreadsheets')
db.Spreadsheets.insertMany([
    {
        "_id": ObjectId("6535285262d4a2a9cab87fff"),
        "link": "https://docs.google.com/spreadsheets/d/1mOdWylUHkB8SrBND8HQyPcK2po8QYdHQ0G_27Rvh2jU/edit#gid=1317688922",
        "name": "[NoSQL] 0382",
        "sheets": [
            {
                "_id": ObjectId("aaa527df62d4a2a9cab8713a"),
                "startRow": 3,
                "endRow": 15,
                "headerRow": 2,
                "startColumn": 1,
                "endColumn": 2,
                "columns": [
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab8713a"),
                        "name": "ФИО",
                        "index": 13,
                        "isTelegramId": false,
                        "isAccesible": false
                    },
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab5647c"),
                        "name": "Логин Telegram",
                        "index": 2,
                        "isTelegramId": true,
                        "isAccesible": false
                    }
                ]
            }
        ]
    },
    {
        "_id": ObjectId("65353be48c2c31c163e62068"),
        "link": "doodle.doc",
        "name": "[OOP] 3383",
        "sheets": [
            {
                "_id": ObjectId("65353be48c2c31c163e62065"),
                "startRow": 4,
                "endRow": 33,
                "headerRow": 2,
                "startColumn": 1,
                "endColumn": 5,
                "columns": [
                    {
                        "_id": ObjectId("65353be48c2c31c163e62066"),
                        "name": "ФИО",
                        "index": 0,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("65353be48c2c31c163e62067"),
                        "name": "TelegramId",
                        "index": 1,
                        "isTelegramId": true,
                        "isAccesible": false
                    }
                ]
            }
        ]
    }
])

db.createCollection('Requests')
db.Requests.insertMany([
    {
        "_id": ObjectId("6535285262d4a2a9cab87bcd"),
        "student": {
            "studentId": ObjectId("653527df62d4a2a9cab87131"),
            "studentName": "Chegodaev Kondratiy Sergeevich"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("6535285262d4a2a9cab87fff"),
            "spreadsheetName": "[NoSQL] 0382"
        },
        "timestamp": "2023-10-11T21:00:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87853"),
        "student": {
            "studentId": ObjectId("65352ba662d4a2a9cab87140"),
            "studentName": "Chegodaeva ELIZAVETA ALEXANDROVNA"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("6535285262d4a2a9cab87fff"),
            "spreadsheetName": "[NoSQL] 0382"
        },
        "timestamp": "2023-11-15T19:00:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87556"),
        "student": {
            "studentId": ObjectId("653542aa8c2c31c163e62069"),
            "studentName": "Sergeev Dmitriy Andreevich"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("65353be48c2c31c163e62068"),
            "spreadsheetName": "[OOP] 3383"
        },
        "timestamp": "2022-10-25T20:33:11Z"
    }
])

db.createCollection('Groups')
db.Groups.insertMany([
    {
        "_id": ObjectId("653527df62d4a2a9cab8713a"),
        "number": "0382",
        "spreadsheets": [
            {
                "_id": ObjectId("6535285262d4a2a9cab87fff"),
                "name": "[NoSQL] 0382"
            }
        ]
    },
    {
        "_id": ObjectId("65353be48c2c31c163e62064"),
        "number": "3383",
        "spreadsheets": [
            {
                "_id": ObjectId("65353be48c2c31c163e62068"),
                "name": "[OOP] 3383"
            }
        ]
    }
])