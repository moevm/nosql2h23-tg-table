from typing import Any
from bson import ObjectId
from google.oauth2.gdch_credentials import ServiceAccountCredentials
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import httplib2

from models import Spreadsheet

LINK_PREFIX = "https://docs.google.com/spreadsheets/d/"
TELEGRAM_ID_COLUMN = "telegramId"

CREDS_FILE = '../creds.json'


def fill_columns(spreadsheet: Spreadsheet):
    service = create_service()
    spreadsheet_id = extract_spreadsheet_id(spreadsheet['link'])
    google_sheets = get_google_sheets(spreadsheet_id, service)
    sheets = spreadsheet['sheets']
    for sheet, google_sheet in zip(sheets, google_sheets):
        if len(sheet['columns']) > 0:
            continue
        sheet_name = google_sheet['properties']['title']

        header_row = service.spreadsheets().values().get(
            spreadsheetId=spreadsheet_id,
            range=create_header_range(sheet_name, sheet)
        ).execute().get('values', [])[0]
        print("test",flush=True)
        for index, column_name in enumerate(header_row):
            column = {
                '_id': ObjectId(),
                'name': column_name,
                'index': index,
                'isTelegramId': column_name == TELEGRAM_ID_COLUMN,
                'isAccesible': False
            }
            sheet['columns'].append(column)
    return True


def create_service() -> Any:
    scopes = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive'
    ]

    credentials = Credentials.from_service_account_file(
        '../creds.json',
        scopes=scopes
    )
    url = "https://sheets.googleapis.com/$discovery/rest?version=v4"
    return build(
        'sheets',
        'v4',
        credentials=credentials,
        discoveryServiceUrl=url,
    )


def get_google_sheets(spreadsheet_id: str, service: Any) -> list[Any]:
    return service.spreadsheets().get(
        spreadsheetId=spreadsheet_id
    ).execute().get('sheets')


def extract_spreadsheet_id(link: str) -> str:
    if not link.startswith(LINK_PREFIX):
        raise Exception("Invalid spreadsheet link format")
    link = link[len(LINK_PREFIX):]
    return link.split("/")[0]


def create_header_range(sheet_name: str, sheet: Any):
    row = sheet['headerRow']
    start = f"R{row}C{sheet['startColumn']}"
    end = f"R{row}C{sheet['endColumn']}"
    return f"'{sheet_name}'!{start}:{end}"
