import os.path
import pandas as pd
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/documents.readonly']
DOCUMENT_ID = 'YOUR_DOC_ID_HERE'

def get_docs_service():
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            # open_browser=False prevents the error in WSL/Headless environments
            creds = flow.run_local_server(port=0, open_browser=False)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return build('docs', 'v1', credentials=creds)

def extract_table_to_csv(doc_id):
    if doc_id == '1BXdcgemh1mJopDMrq8HvJQZF-jffaMGDJGNZriW9ngk':
        print("---------------------------------------------------------")
        print("❌ ERROR: You need to set the DOCUMENT_ID in the script.")
        print("1. Open your Google Doc in a browser.")
        print("2. Copy the ID from the URL (it looks like: .../d/LONG_ID_HERE/edit).")
        print("3. Paste it into scripts/read_data_doc.py")
        print("---------------------------------------------------------")
        return

    service = get_docs_service()
    try:
        doc = service.documents().get(documentId=doc_id).execute()
    except Exception as e:
        print(f"❌ Error fetching document: {e}")
        return
    
    table_data = []
    # Dig through the doc content for table elements
    for content in doc.get('body').get('content'):
        if 'table' in content:
            table = content.get('table')
            for row in table.get('tableRows'):
                cells = []
                for cell in row.get('tableCells'):
                    # Concatenate all text segments in a cell
                    text = "".join([
                        seg.get('textRun').get('content') 
                        for element in cell.get('content') 
                        if 'paragraph' in element 
                        for seg in element.get('paragraph').get('elements') 
                        if 'textRun' in seg
                    ])
                    cells.append(text.strip())
                table_data.append(cells)
    
    # Convert to DataFrame and Export
    df = pd.DataFrame(table_data)
    df.to_csv('extracted_data.csv', index=False, header=False)
    print("Success! Data saved to extracted_data.csv")

extract_table_to_csv(DOCUMENT_ID)