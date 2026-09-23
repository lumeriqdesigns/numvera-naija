# Numvera Naija

Free, Nigeria-first online calculators: Salary & PAYE, CGPA (multi-scale), NYSC allowance, fuel cost, loans, percentages and age.

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- TypeScript
- lucide-react icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Vercel-ready. No database or API keys required for V1.

## Tools

| Tool | Path |
|------|------|
| Salary & PAYE | `/tools/salary-calculator` |
| CGPA (5/4/7 point) | `/tools/cgpa-calculator` |
| Loan | `/tools/loan-calculator` |
| NYSC Allowance | `/tools/nysc-calculator` |
| Fuel Cost | `/tools/fuel-calculator` |
| Percentage & Profit | `/tools/percentage-calculator` |
| Age | `/tools/age-calculator` |

## Notes

- Salary uses a simplified CRA + progressive PAYE model for education only.
- CGPA class bands follow common practice; institutions may differ.
- NYSC allowance default is illustrative — update when official rates change.
- Fuel prices and route distances are approximate.
- Analytics can be added later via `NEXT_PUBLIC_GA_ID`.
