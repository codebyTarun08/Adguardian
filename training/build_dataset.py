import os
import re
import argparse
import pandas as pd
from tqdm import tqdm
import sys

# Fix path for backend utils
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_PATH = os.path.abspath(os.path.join(CURRENT_DIR, "..", "app_backend"))
UTILS_PATH = os.path.join(BACKEND_PATH, "utils")

sys.path.append(BACKEND_PATH)
sys.path.append(UTILS_PATH)

from url_features import extract_url_features_safe
from text_utils import get_text_embedding_batch

def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+", " ", text)
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def build_dataset(input_csv, output_csv, batch_size=32):
    df = pd.read_csv(input_csv)
    # ensure columns
    assert "ad_text" in df.columns
    assert "label" in df.columns
    df = df.dropna(subset=["ad_text"]).reset_index(drop=True)
    # clean text
    df["clean_text"] = df["ad_text"].apply(clean_text)

    # URL features
    features_list = []
    print("Extracting URL features (this may take time and network access)...")
    for url in tqdm(df.get("url", [""] * len(df)).tolist()):
        try:
            feats = extract_url_features_safe(url)
        except Exception as e:
            feats = {}
        features_list.append(feats)
    feat_df = pd.DataFrame(features_list).fillna(0)

    # Embeddings (batch)
    print("Computing text embeddings (requires sentence-transformers)...")
    embeddings = get_text_embedding_batch(df["clean_text"].tolist(), batch_size=batch_size)
    emb_df = pd.DataFrame(embeddings)
    emb_df.columns = [f"emb_{i}" for i in emb_df.columns]

    # concat everything
    final = pd.concat([df.reset_index(drop=True), feat_df.reset_index(drop=True), emb_df.reset_index(drop=True)], axis=1)
    os.makedirs(os.path.dirname(output_csv) or ".", exist_ok=True)
    final.to_csv(output_csv, index=False)
    print(f"Saved dataset to {output_csv}. shape = {final.shape}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="../data/processed/clean_master_dataset.csv")
    parser.add_argument("--output", default="../data/processed/feature_dataset.csv")
    parser.add_argument("--batch_size", type=int, default=32)
    args = parser.parse_args()
    build_dataset(args.input, args.output, args.batch_size)
