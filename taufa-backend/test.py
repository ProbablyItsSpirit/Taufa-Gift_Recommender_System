import pandas as pd
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API key
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# 🔗 Replace with your raw GitHub CSV URL
df = pd.read_csv('https://raw.githubusercontent.com/ProbablyItsSpirit/Taufa-Gift_Recommender_System/refs/heads/main/cleaned_data%20(minimized).csv')

# Optional filter: remove NaNs and limit number of items
df = df[['Product Name', 'Main Category', 'Sub Category 1', 'Current Rating', 'URL', 'Description']].dropna().head(10)

# Ask user
user_input = input("🛍️ Please enter what kind of product you want: ")

# Create preview string
product_lines = "\n".join([
    f"{i+1}. {row['Product Name']} | {row['Main Category']} > {row['Sub Category 1']} | ⭐ {row['Current Rating']} | {row['URL']} \n   {row['Description']}"
    for i, row in df.iterrows()
])

# Prompt
prompt = f"""
You are a smart gift recommender bot.

The user said:
"{user_input}"

Here are some available products:
{product_lines}

Please pick the best match and explain why, with the product's link.
"""

# Generate recommendation
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content(prompt)
print("\n🎁 Recommendation:\n", response.text)
