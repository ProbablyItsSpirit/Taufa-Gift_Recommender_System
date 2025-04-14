from flask import Flask, jsonify, request
from db_config import products_col, ratings_col
from collaborative_filtering import get_recommendations

app = Flask(__name__)

# Route to get all products (for testing)
@app.route('/products', methods=['GET'])
def get_products():
    products = list(products_col.find({}, {'_id': 0}))
    return jsonify(products)

# Route for recommendations
@app.route('/recommend/<user_id>', methods=['GET'])
def recommend(user_id):
    recommendations = get_recommendations(user_id)
    return jsonify(recommendations)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Taufa Gift Recommender API!"})

if __name__ == '__main__':
    app.run(debug=True)
