import pandas as pd
import re

def load_dataset(csv_url: str) -> pd.DataFrame:
    try:
        df = pd.read_csv(csv_url)
        print(f"Loaded dataset with {len(df)} rows and {len(df.columns)} columns.")
        return df
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return pd.DataFrame()

def parse_query(user_query: str):
    # Extract price if mentioned
    price_match = re.search(r'under\s?(\d+)', user_query.lower())
    max_price = float(price_match.group(1)) if price_match else None

    # Remove price part from the query
    cleaned_query = re.sub(r'under\s?\d+\s?(php|rs|inr)?', '', user_query, flags=re.IGNORECASE).strip()

    return cleaned_query, max_price
def filter_products(df: pd.DataFrame, user_query: str = "", min_price: float = None, max_price: float = None) -> pd.DataFrame:
    df_filtered = df.copy()

    # Price filtering
    price_column = next((col for col in df.columns if 'price' in col.lower()), None)

    if not price_column:
        raise ValueError("No price column found in dataset.")

    df_filtered[price_column] = pd.to_numeric(df_filtered[price_column], errors='coerce')
    df_filtered = df_filtered.dropna(subset=[price_column])
    
    if min_price is not None:
        df_filtered = df_filtered[df_filtered[price_column] >= min_price]
    if max_price is not None:
        df_filtered = df_filtered[df_filtered[price_column] <= max_price]

    # Category filter
    if 'Main Category' in df_filtered.columns:
        df_filtered = df_filtered[df_filtered['Main Category'] != 'Baby & Kids']

    # Keyword filter
    if user_query:
        # Debugging step to print matched descriptions
        print(f"Matching descriptions for query '{user_query}':")
        for desc in df_filtered['Description']:
            if re.search(user_query, str(desc), re.IGNORECASE):
                print(desc)

        # Apply actual filtering
        df_filtered = df_filtered[df_filtered['Description'].str.contains(user_query, case=False, na=False)]

    return df_filtered.reset_index(drop=True)
