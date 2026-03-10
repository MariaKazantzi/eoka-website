import pandas as pd
import os


# Paths
csv_path = os.path.join('scripts', 'eoka_data.csv')
template_profile_path = os.path.join('public', 'html', 'names', 'templateProfile.html')
template_list_path = os.path.join('public', 'html', 'names', 'templateNamesList.html')
output_dir = os.path.join('public', 'html', 'names', 'generated')
output_list_path = os.path.join(output_dir, 'namesList.html')

# Delete existing generated files
if os.path.exists(output_dir):
    for filename in os.listdir(output_dir):
        file_path = os.path.join(output_dir, filename)
        if os.path.isfile(file_path):
            os.remove(file_path)

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Read CSV
df = pd.read_csv(csv_path, header=1)

# Read profile template
with open(template_profile_path, 'r', encoding='utf-8') as f:
    template_profile = f.read()

# Generate profile HTML files
profile_filenames = []
for idx, row in df.iterrows():
    html_content = template_profile
    for col in df.columns:
        html_content = html_content.replace(f'{{{{{col}}}}}', str(row[col]))
    # Use FULL NAME for filename, fallback to index if missing
    filename = f"{row['FULL NAME'].strip().replace(' ', '_').replace('/', '_')}.html" if pd.notna(row['FULL NAME']) else f"row_{idx}.html"
    profile_filenames.append((filename, row['FULL NAME']))
    output_path = os.path.join(output_dir, filename)
    with open(output_path, 'w', encoding='utf-8') as out:
        out.write(html_content)
print(f"Generated {len(df)} HTML files in {output_dir}")

# Generate namesList.html
with open(template_list_path, 'r', encoding='utf-8') as f:
    template_list = f.read()

names_list_html = ""
for filename, full_name in profile_filenames:
    # Escape HTML special chars in name
    safe_name = str(full_name).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    names_list_html += f'<li><a href="{filename}" target="_parent">{safe_name}</a></li>\n'

final_list_html = template_list.replace('{{NAMES_LIST}}', names_list_html)
with open(output_list_path, 'w', encoding='utf-8') as out:
    out.write(final_list_html)
print(f"Generated namesList.html with {len(profile_filenames)} names.")
