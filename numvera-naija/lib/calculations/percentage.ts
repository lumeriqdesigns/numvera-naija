export function percentOf(x: number, y: number) {
  return y === 0 ? null : (x / y) * 100;
}

export function whatIsPercent(percent: number, of: number) {
  return (percent / 100) * of;
}

export function changePercent(from: number, to: number) {
  if (from === 0) return null;
  return ((to - from) / from) * 100;
}

export function difference(a: number, b: number) {
  return Math.abs(a - b);
}

export function profitMargin(cost: number, selling: number) {
  if (cost === 0) return null;
  return ((selling - cost) / cost) * 100;
}

export function discountAmount(original: number, discountPct: number) {
  return original * (discountPct / 100);
}

export function priceAfterDiscount(original: number, discountPct: number) {
  return original - discountAmount(original, discountPct);
}
