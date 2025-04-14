import pandas as pd
import numpy as np
from db_config import ratings_col, products_col
from sklearn.metrics.pairwise import cosine_similarity

def get_recommendations(user_id, top_n=5):
    # Load ratings from MongoDB
    ratings = list(ratings_col.find({}, {'_id': 0}))
    df = pd.DataFrame(ratings)

    # Pivot the table to create a user-item matrix
    user_item_matrix = df.pivot_table(index='user_id', columns='product_id', values='rating', fill_value=0)

    # Check if the user exists
    if user_id not in user_item_matrix.index:
        return {"error": "User not found"}

    # Cosine similarity between users
    similarity_matrix = cosine_similarity(user_item_matrix)
    similarity_df = pd.DataFrame(similarity_matrix, index=user_item_matrix.index, columns=user_item_matrix.index)

    # Get similar users
    similar_users = similarity_df[user_id].sort_values(ascending=False)[1:top_n+1].index

    # Recommend products from similar users
    recommended_products = set()
    
    for sim_user in similar_users:
        user_ratings = user_item_matrix.loc[sim_user]
        top_products = user_ratings[user_ratings > 0].sort_values(ascending=False).index
        recommended_products.update(top_products)

    # Get product details from MongoDB
    products = []
    for product_id in recommended_products:
        product = products_col.find_one({'Uid': product_id}, {'_id': 0})
        if product:
            products.append(product)

    return products

