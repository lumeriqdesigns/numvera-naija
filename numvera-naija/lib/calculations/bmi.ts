export function calculateBmi(weightKg: number, heightCm: number) {
  if (weightKg <= 0 || heightCm <= 0) return null;
  const m = heightCm / 100;
  const bmi = weightKg / (m * m);
  let category = "Obese";
  let color = "text-red-700";
  if (bmi < 18.5) {
    category = "Underweight";
    color = "text-amber-700";
  } else if (bmi < 25) {
    category = "Normal weight";
    color = "text-emerald-700";
  } else if (bmi < 30) {
    category = "Overweight";
    color = "text-orange-700";
  }
  return { bmi, category, color };
}
