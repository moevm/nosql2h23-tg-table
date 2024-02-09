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
