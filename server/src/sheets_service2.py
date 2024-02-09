import googleapiclient.errors
import pygsheets
from bson import ObjectId

from models import Spreadsheet, Sheet

CREDS_FILE = '../creds.json'
TELEGRAM_ID_COLUMN = "telegramId"

googlesheet_client: pygsheets.client.Client = pygsheets.authorize(service_file=CREDS_FILE)


def fill_columns(spreadsheet: Spreadsheet):
    try:
        wks: pygsheets.Spreadsheet = googlesheet_client.open_by_url(spreadsheet["link"])
    except googleapiclient.errors.HttpError:
        print("Error while getting access to spreadsheet")
        return False
    else:
        for i in range(0, len(spreadsheet['sheets'])):
            sheet: Sheet = spreadsheet["sheets"][i]
            if len(sheet["columns"]) == 0:
                google_sheet: pygsheets.Spreadsheet = wks.worksheet(property='index', value=i)
                header_cells: list = google_sheet.find(pattern='', cols=(sheet["startColumn"], sheet["endColumn"]),
                                                       rows=(sheet["headerRow"], sheet["headerRow"]))
                for j in range(0, len(header_cells)):
                    column_name = header_cells[j].value
                    index = j + 1
                    column = {
                        '_id': ObjectId(),
                        'name': column_name,
                        'index': index,
                        'isTelegramId': column_name == TELEGRAM_ID_COLUMN,
                        'isAccesible': False
                    }
                    sheet["columns"].append(column)
        return True


def get_data_from_spreadsheet(spreadsheet: Spreadsheet, name: str):
    try:
        wks: pygsheets.Spreadsheet = googlesheet_client.open_by_url(spreadsheet["link"])
    except googleapiclient.errors.HttpError:
        print("Error while getting access to spreadsheet")
        return False
    else:
        body = []
        for i in range(0, len(spreadsheet['sheets'])):
            sheet: Sheet = spreadsheet["sheets"][i]
            google_sheet = wks.worksheet(property='index', value=i)
            tmp = []
            header_cells: list = google_sheet.find(pattern=name, cols=(sheet["startColumn"], sheet["endColumn"]),
                                                   rows=(sheet["startRow"], sheet["endRow"]))
            if len(header_cells) > 0:
                full_row = google_sheet.get_row(header_cells[0].row)
                for j in range(0, len(sheet['columns'])):
                    column = sheet['columns'][j]
                    if column['isAccesible']:
                        tmp.append(f"{column['name']}: {full_row[j]}")
                body.append({google_sheet.title: tmp})
        # print(body, flush=True)
        return body
