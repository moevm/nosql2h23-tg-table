db = db.getSiblingDB('admin')
db.auth('root','root')
db = db.getSiblingDB('TelegramBotNoSQL')

db.createUser({
    'user': 'user',
    'pwd': 'user',
    'roles':[{
        'role': 'dbOwner',
        'db': 'TelegramBotNoSQL'
    }]
})

db.createCollection('Students')
db.TelegramBotNoSQL.insertOne({
    'telegramId': 'dizadan',
    "name": "Chegodaev Kondratiy Sergeevich",
    "groupNumber": "0382"
})