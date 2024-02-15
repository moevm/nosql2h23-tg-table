import os

import telebot
from telebot import types
import requests
import json

bot = telebot.TeleBot(os.environ["TELEGRAM_BOT_TOKEN"])
greet = 'Добро пожаловать в официального бота для курсов МОЭВМ!'
auth = 'Вы успешно авторизировались.'
not_auth = 'К сожалению Вас нет в списке пользователей. Если это ошибка, то напишите администратору.'
selection = 'Вам доступны следующие таблицы'
wait = 'Подождите..'
if_auth = False



@bot.message_handler(commands=['start'])
def start_f(message):
    student_username = message.from_user.username
    result = requests.get(f'http://server:8000/students/bot/{student_username}')
    body = json.loads(result.text)
    if (body['status'] == 200):
        global if_auth
        if_auth = True
        student_name = body['student']['name']
        student_group = body['student']['groupNumber']
        bot.send_message(message.chat.id, f'<b>{greet}</b> \n{auth}\nФИО: {student_name}\nГруппа: {student_group}',
                         parse_mode='html')
        selection_buttons(message)
    else:
        bot.send_message(message.chat.id, f'<b>{greet}</b> \n{not_auth}', parse_mode='html')

@bot.message_handler(commands=['tables'])
def selection_buttons(message):
    username = message.from_user.username
    result = requests.get(f'http://server:8000/spreadsheets/bot/{username}')
    body = json.loads(result.text)
    tables = list(map(lambda x: x['name'], body))
    if (if_auth and len(tables)!=0):
        button = types.InlineKeyboardMarkup()
        for i in tables:
            button.add(types.InlineKeyboardButton(i, callback_data=i))
        bot.send_message(message.chat.id, selection, reply_markup=button)
    else:
        bot.send_message(message.chat.id, 'Нет доступных таблиц')
    #bot.register_next_step_handler(message, info)


@bot.callback_query_handler(func=lambda callback: True)
def get_info(callback):
    bot.reply_to(callback.message, wait)
    result = requests.get(f'http://server:8000/requests/bot/{callback.from_user.username}/{callback.data}')
    body = json.loads(result.text)
    info(callback, body)

def info(callback, body):
    sep = "\n"
    sep2 = '-'*39
    body_true = []
    for elem in body:
        if len(list(elem.values())[0])!=0:
            body_true.append(elem)
    body_true = list(map(lambda x: f'{sep2}{sep}{list(x.keys())[0]}: {sep}{sep.join(x[list(x.keys())[0]])}', body_true))
    if len(body_true) != 0:
        bot.send_message(callback.message.chat.id, f'Результат:\n{sep.join(body_true,)}')
    else:
        bot.send_message(callback.message.chat.id, 'Нет записей в таблице.')

bot.polling(none_stop=True)