# # app_backend/api.py
# import os, joblib, uvicorn
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from typing import Optional
# from utils.url_features import extract_url_features_safe
# from utils.text_utils import clean_text, get_text_embedding
# import numpy as np
# import pandas as pd

# import os

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(BASE_DIR, "models", "xgb_fraud_model.pkl")
# FEATURE_PATH = os.path.join(BASE_DIR, "models", "feature_cols.pkl")


# app = FastAPI(title="Fraud Ad Detection API")

# # CORS
# from fastapi.middleware.cors import CORSMiddleware
# app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# class PredictRequest(BaseModel):
#     ad_text: str
#     url: Optional[str] = ""

# # load model
# if not os.path.exists(MODEL_PATH) or not os.path.exists(FEATURE_PATH):
#     print("Model or feature file not found. Please run training first.")
# model = joblib.load(MODEL_PATH)
# feature_cols = joblib.load(FEATURE_PATH)  # list of columns in the trained model

# @app.get("/")
# def root():
#     return {"status": "ok"}

# @app.post("/predict")
# def predict(payload: PredictRequest):
#     text = payload.ad_text or ""
#     url = payload.url or ""
#     if not text and not url:
#         raise HTTPException(status_code=400, detail="Provide ad_text or url")

#     # clean text
#     cleaned = clean_text(text)

#     # text embedding
#     emb = get_text_embedding(cleaned)
#     # url features
#     url_feats = extract_url_features_safe(url)

#     # construct feature vector dict (map to feature_cols order)
#     fv = {}
#     # copy url features
#     fv.update(url_feats)
#     # add embedding dims
#     for i, val in enumerate(emb):
#         fv[f"emb_{i}"] = float(val)

#     # ensure all feature cols exist
#     row = [fv.get(c, 0.0) for c in feature_cols]
#     X = np.array(row).reshape(1, -1)

#     # predict
#     prob = model.predict_proba(X)[0][1] if hasattr(model, "predict_proba") else None
#     pred = int(model.predict(X)[0])

#     # optional: compute SHAP explanation (skip heavy by default)
#     explanation = None
#     try:
#         import shap
#         explainer = shap.TreeExplainer(model)
#         shap_values = explainer.shap_values(X)
#         # return top 6 contributing features
#         sv = shap_values[1] if isinstance(shap_values, list) else shap_values
#         top_idx = np.argsort(-np.abs(sv)).ravel()[:6]
#         explanation = [{"feature": feature_cols[int(i)], "shap_value": float(sv[0, int(i)])} for i in top_idx]
#     except Exception:
#         explanation = None

#     return {
#         "prediction": "fraud" if pred == 1 else "real",
#         "probability": float(prob) if prob is not None else None,
#         "cleaned": cleaned,
#         "rule_feats": url_feats,
#         "explanation": explanation
#     }

# if __name__ == "__main__":
#     uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)



# app_backend/api.py

# import os
# import sys
# import joblib
# import uvicorn
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from typing import Optional
# import numpy as np

# # ------------ FIX IMPORT PATHS ------------
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# UTILS_DIR = os.path.join(BASE_DIR, "utils")

# if UTILS_DIR not in sys.path:
#     sys.path.append(UTILS_DIR)

# from url_features import extract_url_features_safe
# from text_utils import clean_text, get_text_embedding

# # ------------ MODEL PATHS ------------
# MODEL_PATH = os.path.join(BASE_DIR, "models", "xgb_fraud_model.pkl")
# FEATURE_PATH = os.path.join(BASE_DIR, "models", "feature_cols.pkl")

# # ------------ FASTAPI APP ------------
# app = FastAPI(title="Fraud Ad Detection API")

# # CORS
# from fastapi.middleware.cors import CORSMiddleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ------------ REQUEST MODEL ------------
# class PredictRequest(BaseModel):
#     ad_text: str
#     url: Optional[str] = ""

# # ------------ LOAD MODEL SAFELY ------------
# model = None
# feature_cols = None

# if os.path.exists(MODEL_PATH) and os.path.exists(FEATURE_PATH):
#     model = joblib.load(MODEL_PATH)
#     feature_cols = joblib.load(FEATURE_PATH)
#     print("Model loaded successfully")
# else:
#     print("❌ Model or feature file missing. Train model again.")


