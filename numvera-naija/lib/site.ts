/** Central site config — update WhatsApp to your real number (country code, no +) */
export const siteConfig = {
  name: "Numvera Naija",
  url: "https://naijatools.vercel.app",
  /** e.g. 2348012345678 — digits only */
  whatsappNumber: "2348000000000",
  whatsappAlertMessage:
    "Hi Numvera Naija — please add me for JAMB cut-off & admission alerts.",
  /** Shown on estimate tools for trust */
  payeAsOf: "2026 NTA-style bands (illustrative)",
  fuelPriceNote: "Enter today’s pump price — prices change often",
  cutoffsAsOf: "Institutional minima: 2026 JAMB Policy Meeting · Course figures: planning guides — verify on school portal & CAPS",
  nationalUniversityMin: 150,
  nationalPolyMin: 100,
};

export function whatsappAlertUrl() {
  const n = siteConfig.whatsappNumber;
  const text = encodeURIComponent(siteConfig.whatsappAlertMessage);
  return `https://wa.me/${n}?text=${text}`;
}

export function whatsappShareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
