// Shipping rates from the original store.js: the real cost per country (Packlink, home pickup, 0.9 kg box of
// 20x15x15 cm, from A Coruña 15009, measured on 4 September 2026). The price charged is the cost times SHIP_MARGIN,
// rounded up to the next whole euro. The original mirrors these values on its checkout server.
export const SHIP_MARGIN = 1.15;

export const SHIP_COST: Record<string, number> = {
  // Europe
  ES: 5.51, PT: 6.35, GB: 9.89, LU: 10.4, DE: 10.53, AT: 10.61, FR: 11.21, LT: 11.69,
  CZ: 11.99, IT: 12.29, LV: 12.77, SE: 12.96, SI: 13.25, PL: 13.51, DK: 14.11, NL: 14.23,
  BE: 14.44, SK: 16.36, HU: 16.36, IE: 17.85, FI: 19.67, GR: 19.67, HR: 21.0, RO: 21.0,
  BG: 21.0, EE: 21.0, MT: 21.0, CY: 21.0, CH: 22.83, TR: 26.35, NO: 26.47, IS: 30.93,
  // Americas
  CA: 24.21, MX: 27.12, BR: 27.95, AR: 29.56, CL: 29.56, CO: 29.56, US: 39.77,
  // Asia, Oceania, Africa
  CN: 11.49, SG: 22.4, ZA: 22.4, KR: 25.2, AU: 26.29, JP: 32.72, NZ: 40.23, IN: 50.09, MA: 54.39,
};

export const SHIP_NAME: Record<string, string> = {
  ES: 'Spain', PT: 'Portugal', GB: 'United Kingdom', LU: 'Luxembourg', DE: 'Germany',
  AT: 'Austria', FR: 'France', LT: 'Lithuania', CZ: 'Czech Republic', IT: 'Italy',
  LV: 'Latvia', SE: 'Sweden', SI: 'Slovenia', PL: 'Poland', DK: 'Denmark', NL: 'Netherlands',
  BE: 'Belgium', SK: 'Slovakia', HU: 'Hungary', IE: 'Ireland', FI: 'Finland', GR: 'Greece',
  HR: 'Croatia', RO: 'Romania', BG: 'Bulgaria', EE: 'Estonia', MT: 'Malta', CY: 'Cyprus',
  CH: 'Switzerland', TR: 'Turkey', NO: 'Norway', IS: 'Iceland',
  CA: 'Canada', MX: 'Mexico', BR: 'Brazil', AR: 'Argentina', CL: 'Chile', CO: 'Colombia', US: 'United States',
  CN: 'China', SG: 'Singapore', ZA: 'South Africa', KR: 'South Korea', AU: 'Australia',
  JP: 'Japan', NZ: 'New Zealand', IN: 'India', MA: 'Morocco',
};

export const DEFAULT_COUNTRY = 'ES';

/** The countries of the "Ship to" list, sorted by name. */
export const SHIP_COUNTRIES = Object.keys(SHIP_NAME)
  .sort((a, b) => SHIP_NAME[a].localeCompare(SHIP_NAME[b]))
  .map((code) => ({ code, name: SHIP_NAME[code] }));

export const shippingEUR = (country: string): number | null => {
  const cost = SHIP_COST[country];
  return cost == null ? null : Math.ceil(cost * SHIP_MARGIN);
};
