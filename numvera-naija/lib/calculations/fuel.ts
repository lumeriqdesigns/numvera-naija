/**
 * Fuel cost / trip cost estimator for Nigeria.
 * Pump prices change frequently — user supplies current price.
 */

export type FuelInput = {
  distanceKm: number;
  efficiencyKmPerLitre: number; // how many km per litre
  pricePerLitre: number;
  passengers?: number; // optional cost split
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

/** Popular inter-city distances (approx one-way km) */
export const popularRoutes = [
  { name: "Lagos → Abuja", km: 750 },
  { name: "Lagos → Ibadan", km: 130 },
  { name: "Lagos → Port Harcourt", km: 620 },
  { name: "Abuja → Kano", km: 400 },
  { name: "Lagos → Benin", km: 310 },
  { name: "Abuja → Enugu", km: 390 },
];
