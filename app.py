import pandas as pd

# Load your dataset
df = pd.read_csv("cleaned_data (minimized).csv")

# Define conversion rate
php_to_inr = 1.5

# Convert 'Price Range' from PHP to INR
df['Price Range (INR)'] = df['Price Range'] * php_to_inr

# Optional: Round the value
df['Price Range (INR)'] = df['Price Range (INR)'].round(2)

# Save new CSV
df.to_csv("cleaned_data_inr.csv", index=False)

print("✅ Price converted and saved as 'cleaned_data_inr.csv'")
