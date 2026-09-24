/** Central site config */
export const siteConfig = {
  name: "Numvera Naija",
  url: "https://naijatools.vercel.app",
  email: "lumeriqdesigns@gmail.com",
  /** Digits only with country code (Nigeria 234). Local: 09031512760 */
  whatsappNumber: "2349031512760",
  whatsappDisplay: "0903 151 2760",
  whatsappAlertMessage:
    "Hi Numvera Naija, please add me for JAMB cut off and admission alerts.",
  payeAsOf: "2026 NTA style bands (illustrative)",
  fuelPriceNote: "Enter today’s pump price. Prices change often",
  cutoffsAsOf:
    "Institutional minima: 2026 JAMB Policy Meeting. Course figures: planning guides. Verify on school portal and CAPS",
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

/** Full written block appended to every shared or printed result */
export function formatShareMessage(resultBody: string) {
  return [
    "Numvera Naija result",
    "────────────────────",
    resultBody.trim(),
    "────────────────────",
    "This is an estimate for planning only. Always verify with official sources (JAMB CAPS, school portal, tax office).",
    "",
    `Website: ${siteConfig.url}`,
    `Email: ${siteConfig.email}`,
    `WhatsApp: ${siteConfig.whatsappDisplay}`,
    `Chat link: https://wa.me/${siteConfig.whatsappNumber}`,
  ].join("\n");
}
