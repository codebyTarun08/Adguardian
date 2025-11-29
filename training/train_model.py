# training/train_model.py
import os
import argparse
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import xgboost as xgb


def load_feature_dataset(path):
    df = pd.read_csv(path)

    # Clean label
    df = df.dropna(subset=["label"])
    df["label"] = df["label"].astype(int)

    # embedding columns
    emb_cols = [c for c in df.columns if c.startswith("emb_")]

    # REMOVE ID + TEXT META COLUMNS
    drop_cols = ["id", "ad_text", "clean_text", "url", "platform", "notes", "domain", "subdomain", "suffix"]

    feature_cols = [c for c in df.columns if c not in drop_cols + ["label"]]

    print("Final features:", feature_cols[:20])
    print("Total features:", len(feature_cols))

    X = df[feature_cols].values
    y = df["label"].values

    return X, y, df, feature_cols


def train_and_save(dataset_csv, model_out, feature_cols_out):
    X, y, df, feature_cols = load_feature_dataset(dataset_csv)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    model = xgb.XGBClassifier(
        n_estimators=300,
        max_depth=8,
        learning_rate=0.05,
        subsample=0.9,
        colsample_bytree=0.9,
        eval_metric="logloss"
    )

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

    os.makedirs(os.path.dirname(model_out), exist_ok=True)
    joblib.dump(model, model_out)
    joblib.dump(feature_cols, feature_cols_out)

    print("Saved model:", model_out)
    print("Saved features:", feature_cols_out)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dataset", default="../data/processed/feature_dataset.csv")
    parser.add_argument("--out_model", default="../app_backend/models/xgb_fraud_model.pkl")
    parser.add_argument("--out_features", default="../app_backend/models/feature_cols.pkl")

    args = parser.parse_args()
    train_and_save(args.dataset, args.out_model, args.out_features)