# # ------------ ROUTES ------------

# @app.get("/")
# def root():
#     return {"status": "ok"}


# @app.post("/predict")
# def predict(payload: PredictRequest):
#     if model is None:
#         raise HTTPException(status_code=500, detail="Model not loaded. Train first.")

#     text = payload.ad_text or ""
#     url = payload.url or ""

#     if not text and not url:
#         raise HTTPException(status_code=400, detail="Provide ad_text or url")

#     # Clean text
#     cleaned = clean_text(text)

#     # Embedding
#     emb = get_text_embedding(cleaned)

#     # URL features
#     url_feats = extract_url_features_safe(url)

#     # Build feature vector
#     fv = {}
#     fv.update(url_feats)
#     for i, val in enumerate(emb):
#         fv[f"emb_{i}"] = float(val)

#     row = [fv.get(c, 0.0) for c in feature_cols]
#     X = np.array(row).reshape(1, -1)

#     # Predict
#     pred = int(model.predict(X)[0])
#     prob = float(model.predict_proba(X)[0][1])

#     return {
#         "prediction": "fraud" if pred == 1 else "real",
#         "probability": prob,
#         "cleaned": cleaned,
#         "url_features": url_feats,
#     }


# # ------------ MAIN ------------
# if __name__ == "__main__":
#     uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)














import os
import sys
import joblib
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import numpy as np

# ------------ FIX IMPORT PATHS ------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UTILS_DIR = os.path.join(BASE_DIR, "utils")

if UTILS_DIR not in sys.path:
    sys.path.append(UTILS_DIR)

from url_features import (
    extract_url_features_safe,
    is_trusted_domain,
    detect_mimic_domain
)
from text_utils import clean_text, get_text_embedding

# ------------ MODEL PATHS ------------
MODEL_PATH = os.path.join(BASE_DIR, "models", "xgb_fraud_model.pkl")
FEATURE_PATH = os.path.join(BASE_DIR, "models", "feature_cols.pkl")

app = FastAPI(title="Fraud Ad Detection API")

# ---------- CORS ----------
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    ad_text: str
    url: Optional[str] = ""

# ------------ LOAD MODEL SAFELY ------------
model = None
feature_cols = None

if os.path.exists(MODEL_PATH) and os.path.exists(FEATURE_PATH):
    model = joblib.load(MODEL_PATH)
    feature_cols = joblib.load(FEATURE_PATH)
    print("Model loaded successfully")
else:
    print("❌ Model or feature file missing. Train model again.")


# ------------ ROUTES ------------

@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/predict")
def predict(payload: PredictRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Train first.")

    text = payload.ad_text or ""
    url = payload.url or ""

    if not text and not url:
        raise HTTPException(status_code=400, detail="Provide ad_text or url")

    cleaned = clean_text(text)
    emb = get_text_embedding(cleaned)
    url_feats = extract_url_features_safe(url)

    domain = url_feats.get("domain", "")

    # ---------- RULE 1: Trusted Domain → ALWAYS REAL ----------
    if domain and is_trusted_domain(domain):
        return {
            "prediction": "real",
            "probability": 0.0,
            "reason": f"Trusted domain detected: {domain}",
            "cleaned": cleaned,
            "url_features": url_feats
        }

    # ---------- RULE 2: Domain Mimic Detection (Fake Amazon/Myntra/Nykaa copies) ----------
    mimic_flag = detect_mimic_domain(domain)
    if mimic_flag:
        return {
            "prediction": "fraud",
            "probability": 1.0,
            "reason": f"Suspicious mimic domain detected: {domain}",
            "cleaned": cleaned,
            "url_features": url_feats
        }

    # ---------- ML MODEL PREDICTION ----------
    fv = {}
    fv.update(url_feats)

    for i, val in enumerate(emb):
        fv[f"emb_{i}"] = float(val)

    row = [fv.get(c, 0.0) for c in feature_cols]
    X = np.array(row).reshape(1, -1)

    pred = int(model.predict(X)[0])
    prob = float(model.predict_proba(X)[0][1])

    return {
        "prediction": "fraud" if pred == 1 else "real",
        "probability": prob,
        "reason": "ML model decision",
        "cleaned": cleaned,
        "url_features": url_feats,
    }


# ------------ MAIN ------------
if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
