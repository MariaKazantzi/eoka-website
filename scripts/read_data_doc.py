import os.path
import pandas as pd
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
SHEET_ID = '1BXdcgemh1mJopDMrq8HvJQZF-jffaMGDJGNZriW9ngk'
RANGE_NAME = 'Sheet1'  # Change to your sheet name or range

def get_sheets_service():
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0, open_browser=False)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return build('sheets', 'v4', credentials=creds)

def export_sheet_to_csv(sheet_id, range_name):
    service = get_sheets_service()
    result = service.spreadsheets().values().get(
        spreadsheetId=sheet_id, range=range_name).execute()
    values = result.get('values', [])
    df = pd.DataFrame(values)
    output_path = os.path.join('scripts', 'eoka_data.csv')
    df.to_csv(output_path, index=False, header=False)
    print(f"Success! Data saved to {output_path}")

export_sheet_to_csv(SHEET_ID, RANGE_NAME)