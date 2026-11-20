"""Schedule a temporary App Store sale on an app's base-territory price, or read the schedule.

    python3 -I Support/AppStore/price_sale.py read  <app-id>
    python3 -I Support/AppStore/price_sale.py sale  <app-id> --full 4.99 --sale 2.99 \
        --start 2026-11-27 --end 2026-12-01 [--apply]

`--end` is the first day back at full price: Apple stores an appPrice endDate as 00:00
Pacific on that day (its manualPrices sample has endDate 2023-02-28, id timestamp
1677571200 = 2023-02-28T08:00Z), and the next price starts on the same date. Only the
base territory (USA) is set by hand, so Apple equalizes the other 174 storefronts.
Without --apply the sale prints the schedule it would post.
"""
import argparse, base64, collections, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import asc_api as A


def _decode(resource_id):
    return json.loads(base64.urlsafe_b64decode(resource_id + "=" * (-len(resource_id) % 4)))


def read(app_id, show=("USA", "GBR", "DEU", "JPN")):
    for kind in ("manualPrices", "automaticPrices"):
        rows, price = [], {}
        url = (f"/v1/appPriceSchedules/{app_id}/{kind}?include=appPricePoint"
               "&fields[appPricePoints]=customerPrice&limit=200")
        while url:
            d = A.call("GET", url) or {}
            price.update({i["id"]: i["attributes"]["customerPrice"] for i in d.get("included", [])})
            rows += d.get("data", [])
            url = d.get("links", {}).get("next")
        territories = collections.Counter(_decode(r["id"])["t"] for r in rows)
        print(f"{kind}: {len(rows)} rows across {len(territories)} territories")
        for r in rows:
            t = _decode(r["id"])["t"]
            if t in show:
                pp = r["relationships"]["appPricePoint"]["data"]["id"]
                print(f"  {t} {r['attributes']['startDate']} -> {r['attributes']['endDate']}  {price.get(pp)}")


def sale(app_id, full, sale_price, start, end, apply):
    points = A.pages(f"/v1/apps/{app_id}/appPricePoints?filter[territory]=USA&limit=200")
    by_price = {p["attributes"]["customerPrice"]: p["id"] for p in points}
    full_id, sale_id = by_price[full], by_price[sale_price]
    current = A.pages(f"/v1/appPriceSchedules/{app_id}/manualPrices?limit=200")
    if [_decode(c["id"])["p"] for c in current] != [_decode(full_id)["p"]]:
        sys.exit(f"USA manual price is not a single open-ended {full}; read the schedule first")
    rows = [(None, start, full_id), (start, end, sale_id), (end, None, full_id)]
    included = [{
        "type": "appPrices", "id": f"${{price{i}}}",
        "attributes": {"startDate": sd, "endDate": ed},
        "relationships": {"appPricePoint": {"data": {"type": "appPricePoints", "id": pp}},
                          "territory": {"data": {"type": "territories", "id": "USA"}}},
    } for i, (sd, ed, pp) in enumerate(rows)]
    body = {"data": {"type": "appPriceSchedules", "relationships": {
                "app": {"data": {"type": "apps", "id": app_id}},
                "baseTerritory": {"data": {"type": "territories", "id": "USA"}},
                "manualPrices": {"data": [{"type": "appPrices", "id": i["id"]} for i in included]}}},
            "included": included}
    for sd, ed, pp in rows:
        print(f"  USA {sd} -> {ed}  {full if pp == full_id else sale_price}")
    if apply:
        A.call("POST", "/v1/appPriceSchedules", body)
        print("posted; read back:")
        read(app_id)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["read", "sale"])
    ap.add_argument("app_id")
    ap.add_argument("--full"); ap.add_argument("--sale")
    ap.add_argument("--start"); ap.add_argument("--end")
    ap.add_argument("--apply", action="store_true")
    a = ap.parse_args()
    if a.cmd == "read":
        read(a.app_id)
    else:
        sale(a.app_id, a.full, a.sale, a.start, a.end, a.apply)
