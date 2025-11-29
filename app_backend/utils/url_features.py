# # app_backend/utils/url_features.py
# import socket, ssl, time
# import tldextract
# import whois
# import dns.resolver
# import requests
# from urllib.parse import urlparse
# import math

# def _safe_whois(domain):
#     try:
#         w = whois.whois(domain)
#         return w
#     except Exception:
#         return None

# def _get_cert_info(hostname, port=443, timeout=5):
#     try:
#         ctx = ssl.create_default_context()
#         with socket.create_connection((hostname, port), timeout=timeout) as sock:
#             with ctx.wrap_socket(sock, server_hostname=hostname) as ssock:
#                 cert = ssock.getpeercert()
#                 return cert
#     except Exception:
#         return None

# def _dns_lookup(hostname):
#     try:
#         answers = dns.resolver.resolve(hostname, "A")
#         ips = [r.to_text() for r in answers]
#         return ips
#     except Exception:
#         return []

# def is_trusted_domain(domain: str) -> bool:
#     trusted_path = os.path.join(os.path.dirname(__file__), "trusted_domains.txt")

#     if not os.path.exists(trusted_path):
#         return False

#     with open(trusted_path, "r") as f:
#         trusted = [d.strip().lower() for d in f.readlines()]

#     return domain.lower() in trusted

# def domain_entropy(domain):
#     if not domain:
#         return 0.0
#     import collections
#     s = domain
#     freq = collections.Counter(s)
#     probs = [v/len(s) for v in freq.values()]
#     import math
#     ent = -sum(p * math.log2(p) for p in probs)
#     return ent

# def extract_url_features_safe(url: str) -> dict:
#     """
#     Returns a dictionary of extracted features for given URL string.
#     No raise on error; returns reasonable defaults.
#     """
#     out = {}
#     try:
#         if not isinstance(url, str) or not url.strip():
#             return {
#                 "has_url": 0,
#                 "domain": "",
#                 "subdomain": "",
#                 "suffix": "",
#                 "domain_len": 0,
#                 "domain_entropy": 0.0,
#                 "num_hyphens": 0,
#                 "num_digits": 0,
#                 "path_len": 0,
#                 "query_len": 0,
#                 "domain_age_days": 0,
#                 "is_privacy_protected": 0,
#                 "num_ips": 0,
#                 "uses_https": 0,
#                 "ssl_days_valid": 0
#             }

#         parsed = urlparse(url if "://" in url else "http://" + url)
#         hostname = parsed.hostname or ""
#         path = parsed.path or ""
#         query = parsed.query or ""

#         ext = tldextract.extract(hostname)
#         domain = ".".join(part for part in [ext.domain, ext.suffix] if part)
#         subdomain = ext.subdomain or ""

#         out["has_url"] = 1
#         out["domain"] = domain
#         out["subdomain"] = subdomain
#         out["suffix"] = ext.suffix or ""
#         out["domain_len"] = len(domain)
#         out["domain_entropy"] = domain_entropy(domain)
#         out["num_hyphens"] = hostname.count("-")
#         out["num_digits"] = sum(c.isdigit() for c in hostname)
#         out["path_len"] = len(path)
#         out["query_len"] = len(query)
#         out["uses_https"] = int(parsed.scheme == "https")

#         # WHOIS
#         w = _safe_whois(domain)
#         if w:
#             try:
#                 creation_date = w.creation_date
#                 expiration_date = w.expiration_date
#                 # handle multiple dates
#                 if isinstance(creation_date, list):
#                     creation_date = creation_date[0]
#                 if isinstance(expiration_date, list):
#                     expiration_date = expiration_date[0]
#                 if creation_date:
#                     domain_age_days = (time.time() - creation_date.timestamp()) / 86400.0
#                 else:
#                     domain_age_days = 0
#                 out["domain_age_days"] = max(0, int(domain_age_days))
#                 out["is_privacy_protected"] = int(bool(w.registrar and "privacy" in str(w.registrar).lower()))
#             except Exception:
#                 out["domain_age_days"] = 0
#                 out["is_privacy_protected"] = 0
#         else:
#             out["domain_age_days"] = 0
#             out["is_privacy_protected"] = 0

#         # DNS
#         ips = _dns_lookup(hostname)
#         out["num_ips"] = len(ips)

#         # SSL
#         cert = _get_cert_info(hostname)
#         if cert and "notAfter" in cert:
#             try:
#                 import datetime
#                 expiry = ssl.cert_time_to_seconds(cert["notAfter"])
#                 days_valid = max(0, int((expiry - time.time()) / 86400.0))
#                 out["ssl_days_valid"] = days_valid
#             except Exception:
#                 out["ssl_days_valid"] = 0
#         else:
#             out["ssl_days_valid"] = 0

#     except Exception:
#         # fallback defaults
#         out.update({
#             k: out.get(k, 0) for k in [
#                 "has_url", "domain", "subdomain", "suffix", "domain_len",
#                 "domain_entropy", "num_hyphens", "num_digits", "path_len",
#                 "query_len", "domain_age_days", "is_privacy_protected",
#                 "num_ips", "uses_https", "ssl_days_valid"
#             ]
#         })
#     return out



















