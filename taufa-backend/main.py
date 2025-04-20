
import os
import pandas as pd
from dotenv import load_dotenv
from utils.filter_utils import filter_products, parse_query
from utils.similarity_utils import build_or_load_faiss_index
from utils.gemini_utils import generate_gemini_recommendation
def load_data():
    url = "https://raw.githubusercontent.com/ProbablyItsSpirit/Taufa-Gift_Recommender_System/refs/heads/main/cleaned_data%20(minimized).csv"
    df = pd.read_csv(url)

    # Normalize column names
    df.columns = [col.strip().title().replace(" ", "") for col in df.columns]
    df = df.rename(columns={"Price(PHP)": "Price"})  # Update based on actual name
    return df

def get_user_input():
    """Prompt the user to input their product need."""
    user_query = input("Please enter your product need (e.g., 'Recommend me a gift for a baby'): ")
    return user_query

def main():
    # Step 1: Load the product data
    df = load_data()

    # Step 2: Get the user's query
    user_query = get_user_input()

    # Step 3: Filter products based on the user's query (price, category, etc.)
    parsed_query, max_price = parse_query(user_query)
    filtered_products = filter_products(df, user_query=parsed_query, max_price=max_price)

    if filtered_products.empty:
        print("Sorry, no products matched your query.")
        return
    # Step 4: Load or build FAISS index (AFTER filtering)
    # Step 4: Load or build FAISS index (AFTER filtering)
    # index, _ = build_or_load_faiss_index(filtered_products)

    # Step 5: Perform similarity search
    top_matches = search_similar_products(filtered_products, user_query, index)

    if top_matches.empty:
        print("Sorry, no similar products found.")
        return
    # Step 6: Get product recommendations from Gemini
    recommendation = generate_gemini_recommendation(top_matches, user_query)
    print(f"Recommendation: {recommendation}")

if __name__ == "__main__":
    main()
