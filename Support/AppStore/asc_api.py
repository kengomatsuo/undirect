"""Minimal App Store Connect API client (standard library plus the openssl binary).

The asc CLI cannot create a custom product page: Apple's endpoint needs the first
version and its localizations in the same request body, and the CLI sends none.
Auth reads ASC_KEY_ID, ASC_ISSUER_ID and ASC_PRIVATE_KEY_PATH, which default to the
team key that lives in the Cutling repo.
"""
import base64, json, os, subprocess, time, urllib.error, urllib.request

KEY_ID = os.environ.get("ASC_KEY_ID", "8R8JCJZUNJ")
ISSUER = os.environ.get("ASC_ISSUER_ID", "79deecfa-75ef-43ad-80c2-e25e55f38f41")
KEY_PATH = os.environ.get("ASC_PRIVATE_KEY_PATH",
                          "/Users/hafang/Repositories/Cutling/fastlane/AuthKey_8R8JCJZUNJ.p8")
BASE = "https://api.appstoreconnect.apple.com"
_token = {"v": None, "exp": 0}


def _b64(b):
    return base64.urlsafe_b64encode(b).rstrip(b"=").decode()


def _der_to_raw(der):
    # ECDSA DER signature -> 64 byte r||s
    assert der[0] == 0x30
    i = 2 if der[1] < 0x80 else 2 + (der[1] & 0x7F)
    assert der[i] == 0x02
    rl = der[i + 1]; r = der[i + 2:i + 2 + rl]; i = i + 2 + rl
    assert der[i] == 0x02
    sl = der[i + 1]; s = der[i + 2:i + 2 + sl]
    return r.lstrip(b"\0").rjust(32, b"\0") + s.lstrip(b"\0").rjust(32, b"\0")


def token():
    if time.time() < _token["exp"] - 60:
        return _token["v"]
    now = int(time.time())
    head = _b64(json.dumps({"alg": "ES256", "kid": KEY_ID, "typ": "JWT"}).encode())
    body = _b64(json.dumps({"iss": ISSUER, "iat": now, "exp": now + 1100,
                            "aud": "appstoreconnect-v1"}).encode())
    signing = f"{head}.{body}".encode()
    der = subprocess.run(["openssl", "dgst", "-sha256", "-sign", KEY_PATH],
                         input=signing, capture_output=True, check=True).stdout
    _token.update(v=f"{head}.{body}.{_b64(_der_to_raw(der))}", exp=now + 1100)
    return _token["v"]


def call(method, path, body=None, retries=3):
    url = path if path.startswith("http") else BASE + path
    data = json.dumps(body).encode() if body is not None else None
    for i in range(retries):
        req = urllib.request.Request(url, data=data, method=method, headers={
            "Authorization": f"Bearer {token()}", "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                raw = r.read()
                return json.loads(raw) if raw else {}
        except urllib.error.HTTPError as e:
            detail = e.read().decode(errors="replace")
            if e.code in (429, 500, 502, 503) and i < retries - 1:
                time.sleep(min(int(e.headers.get("Retry-After") or 0) or 3 * (i + 1), 600)); continue
            raise RuntimeError(f"{method} {path} -> {e.code}: {detail[:1500]}")


def pages(path):
    """Follow links.next and return every row."""
    out, url = [], path
    while url:
        d = call("GET", url)
        out += d.get("data", [])
        url = d.get("links", {}).get("next")
    return out
