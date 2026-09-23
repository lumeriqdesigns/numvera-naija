export type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  nextBirthdayDays: number;
  nyscEligible: boolean;
  driversLicenceEligible: boolean;
  votingEligible: boolean;
};

export function exactAge(dob: Date, asOf: Date): AgeResult | null {
  if (dob > asOf) return null;
  let years = asOf.getFullYear() - dob.getFullYear();
  let months = asOf.getMonth() - dob.getMonth();
  let days = asOf.getDate() - dob.getDate();
  if (days < 0) {
    months--;
    const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  const totalDays = Math.floor(
    (Date.UTC(asOf.getFullYear(), asOf.getMonth(), asOf.getDate()) -
      Date.UTC(dob.getFullYear(), dob.getMonth(), dob.getDate())) /
      86400000
  );
  const totalMonths = years * 12 + months;

  let next = new Date(asOf.getFullYear(), dob.getMonth(), dob.getDate());
  if (next <= asOf) next = new Date(asOf.getFullYear() + 1, dob.getMonth(), dob.getDate());
  const nextBirthdayDays = Math.floor(
    (Date.UTC(next.getFullYear(), next.getMonth(), next.getDate()) -
      Date.UTC(asOf.getFullYear(), asOf.getMonth(), asOf.getDate())) /
      86400000
  );

  return {
    years,
    months,
    days,
    totalDays,
    totalMonths,
    nextBirthdayDays,
    nyscEligible: years >= 18 && years <= 30,
    driversLicenceEligible: years >= 18,
    votingEligible: years >= 18,
  };
}
