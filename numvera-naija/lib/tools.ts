import {
  Calculator,
  GraduationCap,
  Percent,
  WalletCards,
  CalendarDays,
  Fuel,
  Users,
  BookOpen,
  Award,
  Activity,
} from "lucide-react";

export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: "Money" | "Education" | "Everyday" | "Nigeria";
  href: string;
  icon: any;
  featured?: boolean;
};

export const tools: Tool[] = [
  {
    slug: "salary-calculator",
    name: "Salary & PAYE Calculator",
    description: "Estimate Nigerian take-home pay with pension, NHF and 2026-style PAYE bands.",
    category: "Money",
    href: "/tools/salary-calculator",
    icon: WalletCards,
    featured: true,
  },
  {
    slug: "jamb-calculator",
    name: "JAMB Aggregate Calculator",
    description: "Combine UTME and Post-UTME (and O'Level) using common university formulas.",
    category: "Education",
    href: "/tools/jamb-calculator",
    icon: Award,
    featured: true,
  },
  {
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    description: "Calculate CGPA on 5-point, 4-point or 7-point scales with class of degree.",
    category: "Education",
    href: "/tools/cgpa-calculator",
    icon: GraduationCap,
    featured: true,
  },
  {
    slug: "waec-calculator",
    name: "WAEC / NECO Points Calculator",
    description: "Sum best subject grade points for planning and aggregate-style checks.",
    category: "Education",
    href: "/tools/waec-calculator",
    icon: BookOpen,
    featured: true,
  },
  {
    slug: "nysc-calculator",
    name: "NYSC Allowance Calculator",
    description: "Project corps member allowance over service months and optional extra income.",
    category: "Nigeria",
    href: "/tools/nysc-calculator",
    icon: Users,
    featured: true,
  },
  {
    slug: "fuel-calculator",
    name: "Fuel Cost Calculator",
    description: "Estimate trip fuel cost for popular Nigerian routes or custom distances.",
    category: "Everyday",
    href: "/tools/fuel-calculator",
    icon: Fuel,
  },
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    description: "Estimate monthly payments, total interest and a short repayment preview.",
    category: "Money",
    href: "/tools/loan-calculator",
    icon: Calculator,
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Body Mass Index with standard WHO categories — quick health check.",
    category: "Everyday",
    href: "/tools/bmi-calculator",
    icon: Activity,
  },
  {
    slug: "percentage-calculator",
    name: "Percentage & Profit Calculator",
    description: "Percentages, increases, discounts and trader profit margin tools.",
    category: "Money",
    href: "/tools/percentage-calculator",
    icon: Percent,
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Exact age plus NYSC, licence and voting eligibility checks.",
    category: "Everyday",
    href: "/tools/age-calculator",
    icon: CalendarDays,
  },
];

export const toolMap = Object.fromEntries(tools.map((t) => [t.slug, t]));

export const categories = ["All", "Money", "Education", "Everyday", "Nigeria"] as const;
