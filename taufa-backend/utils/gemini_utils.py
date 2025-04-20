import google.generativeai as genai
import os
import pandas as pd


# Configure the API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_gemini_recommendation(products_df: pd.DataFrame, user_query: str) -> str:
    # Get product names and URLs
    product_list = "\n".join([f"{idx + 1}. {row['Product Name']} | {row['URL']} | {row['Description']}" for idx, row in products_df.iterrows()])
    
    # Prepare the prompt for Gemini
    prompt = f"""
    You are a helpful gift assistant.

    User said:
    "{user_query}"

    Here are some products that match your needs:
    {product_list}

    Please recommend the best products and explain why.
    """

    try:
        # Call Gemini API
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating content with Gemini: {e}")
        return "Sorry, I couldn't generate a recommendation at the moment."
