import os
from typing import Any

from bson import ObjectId
from googleapiclient.discovery import build
import httplib2

LINK_PREFIX = "https://docs.google.com/spreadsheets/d/"
TELEGRAM_ID_COLUMN = "telegramId"


def preparation(spreadsheet: Any):
    service = create_service()

    sheets = spreadsheet['sheets']
    spreadsheet_id = extract_spreadsheet_id(spreadsheet['link'])
    google_sheets = get_google_sheets(spreadsheet_id, service)
    return service, sheets, spreadsheet_id, google_sheets


def fill_spreadsheet_info(spreadsheet: Any) -> None:
    service, sheets, spreadsheet_id, google_sheets = preparation(spreadsheet)
    fill_columns(sheets, google_sheets, spreadsheet_id, service)


def fill_added_sheets(spreadsheet: Any) -> None:
    service, sheets, spreadsheet_id, google_sheets = preparation(spreadsheet)
    fill_columns(sheets, google_sheets, spreadsheet_id, service)


def fill_one_added_sheet(spreadsheet: Any) -> None:
    service, sheets, spreadsheet_id, google_sheets = preparation(spreadsheet)
    fill_one_sheet(sheets, google_sheets, spreadsheet_id, service)


def create_service() -> Any:
    # key = os.environ['SHEETS_API_KEY']
    # url = os.environ['SHEETS_API_URL']
    key = "AIzaSyAXTuuKFdoc4cJ3K_ZMBeiS-XVEvAmf7AI"
    url = "https://sheets.googleapis.com/$discovery/rest?version=v4"

    return build(
        'sheets',
        'v4',
        http=httplib2.Http(),
        discoveryServiceUrl=url,
        developerKey=key
    )


def get_google_sheets(spreadsheet_id: str, service: Any) -> list[Any]:
    return service.spreadsheets().get(
        spreadsheetId=spreadsheet_id
    ).execute().get('sheets')


def fill_columns(sheets: list[Any], google_sheets: list[Any], spreadsheet_id: str, service: Any) -> None:
    for sheet, google_sheet in zip(sheets, google_sheets):
        if len(sheet['columns']) > 0:
            continue
        sheet_name = google_sheet['properties']['title']

        header_row = service.spreadsheets().values().get(
            spreadsheetId=spreadsheet_id,
            range=create_header_range(sheet_name, sheet)
        ).execute().get('values', [])[0]

        for index, column_name in enumerate(header_row):
            column = {
                '_id': ObjectId(),
                'name': column_name,
                'index': index,
                'isTelegramId': column_name == TELEGRAM_ID_COLUMN,
                'isAccesible': False
            }
            sheet['columns'].append(column)


def fill_one_sheet(sheets: list[Any], google_sheets: list[Any], spreadsheet_id: str, service: Any) -> None:
    ind = len(sheets) - 1
    sheet = sheets[ind]
    google_sheet = google_sheets[ind]
    sheet_name = google_sheet['properties']['title']

    header_row = service.spreadsheets().values().get(
        spreadsheetId=spreadsheet_id,
        range=create_header_range(sheet_name, sheet)
    ).execute().get('values', [])[0]

    for index, column_name in enumerate(header_row):
        column = {
            '_id': ObjectId(),
            'name': column_name,
            'index': index,
            'isTelegramId': column_name == TELEGRAM_ID_COLUMN,
            'isAccesible': False
        }
        sheet['columns'].append(column)


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
