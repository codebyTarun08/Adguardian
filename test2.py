# save as debug_vector.py and run: python debug_vector.py
import os, sys, joblib, numpy as np
BASE_DIR = os.path.join(os.getcwd(), "app_backend")
sys.path.append(os.path.join(BASE_DIR, "utils"))

from url_features import extract_url_features_safe
from text_utils import clean_text, get_text_embedding

feature_cols = joblib.load(os.path.join(BASE_DIR, "models", "feature_cols.pkl"))
print("feature_cols sample:", feature_cols[:40])

text = "iPhone 15 Pro Max only ₹4999!"
url = "https://big-sale-offer.shop"

cleaned = clean_text(text)
emb = get_text_embedding(cleaned)        # numpy array
url_feats = extract_url_features_safe(url)
print("url_feats:", url_feats)

# build vector exactly like API
fv = {}
fv.update(url_feats)
for i, val in enumerate(emb):
    fv[f"emb_{i}"] = float(val)

row = [fv.get(c, 0.0) for c in feature_cols]
print("Row length:", len(row))
print("Row (first 40):", row[:40])
print("Sum of row:", sum(abs(x) for x in row))
