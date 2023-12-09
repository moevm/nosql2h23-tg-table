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
        "groupNumber": "0381"
    },
    {
        "_id": ObjectId("65352ba662d4a2a9cab87140"),
        "telegramId": "elizache",
        "name": "Chegodaeva Elizaveta Alexandrovna",
        "groupNumber": "0382"
    },
    {
        "_id": ObjectId("653542aa8c2c31c163e62069"),
        "telegramId": "dise0126",
        "name": "Sergeev Dmitriy Andreevich",
        "groupNumber": "0383"
    },
    {
        "_id": ObjectId("6560fd498f8db1f5705f4fba"),
        "telegramId": "liza0382",
        "name": "Liza",
        "groupNumber": "0382"
    },
    {
        "_id": ObjectId("6560fd498f8db1f5705f4fcf"),
        "telegramId": "vMenyaStrelyaliYaUpalVLuzhu",
        "name": "Alexander Sergeevich Pushkin",
        "groupNumber": "3383"
    }
])

db.createCollection('Spreadsheets')
db.Spreadsheets.insertMany([
    {
        "_id": ObjectId("6535285262d4a2a9cab87fff"),
        "link": "https://docs.google.com/spreadsheets/d/1mOdWylUHkB8SrBND8HQyPcK2po8QYdHQ0G_27Rvh2jU/edit#gid=1317688922",
        "name": "[NoSQL] 0381, 0382, 0383",
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
                        "index": 1,
                        "isTelegramId": false,
                        "isAccesible": false
                    },
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab5647c"),
                        "name": "Логин Telegram",
                        "index": 2,
                        "isTelegramId": true,
                        "isAccesible": false
                    },
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab5635e"),
                        "name": "Проект",
                        "index": 3,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab5444a"),
                        "name": "Онлайн-курс",
                        "index": 4,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab54441"),
                        "name": "Сумма баллов за проект",
                        "index": 5,
                        "isTelegramId": false,
                        "isAccesible": false
                    }
                ]
            },
            {
                "_id": ObjectId("aaa527df62d4a2a9cab871ef"),
                "startRow": 3,
                "endRow": 15,
                "headerRow": 2,
                "startColumn": 1,
                "endColumn": 2,
                "columns": [
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab871aa"),
                        "name": "Проект",
                        "index": 1,
                        "isTelegramId": false,
                        "isAccesible": false
                    },
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab564ab"),
                        "name": "БД+ЯП",
                        "index": 2,
                        "isTelegramId": false,
                        "isAccesible": false
                    },
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab563ac"),
                        "name": "Use case",
                        "index": 3,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab544ad"),
                        "name": "Прототип анализ",
                        "index": 4,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("fff527df62d4a2a9cab544ae"),
                        "name": "Сумма баллов за проект",
                        "index": 5,
                        "isTelegramId": false,
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
                        "index": 1,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("65353be48c2c31c163e62067"),
                        "name": "TelegramId",
                        "index": 2,
                        "isTelegramId": true,
                        "isAccesible": false
                    },
                    {
                        "_id": ObjectId("65353be48c2c31c163e62068"),
                        "name": "Ты молодец?",
                        "index": 3,
                        "isTelegramId": false,
                        "isAccesible": false
                    }
                ]
            }
        ]
    },
    {
        "_id": ObjectId("65353be48c2c31c163e62abc"),
        "link": "https://docs.google.com/spreadsheets/d/170lyphK8q2C4IGyfA8HEvDOHvhc29GBCswUn1t0DUsU/edit?resourcekey#gid=2100732164",
        "name": "[SW] 0381,0382,0383,0304,0304",
        "sheets": [
            {
                "_id": ObjectId("65353be48c2c31c163e6abc1"),
                "startRow": 4,
                "endRow": 33,
                "headerRow": 2,
                "startColumn": 1,
                "endColumn": 5,
                "columns": [
                    {
                        "_id": ObjectId("65353be48c2c31c163e6abc2"),
                        "name": "ФИО",
                        "index": 1,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("65353be48c2c31c163e6abc3"),
                        "name": "Группа",
                        "index": 2,
                        "isTelegramId": false,
                        "isAccesible": false
                    },
                    {
                        "_id": ObjectId("65353be48c2c31c163e6abc4"),
                        "name": "Проверяет",
                        "index": 3,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("65353be48c2c31c163e6abc5"),
                        "name": "Онлайн-курс",
                        "index": 4,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("65353be48c2c31c163e6abc6"),
                        "name": "Сумма баллов",
                        "index": 5,
                        "isTelegramId": false,
                        "isAccesible": true
                    }
                ]
            },
            {
                "_id": ObjectId("65353be48c2c31c163e6abc7"),
                "startRow": 4,
                "endRow": 33,
                "headerRow": 2,
                "startColumn": 1,
                "endColumn": 5,
                "columns": [
                    {
                        "_id": ObjectId("65353be48c2c31c163e6abc8"),
                        "name": "user id",
                        "index": 1,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": ObjectId("65353be48c2c31c163e6abc9"),
                        "name": "full name",
                        "index": 2,
                        "isTelegramId": false,
                        "isAccesible": false
                    },
                    {
                        "_id": ObjectId("65353be48c2c31c163e6abca"),
                        "name": "total score",
                        "index": 3,
                        "isTelegramId": false,
                        "isAccesible": true
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
            "spreadsheetName": "[NoSQL] 0381, 0382, 0383"
        },
        "timestamp": "2023-10-11T21:00:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87853"),
        "student": {
            "studentId": ObjectId("65352ba662d4a2a9cab87140"),
            "studentName": "Chegodaeva Elizaveta Alexandrovna"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("6535285262d4a2a9cab87fff"),
            "spreadsheetName": "[NoSQL] 0381, 0382, 0383"
        },
        "timestamp": "2023-11-15T19:00:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87556"),
        "student": {
            "studentId": ObjectId("6560fd498f8db1f5705f4fcf"),
            "studentName": "Alexander Sergeevich Pushkin",
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("65353be48c2c31c163e62068"),
            "spreadsheetName": "[OOP] 3383"
        },
        "timestamp": "2022-10-25T20:33:11Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87cc1"),
        "student": {
            "studentId": ObjectId("65352ba662d4a2a9cab87140"),
            "studentName": "Chegodaeva Elizaveta Alexandrovna"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("65353be48c2c31c163e62abc"),
            "spreadsheetName": "[SW] 0381,0382,0383,0304,0304"
        },
        "timestamp": "2023-12-01T14:31:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87cc2"),
        "student": {
            "studentId": ObjectId("65352ba662d4a2a9cab87140"),
            "studentName": "Chegodaeva Elizaveta Alexandrovna"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("65353be48c2c31c163e62abc"),
            "spreadsheetName": "[SW] 0381,0382,0383,0304,0304"
        },
        "timestamp": "2023-12-02T14:31:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87cc3"),
        "student": {
            "studentId": ObjectId("65352ba662d4a2a9cab87140"),
            "studentName": "Chegodaeva Elizaveta Alexandrovna"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("65353be48c2c31c163e62abc"),
            "spreadsheetName": "[SW] 0381,0382,0383,0304,0304"
        },
        "timestamp": "2023-12-03T14:31:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87cca"),
        "student": {
            "studentId": ObjectId("653542aa8c2c31c163e62069"),
            "studentName": "Sergeev Dmitriy Andreevich"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("65353be48c2c31c163e62abc"),
            "spreadsheetName": "[SW] 0381,0382,0383,0304,0304"
        },
        "timestamp": "2023-12-05T16:33:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87cc4"),
        "student": {
            "studentId": ObjectId("65352ba662d4a2a9cab87140"),
            "studentName": "Chegodaeva Elizaveta Alexandrovna"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("65353be48c2c31c163e62abc"),
            "spreadsheetName": "[SW] 0381,0382,0383,0304,0304"
        },
        "timestamp": "2023-12-05T14:31:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87cc5"),
        "student": {
            "studentId": ObjectId("65352ba662d4a2a9cab87140"),
            "studentName": "Chegodaeva Elizaveta Alexandrovna"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("65353be48c2c31c163e62abc"),
            "spreadsheetName": "[SW] 0381,0382,0383,0304,0304"
        },
        "timestamp": "2023-12-09T14:31:00Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87ccb"),
        "student": {
            "studentId": ObjectId("653542aa8c2c31c163e62069"),
            "studentName": "Sergeev Dmitriy Andreevich"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("6535285262d4a2a9cab87fff"),
            "spreadsheetName": "[NoSQL] 0381, 0382, 0383"
        },
        "timestamp": "2023-12-09T20:33:17Z"
    },
    {
        "_id": ObjectId("6535285262d4a2a9cab87ccf"),
        "student": {
            "studentId": ObjectId("653527df62d4a2a9cab87131"),
            "studentName": "Chegodaev Kondratiy Sergeevich"
        },
        "spreadsheet": {
            "spreadsheetId": ObjectId("6535285262d4a2a9cab87fff"),
            "spreadsheetName": "[NoSQL] 0381, 0382, 0383"
        },
        "timestamp": "2023-12-10T21:33:15Z"
    },
])

db.createCollection('Groups')
db.Groups.insertMany([
    {
        "_id": ObjectId("653527df62d4a2a9cab87131"),
        "number": "0381",
        "spreadsheets": [
            {
                "_id": ObjectId("65353be48c2c31c163e62abc"),
                "name": "[SW] 0381,0382,0383,0304,0304",
            }
        ]
    },
    {
        "_id": ObjectId("653527df62d4a2a9cab8713a"),
        "number": "0382",
        "spreadsheets": [
            {
                "_id": ObjectId("6535285262d4a2a9cab87fff"),
                "name": "[NoSQL] 0381, 0382, 0383"
            },
            {
                "_id": ObjectId("65353be48c2c31c163e62abc"),
                "name": "[SW] 0381,0382,0383,0304,0304",
            }
        ]
    },
    {
        "_id": ObjectId("653527df62d4a2a9cab87133"),
        "number": "0383",
        "spreadsheets": [
            {
                "_id": ObjectId("65353be48c2c31c163e62abc"),
                "name": "[SW] 0381,0382,0383,0304,0304",
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