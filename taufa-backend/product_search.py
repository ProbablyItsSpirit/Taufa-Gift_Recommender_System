from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def similarity_search(products, user_query):
    # Combine the query with product descriptions
    all_descriptions = [user_query] + products
    
    # Convert to TF-IDF vector
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(all_descriptions)
    
    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
    
    # Get indices of the most similar products
    similarity_scores = list(enumerate(cosine_sim[0]))
    sorted_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    
    # Get top 3 most similar products
    top_matches = sorted_scores[:3]
    
    return top_matches

def filter_products(user_query):
    # Assuming you have a method to filter your products based on the query
    # This function will return product descriptions that match the query criteria
    # For now, return a static list for the example
    return [
        "PS4 Controller Dualshock 4 Controller Console Gaming Controller",
        "Dual Shock 2 USB PC Gaming Controller",
        "AK66 Mobile Phone Gaming Controller Joystick"
    ]

def main():
    # Get user input (e.g., product need)
    user_query = input("Please enter your product need: ")

    # Filter products (this part is specific to your filtering logic)
    filtered_products = filter_products(user_query)

    # Call similarity search function
    top_matches = similarity_search(filtered_products, user_query)
    
    # Display the top matches
    print(f"Matching descriptions for query '{user_query}':")
    for idx, score in top_matches:
        print(filtered_products[idx])

# Running the main function
if __name__ == "__main__":
    main()
