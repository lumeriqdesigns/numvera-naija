/**
 * Fuel cost / trip cost estimator for Nigeria.
 * Distances are approximate highway one-way km; pump prices change — user supplies current price.
 */

export type FuelInput = {
  distanceKm: number;
  efficiencyKmPerLitre: number;
  pricePerLitre: number;
  passengers?: number;
  roundTrip?: boolean;
};

export type FuelResult = {
  litresNeeded: number;
  totalCost: number;
  costPerPerson: number;
  distanceUsed: number;
};

export function calculateFuel(input: FuelInput): FuelResult | null {
  const dist = Math.max(0, input.distanceKm || 0);
  const eff = Math.max(0.1, input.efficiencyKmPerLitre || 0);
  const price = Math.max(0, input.pricePerLitre || 0);
  if (!dist || !eff) return null;
  const distanceUsed = input.roundTrip ? dist * 2 : dist;
  const litres = distanceUsed / eff;
  const total = litres * price;
  const pax = Math.max(1, input.passengers || 1);
  return {
    litresNeeded: litres,
    totalCost: total,
    costPerPerson: total / pax,
    distanceUsed,
  };
}

export type Route = {
  name: string;
  km: number;
  region?: string;
};

/** Major interstate / intercity routes across Nigeria (approx one-way km) */
export const popularRoutes: Route[] = [
  // From Lagos
  { name: "Lagos → Ibadan", km: 130, region: "SW" },
  { name: "Lagos → Abeokuta", km: 100, region: "SW" },
  { name: "Lagos → Benin City", km: 310, region: "SS" },
  { name: "Lagos → Warri", km: 380, region: "SS" },
  { name: "Lagos → Port Harcourt", km: 620, region: "SS" },
  { name: "Lagos → Asaba", km: 430, region: "SS" },
  { name: "Lagos → Enugu", km: 600, region: "SE" },
  { name: "Lagos → Onitsha", km: 520, region: "SE" },
  { name: "Lagos → Owerri", km: 580, region: "SE" },
  { name: "Lagos → Abuja", km: 750, region: "NC" },
  { name: "Lagos → Ilorin", km: 290, region: "NC" },
  { name: "Lagos → Akure", km: 320, region: "SW" },
  { name: "Lagos → Osogbo", km: 240, region: "SW" },
  { name: "Lagos → Ado-Ekiti", km: 350, region: "SW" },
  { name: "Lagos → Calabar", km: 750, region: "SS" },
  { name: "Lagos → Uyo", km: 700, region: "SS" },
  { name: "Lagos → Yenagoa", km: 480, region: "SS" },
  { name: "Lagos → Lokoja", km: 520, region: "NC" },
  { name: "Lagos → Makurdi", km: 700, region: "NC" },
  { name: "Lagos → Jos", km: 900, region: "NC" },
  { name: "Lagos → Kano", km: 1000, region: "NW" },
  { name: "Lagos → Kaduna", km: 850, region: "NW" },
  { name: "Lagos → Sokoto", km: 1050, region: "NW" },
  { name: "Lagos → Maiduguri", km: 1450, region: "NE" },
  // From Abuja
  { name: "Abuja → Kaduna", km: 190, region: "NW" },
  { name: "Abuja → Kano", km: 400, region: "NW" },
  { name: "Abuja → Jos", km: 300, region: "NC" },
  { name: "Abuja → Lokoja", km: 200, region: "NC" },
  { name: "Abuja → Minna", km: 150, region: "NC" },
  { name: "Abuja → Makurdi", km: 280, region: "NC" },
  { name: "Abuja → Enugu", km: 390, region: "SE" },
  { name: "Abuja → Onitsha", km: 450, region: "SE" },
  { name: "Abuja → Port Harcourt", km: 600, region: "SS" },
  { name: "Abuja → Benin City", km: 480, region: "SS" },
  { name: "Abuja → Ilorin", km: 400, region: "NC" },
  { name: "Abuja → Ibadan", km: 550, region: "SW" },
  { name: "Abuja → Lagos", km: 750, region: "SW" },
  { name: "Abuja → Sokoto", km: 550, region: "NW" },
  { name: "Abuja → Maiduguri", km: 850, region: "NE" },
  { name: "Abuja → Yola", km: 650, region: "NE" },
  { name: "Abuja → Gombe", km: 450, region: "NE" },
  { name: "Abuja → Bauchi", km: 400, region: "NE" },
  { name: "Abuja → Lafia", km: 180, region: "NC" },
  { name: "Abuja → Nasarawa", km: 80, region: "NC" },
  // From Port Harcourt / South-South
  { name: "Port Harcourt → Enugu", km: 220, region: "SE" },
  { name: "Port Harcourt → Owerri", km: 100, region: "SE" },
  { name: "Port Harcourt → Aba", km: 60, region: "SE" },
  { name: "Port Harcourt → Calabar", km: 200, region: "SS" },
  { name: "Port Harcourt → Uyo", km: 120, region: "SS" },
  { name: "Port Harcourt → Yenagoa", km: 110, region: "SS" },
  { name: "Port Harcourt → Warri", km: 180, region: "SS" },
  { name: "Port Harcourt → Asaba", km: 200, region: "SS" },
  { name: "Port Harcourt → Benin City", km: 280, region: "SS" },
  { name: "Port Harcourt → Onitsha", km: 180, region: "SE" },
  { name: "Port Harcourt → Abuja", km: 600, region: "NC" },
  { name: "Warri → Benin City", km: 100, region: "SS" },
  { name: "Warri → Asaba", km: 150, region: "SS" },
  { name: "Calabar → Uyo", km: 100, region: "SS" },
  { name: "Calabar → Enugu", km: 250, region: "SE" },
  // South-East
  { name: "Enugu → Onitsha", km: 110, region: "SE" },
  { name: "Enugu → Owerri", km: 140, region: "SE" },
  { name: "Enugu → Abakaliki", km: 80, region: "SE" },
  { name: "Enugu → Aba", km: 160, region: "SE" },
  { name: "Onitsha → Owerri", km: 100, region: "SE" },
  { name: "Onitsha → Asaba", km: 10, region: "SS" },
  { name: "Owerri → Aba", km: 60, region: "SE" },
  { name: "Owerri → Umuahia", km: 60, region: "SE" },
  // North
  { name: "Kano → Kaduna", km: 230, region: "NW" },
  { name: "Kano → Katsina", km: 170, region: "NW" },
  { name: "Kano → Sokoto", km: 450, region: "NW" },
  { name: "Kano → Maiduguri", km: 550, region: "NE" },
  { name: "Kano → Jos", km: 350, region: "NC" },
  { name: "Kaduna → Zaria", km: 80, region: "NW" },
  { name: "Kaduna → Jos", km: 250, region: "NC" },
  { name: "Kaduna → Sokoto", km: 400, region: "NW" },
  { name: "Sokoto → Kebbi (Birnin Kebbi)", km: 150, region: "NW" },
  { name: "Sokoto → Zamfara (Gusau)", km: 180, region: "NW" },
  { name: "Maiduguri → Damaturu", km: 140, region: "NE" },
  { name: "Maiduguri → Gombe", km: 350, region: "NE" },
  { name: "Maiduguri → Yola", km: 400, region: "NE" },
  { name: "Jos → Bauchi", km: 130, region: "NE" },
  { name: "Jos → Gombe", km: 250, region: "NE" },
  { name: "Jos → Lafia", km: 200, region: "NC" },
  { name: "Yola → Gombe", km: 250, region: "NE" },
  { name: "Yola → Jalingo", km: 200, region: "NE" },
  { name: "Bauchi → Gombe", km: 150, region: "NE" },
  // Middle belt / NC extras
  { name: "Ilorin → Jebba", km: 90, region: "NC" },
  { name: "Ilorin → Kabba", km: 180, region: "NC" },
  { name: "Makurdi → Otukpo", km: 100, region: "NC" },
  { name: "Makurdi → Lafia", km: 120, region: "NC" },
  { name: "Minna → Bida", km: 90, region: "NC" },
  { name: "Minna → Kontagora", km: 180, region: "NC" },
  // SW extras
  { name: "Ibadan → Ife", km: 80, region: "SW" },
  { name: "Ibadan → Osogbo", km: 100, region: "SW" },
  { name: "Ibadan → Abeokuta", km: 80, region: "SW" },
  { name: "Ibadan → Akure", km: 200, region: "SW" },
  { name: "Akure → Ado-Ekiti", km: 50, region: "SW" },
  { name: "Akure → Owo", km: 50, region: "SW" },
  { name: "Abeokuta → Ijebu-Ode", km: 90, region: "SW" },
];

export const routeRegions = ["All", "SW", "SS", "SE", "NC", "NW", "NE"] as const;
