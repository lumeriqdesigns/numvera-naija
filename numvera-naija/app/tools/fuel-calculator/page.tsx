"use client";
import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import { calculateFuel, popularRoutes } from "@/lib/calculations/fuel";
import { formatNaira } from "@/lib/calculations/salary";

export default function FuelPage() {
  const [distance, setDistance] = useState("750");
  const [efficiency, setEfficiency] = useState("12");
  const [price, setPrice] = useState("900");
  const [passengers, setPassengers] = useState("1");
  const [roundTrip, setRoundTrip] = useState(false);

  const r = useMemo(
    () =>
      calculateFuel({
        distanceKm: Number(distance) || 0,
        efficiencyKmPerLitre: Number(efficiency) || 0,
        pricePerLitre: Number(price) || 0,
        passengers: Number(passengers) || 1,
        roundTrip,
      }),
    [distance, efficiency, price, passengers, roundTrip]
  );

  return (
    <ToolLayout
      name="Fuel Cost Calculator"
      description="Estimate petrol or diesel cost for inter-city trips in Nigeria. Pick a popular route or enter your own distance and current pump price."
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {popularRoutes.map((route) => (
          <button
            key={route.name}
            type="button"
            className="rounded-full border px-3 py-1.5 text-sm font-bold hover:bg-[#f7f9f8]"
            onClick={() => setDistance(String(route.km))}
          >
            {route.name} (~{route.km} km)
          </button>
        ))}
      </div>
      <CalculatorShell>
        <div className="space-y-4">
          <div>
            <label className="label">Distance one-way (km)</label>
            <input className="field" type="number" min="0" value={distance} onChange={(e) => setDistance(e.target.value)} />
          </div>
          <div>
            <label className="label">Fuel efficiency (km per litre)</label>
            <input className="field" type="number" min="0.1" step="0.1" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} />
            <p className="mt-1 text-xs muted">Typical small car ~10–14 km/L; adjust for your vehicle.</p>
          </div>
          <div>
            <label className="label">Pump price per litre (₦)</label>
            <input className="field" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <label className="label">Passengers (to split cost)</label>
            <input className="field" type="number" min="1" value={passengers} onChange={(e) => setPassengers(e.target.value)} />
          </div>
          <label className="flex items-center gap-3 rounded-xl border p-4 text-sm font-bold">
            <input type="checkbox" checked={roundTrip} onChange={(e) => setRoundTrip(e.target.checked)} />
            Round trip (×2 distance)
          </label>
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          {r ? (
            <>
              <p className="text-sm font-bold muted">ESTIMATED FUEL COST</p>
              <div className="result-number mt-2">{formatNaira(r.totalCost)}</div>
              <div className="mt-6 grid gap-3">
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs muted">Litres needed</p>
                  <p className="mt-1 font-bold">{r.litresNeeded.toFixed(1)} L</p>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs muted">Distance used</p>
                  <p className="mt-1 font-bold">{r.distanceUsed.toLocaleString()} km</p>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs muted">Cost per person</p>
                  <p className="mt-1 font-bold">{formatNaira(r.costPerPerson)}</p>
                </div>
              </div>
              <ShareResult
                text={`Fuel estimate: ${formatNaira(r.totalCost)} for ${r.distanceUsed} km (${r.litresNeeded.toFixed(1)} L) · Numvera Naija`}
              />
            </>
          ) : (
            <p className="text-sm text-red-700">Enter distance and efficiency greater than zero.</p>
          )}
        </div>
      </CalculatorShell>
      <div className="mt-9 rounded-xl border-l-4 border-brand-600 bg-[#f7f9f8] p-5 text-sm leading-6 muted">
        Route distances are approximate. Fuel prices change frequently — always use the current pump price in
        your area. Does not include tolls, driver allowance or vehicle wear.
      </div>
      <RelatedTools exclude="fuel-calculator" />
    </ToolLayout>
  );
}
