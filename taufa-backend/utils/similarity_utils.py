import pandas as pd
import faiss
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

# Load once globally for speed
model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_text(texts: list[str]) -> np.ndarray:import os
import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_text(texts: list[str]) -> np.ndarray:
    return model.encode(texts, convert_to_numpy=True)

def build_or_load_faiss_index(df: pd.DataFrame, index_path="faiss_index.idx", embeddings_path="embeddings.npy") -> tuple:
    if os.path.exists(index_path) and os.path.exists(embeddings_path):
        print("Loading FAISS index from disk...")
        index = faiss.read_index(index_path)
        embeddings = np.load(embeddings_path)
    else:
        print("Building new FAISS index...")
        descriptions = df['Description'].fillna("").tolist()
        embeddings = embed_text(descriptions)
        index = faiss.IndexFlatL2(embeddings.shape[1])
        index.add(embeddings)
        faiss.write_index(index, index_path)
        np.save(embeddings_path, embeddings)
    return index, embeddings

def search_similar_products(df: pd.DataFrame, user_query: str, index, top_k=10) -> pd.DataFrame:
    query_embedding = embed_text([user_query])
    distances, indices = index.search(query_embedding, top_k)
    matched = df.iloc[indices[0]].copy()
    matched['Similarity Score'] = distances[0]
    return matched.reset_index(drop=True)

    return model.encode(texts, convert_to_numpy=True)

def build_faiss_index(df: pd.DataFrame) -> tuple:
    descriptions = df['Description'].fillna("").tolist()
    embeddings = embed_text(descriptions)
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index, embeddings

def search_similar_products(df: pd.DataFrame, user_query: str, index, top_k=10) -> pd.DataFrame:
    query_embedding = embed_text([user_query])
    distances, indices = index.search(query_embedding, top_k)
    matched = df.iloc[indices[0]].copy()
    matched['Similarity Score'] = distances[0]
    return matched.reset_index(drop=True)