import os
import socket, ssl, time
import tldextract
import whois
import dns.resolver
from urllib.parse import urlparse
import math

# ---------- TRUSTED DOMAIN CHECK ----------
def is_trusted_domain(domain: str) -> bool:
    trusted_path = os.path.join(os.path.dirname(__file__), "trusted_domains.txt")

    if not os.path.exists(trusted_path):
        return False

    with open(trusted_path, "r") as f:
        trusted = [d.strip().lower() for d in f.readlines()]

    return domain.lower() in trusted


# ---------- MIMIC / FAKE BRAND DOMAIN DETECTOR ----------
BRAND_KEYWORDS = [
    "amazon", "flipkart", "nykaa", "myntra", "ajio",
    "apple", "adidas", "nike", "croma", "meesho"
]

FAKE_TLDS = [
    "xyz", "shop", "online", "store", "buzz", "click",
    "cyou", "top", "site", "live"
]

def detect_mimic_domain(domain: str) -> bool:
    if not domain:
        return False

    ext = domain.split(".")[-1]  # suffix

    # Case: "amazon-sale-offer.shop"
    for brand in BRAND_KEYWORDS:
        if brand in domain.lower() and ext in FAKE_TLDS:
            return True

    # Case: domain similar to brand but fake
    for brand in BRAND_KEYWORDS:
        if domain.lower().replace("-", "").startswith(brand) and ext not in ["com", "in"]:
            return True

    return False


# ---------- SUPPORTING UTILITIES ----------
def _safe_whois(domain):
    try:
        return whois.whois(domain)
    except:
        return None

def _get_cert_info(hostname, port=443, timeout=5):
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((hostname, port), timeout=timeout) as sock:
            with ctx.wrap_socket(sock, server_hostname=hostname) as ssock:
                return ssock.getpeercert()
    except:
        return None

def _dns_lookup(hostname):
    try:
        answers = dns.resolver.resolve(hostname, "A")
        return [r.to_text() for r in answers]
    except:
        return []

def domain_entropy(domain):
    if not domain:
        return 0.0
    import collections
    freq = collections.Counter(domain)
    probs = [v / len(domain) for v in freq.values()]
    return -sum(p * math.log2(p) for p in probs)


# ---------- MAIN URL FEATURE EXTRACTOR ----------
def extract_url_features_safe(url: str) -> dict:
    try:
        if not url or not isinstance(url, str) or not url.strip():
            return {
                "has_url": 0,
                "domain": "",
                "subdomain": "",
                "suffix": "",
                "domain_len": 0,
                "domain_entropy": 0.0,
                "num_hyphens": 0,
                "num_digits": 0,
                "path_len": 0,
                "query_len": 0,
                "domain_age_days": 0,
                "is_privacy_protected": 0,
                "num_ips": 0,
                "uses_https": 0,
                "ssl_days_valid": 0,
            }

        parsed = urlparse(url if "://" in url else "http://" + url)
        hostname = parsed.hostname or ""
        path = parsed.path or ""
        query = parsed.query or ""

        ext = tldextract.extract(hostname)
        domain = ".".join([ext.domain, ext.suffix]) if ext.suffix else ext.domain

        out = {
            "has_url": 1,
            "domain": domain,
            "subdomain": ext.subdomain or "",
            "suffix": ext.suffix or "",
            "domain_len": len(domain),
            "domain_entropy": domain_entropy(domain),
            "num_hyphens": hostname.count("-"),
            "num_digits": sum(c.isdigit() for c in hostname),
            "path_len": len(path),
            "query_len": len(query),
            "uses_https": int(parsed.scheme == "https"),
        }

        # WHOIS
        w = _safe_whois(domain)
        if w:
            try:
                creation = w.creation_date
                if isinstance(creation, list):
                    creation = creation[0]
                if creation:
                    age = (time.time() - creation.timestamp()) / 86400.0
                    out["domain_age_days"] = max(0, int(age))
                else:
                    out["domain_age_days"] = 0

                out["is_privacy_protected"] = int(
                    "privacy" in str(w.registrar).lower()
                )
            except:
                out["domain_age_days"] = 0
                out["is_privacy_protected"] = 0
        else:
            out["domain_age_days"] = 0
            out["is_privacy_protected"] = 0

        # DNS
        ips = _dns_lookup(hostname)
        out["num_ips"] = len(ips)

        # SSL
        cert = _get_cert_info(hostname)
        if cert and "notAfter" in cert:
            try:
                expiry = ssl.cert_time_to_seconds(cert["notAfter"])
                days_left = (expiry - time.time()) / 86400.0
                out["ssl_days_valid"] = max(0, int(days_left))
            except:
                out["ssl_days_valid"] = 0
        else:
            out["ssl_days_valid"] = 0

        return out

    except:
        return {
            "has_url": 1,
            "domain": "",
            "subdomain": "",
            "suffix": "",
            "domain_len": 0,
            "domain_entropy": 0.0,
            "num_hyphens": 0,
            "num_digits": 0,
            "path_len": 0,
            "query_len": 0,
            "domain_age_days": 0,
            "is_privacy_protected": 0,
            "num_ips": 0,
            "uses_https": 0,
            "ssl_days_valid": 0,
        }
