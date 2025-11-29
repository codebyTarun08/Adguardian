# app_backend/utils/text_utils.py
from sentence_transformers import SentenceTransformer
import numpy as np
import re
import os

EMBEDDING_MODEL = os.environ.get("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")

_model = None
def _get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer(EMBEDDING_MODEL)
    return _model

def clean_text(text: str) -> str:
    text = str(text)
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", " ", text)
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def get_text_embedding(text: str):
    model = _get_model()
    return model.encode(text)

def get_text_embedding_batch(texts, batch_size=32):
    model = _get_model()
    embeddings = model.encode(texts, batch_size=batch_size, show_progress_bar=True)
    # returns numpy array
    return np.array(embeddings)
