# To use this script, you need to have pandas installed. You can install it using pip:
# pip install pandas
# This script reads a CSV file and converts it to a JSON file with a specific structure.
# place the CSV file in the root project directory, go to terminal and run the script using the command: python convert_csv_json.py
# The JSON file will be saved in the public directory.





import pandas as pd
import json

# Path to the CSV file
csv_path = 'data_to_convert.csv'

# Path to save the JSON file
json_path = 'public/events.json'




# Load the CSV file
df = pd.read_csv(csv_path)

# Replace NaN values with empty strings
df = df.fillna('')

# Rename columns to match the old JSON structure
df.columns = [col.lower().replace(' ', '_') for col in df.columns]

# Convert DataFrame to JSON
events_data = df.to_dict(orient='records')

# Define the structure for events.json
events_json = {
    "2024_weekend_events": [
        {
            "event_name": "Fall Camping Weekend",
            "activities": events_data
        }
    ]
}

# Save the JSON to a file
with open(json_path, 'w') as json_file:
    json.dump(events_json, json_file, indent=4)

print(f'JSON file saved to: {json_path}')
