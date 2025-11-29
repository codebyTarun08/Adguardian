# training/clean_dataset.py

import pandas as pd
import argparse
import re
import os

def clean_text(text: str) -> str:
    """Basic text cleaning: lowercase, remove URLs, symbols, extra spaces."""
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+", " ", text)          # remove URLs
    text = re.sub(r"[^a-z0-9\s]", " ", text)             # keep alphanumerics
    text = re.sub(r"\s+", " ", text).strip()             # remove extra spaces
    return text


def clean_url(url: str) -> str:
    """Normalize URL or return empty."""
    url = str(url).strip()
    if url in ["nan", "None", "0", "-", "", "null"]:
        return ""
    return url


def clean_dataset(input_csv, output_csv):
    print(f"\nLoading dataset: {input_csv}")
    df = pd.read_csv(input_csv)

    # Required columns check
    required_cols = ["ad_text", "url", "platform", "label"]
    for col in required_cols:
        if col not in df.columns:
            raise Exception(f"❌ Missing required column: {col}")

    # Drop empty ad_text
    df = df.dropna(subset=["ad_text"])
    df = df[df["ad_text"].str.strip() != ""]

    # Clean text
    df["clean_text"] = df["ad_text"].apply(clean_text)

    # Clean URL
    df["url"] = df["url"].apply(clean_url)

    # Fix labels: convert to int (0 = real, 1 = fraud)
    df["label"] = (
        df["label"]
        .astype(str)
        .str.replace(".0", "", regex=False)
        .astype(int)
    )

    # Remove invalid label values
    df = df[df["label"].isin([0, 1])]

    # Remove duplicates (based on cleaned text+URL)
    df = df.drop_duplicates(subset=["clean_text", "url"])

    # Final cleaning
    df = df.reset_index(drop=True)

    # Save cleaned dataset
    os.makedirs(os.path.dirname(output_csv) or ".", exist_ok=True)
    df.to_csv(output_csv, index=False)

    print(f"\n✨ Cleaning completed!")
    print(f"➡ Input rows: {len(df)}")
    print(f"➡ Clean dataset saved to: {output_csv}\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="../data/raw/mega_dataset_1000_rows.csv")
    parser.add_argument("--output", default="../data/processed/clean_master_dataset.csv")
    args = parser.parse_args()

    clean_dataset(args.input, args.output)
