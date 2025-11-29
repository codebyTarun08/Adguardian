# run in Python where your venv is active (project root)
import joblib, os, numpy as np
BASE = os.path.join(os.getcwd(), "app_backend")
feat_path = os.path.join(BASE, "models", "feature_cols.pkl")
print("feature_cols path:", feat_path)
cols = joblib.load(feat_path)
print("Number of feature cols:", len(cols))
print("First 40 feature cols:", cols[:40])
print("Contains embeddings:", any(c.startswith("emb_") for c in cols))
