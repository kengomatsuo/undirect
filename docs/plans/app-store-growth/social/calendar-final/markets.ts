// Every language the calendar posts in, each timed in its own country's clock (owner, 2026-11-21: English,
// Japanese and Indonesian only; every other language is dropped). Each post goes out in all three on
// Instagram, Facebook, Threads and TikTok, so there is no weighting between them. Sources for each hour are in
// docs/research/posting-times-countries.md (sections 2a-2e); a GUESS is marked as one.

export type LangCode = "en" | "ja" | "id";
export type Plat = "X" | "Instagram" | "Facebook" | "Threads" | "TikTok" | "YouTube";

export type Market = {
  lang: LangCode; name: string; country: string; zone: string;
  off: number; // hours from WIB (UTC+7) to the market's local clock, valid Nov 22 2026 to Mar 13 2027 (US daylight time starts Mar 14)
  stagger: number; // minutes, so languages in one zone never share a minute on one account
  // App Store units from the markets this language reaches, both apps, Aug 20-Nov 19 2026, and paid
  // units Sep 1-Nov 19 (posting-times-countries.md, "App Store units by country").
  units: number; paid: number;
  // Each language carries every post (version 7), so every weight is 1; kept for the export's shape.
  weight: number;
  grid?: "ja" | "id"; // measured national hours replace the global grid
  note?: string;
};

export const MARKETS: Market[] = [
  // US and Canada 140, UK 8, India 5, Australia 4; paid US 7, Canada 2, UK 1, India 1
  { lang: "en", name: "English", country: "United States", zone: "ET", off: -12, stagger: 0, units: 157, paid: 11, weight: 1 },
  { lang: "ja", name: "Japanese", country: "Japan", zone: "JST", off: 2, stagger: 0, units: 6, paid: 1, weight: 1, grid: "ja" },
  { lang: "id", name: "Indonesian", country: "Indonesia", zone: "WIB", off: 0, stagger: 0, units: 7, paid: 1, weight: 1, grid: "id" },
];

// A post's part of the day. The approved calendar's slot 3 was the US morning, slot 1 the US
// afternoon and slot 2 the US evening; the same parts are kept in every country.
export type Part = "am" | "mid" | "pm";
export const PART_OF_SLOT: Record<string, Part> = { "3": "am", "1": "mid", "2": "pm" };

type Grid = Record<Part, string>;
// Global studies, all in the viewer's local time (section 2a).
export const GRID: Record<Plat, Grid & { why: Record<Part, string> }> = {
  X: { am: "09:00", mid: "12:00", pm: "17:00", why: { am: "Buffer X Tue 9:00", mid: "Sprout tech X Tue-Thu 11-16", pm: "Sprout X Mon 17:00" } },
  Instagram: { am: "09:00", mid: "12:30", pm: "20:00", why: { am: "Buffer IG Thu 9:00", mid: "Sprout tech IG 11-13", pm: "Metricool IG 20:00" } },
  Facebook: { am: "09:00", mid: "12:30", pm: "20:00", why: { am: "Buffer FB Thu 9:00", mid: "Sprout FB Tue-Wed 12-20", pm: "Sprout FB Tue-Wed 12-20" } },
  Threads: { am: "08:30", mid: "12:00", pm: "14:00", why: { am: "Hootsuite Threads Tue 8:00; Buffer weekdays 7-12", mid: "Hootsuite Threads Wed 12:00", pm: "Hootsuite Threads Fri 14:00" } },
  TikTok: { am: "09:00", mid: "13:00", pm: "19:00", why: { am: "Buffer TikTok Sun 9:00", mid: "Buffer TikTok Mon 13:00", pm: "Metricool TikTok 18-20" } },
  YouTube: { am: "10:00", mid: "16:00", pm: "20:00", why: { am: "Buffer YouTube Sun 10:00 (long-form; GUESS for Shorts)", mid: "Buffer Shorts Fri 16:00", pm: "GUESS: Buffer's short-video view peak 18-23" } },
};
// Japan: Ministry of Internal Affairs survey 2024, internet use by hour (section 2b).
const JA: Grid = { am: "07:45", mid: "12:15", pm: "21:15" };
// Indonesia: Jakpat 2024 peaks 07-09 and 18-21; lunch is a GUESS borrowed from Japan (section 2c).
const ID: Grid = { am: "07:30", mid: "12:15", pm: "19:30" };
export const NATIONAL_WHY = { ja: { am: "MIC 07-08時 commute", mid: "MIC 12時台 lunch peak", pm: "MIC 21時台 daily peak" }, id: { am: "Jakpat 07-09", mid: "GUESS: lunch, borrowed from Japan", pm: "Jakpat 18-21" } };

// Platforms get a few minutes apart so one market's deliveries never stack. TikTok sits on a
// 5-minute mark because TikTok Studio schedules only in 5-minute steps.
const PLAT_SHIFT: Record<Plat, number> = { X: 0, Instagram: 0, Facebook: 2, Threads: 4, TikTok: 5, YouTube: 8 };

export const DAY = 86400000;
export const HOUR = 3600000;
const parse = (hhmm: string) => { const [h, m] = hhmm.split(":").map(Number); return (h * 60 + m) * 60000; };

// The WIB instant (as a UTC-epoch number whose UTC fields read as WIB) of a delivery: the post's
// local calendar day, the platform's hour for that part of the day, in that market's zone.
export function deliveryTime(localDate: string, part: Part, plat: Plat, m: Market): { t: number; local: string; why: string } {
  const hhmm = m.grid === "ja" ? JA[part] : m.grid === "id" ? ID[part] : GRID[plat][part];
  const why = m.grid ? NATIONAL_WHY[m.grid][part] : GRID[plat].why[part];
  const localT = new Date(localDate + "T00:00:00Z").getTime() + parse(hhmm) + (m.stagger + PLAT_SHIFT[plat]) * 60000;
  return { t: localT - m.off * HOUR, local: iso(localT), why };
}

export const iso = (t: number) => new Date(t).toISOString().slice(0, 16).replace("T", " ");
