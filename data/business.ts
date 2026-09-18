export interface BusinessMetric {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  caption: string;
  iconName: string;
}

export interface InvestmentAsk {
  askAmountINR: number;
  askAmountFormatted: string;
  equityPercentage: number;
  equityFormatted: string;
  impliedValuationINR: number;
  impliedValuationFormatted: string;
  footnote: string;
}

export interface FundAllocation {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints?: string[];
  iconName: string;
}

export const BUSINESS_DATA = {
  initialCapitalINR: 300000,
  initialCapitalFormatted: "₹3L",
  monthlyIncomeINR: 400000,
  monthlyIncomeFormatted: "₹4L",
  annualRevenueINR: 4800000,
  annualRevenueFormatted: "₹48L",
  grossMarginPercentage: 60,
  grossMarginFormatted: "60%",
  pilotOutlets: 1,

  footnote:
    "Figures presented are based on the business information prepared for the Shark Tank presentation.",

  metrics: [
    {
      id: "capital",
      label: "Initial Capital",
      value: "3L",
      numericValue: 3,
      prefix: "₹",
      suffix: "L",
      caption: "Bootstrapped seed capital to launch pilot unit",
      iconName: "Wallet",
    },
    {
      id: "monthly",
      label: "Avg. Monthly Income",
      value: "4L",
      numericValue: 4,
      prefix: "₹",
      suffix: "L",
      caption: "Stated average run-rate across pilot operations",
      iconName: "TrendingUp",
    },
    {
      id: "annual",
      label: "Annual Revenue",
      value: "48L",
      numericValue: 48,
      prefix: "₹",
      suffix: "L",
      caption: "Stated annualised turnover",
      iconName: "BarChart3",
    },
    {
      id: "margin",
      label: "Gross Margin",
      value: "60",
      numericValue: 60,
      suffix: "%",
      caption: "High margin profile through localized fruit sourcing",
      iconName: "PieChart",
    },
    {
      id: "outlets",
      label: "Pilot Outlet",
      value: "1",
      numericValue: 1,
      caption: "Proven standalone retail kiosk model",
      iconName: "Store",
    },
  ] as BusinessMetric[],

  investment: {
    askAmountINR: 2000000,
    askAmountFormatted: "₹20 LAKH",
    equityPercentage: 10,
    equityFormatted: "10% equity",
    impliedValuationINR: 2000000 / 0.1, // 20,00,000 / 0.10 = 2,00,00,000
    impliedValuationFormatted: "₹2 CRORE",
    valuationFormula: "₹20,00,000 ÷ 0.10 = ₹2,00,00,000",
    footnote:
      "Implied pre-money valuation derived strictly from the stated presentation ask.",
  } as InvestmentAsk & { valuationFormula: string },

  useOfFunds: [
    {
      id: "outlet",
      number: "01",
      title: "New Outlet Expansion",
      subtitle: "West Bengal Footprint",
      description:
        "Opening a second high-footfall retail outlet in West Bengal to scale physical brand presence and operational revenue.",
      bulletPoints: ["Prime student-hub location", "Turnkey kitchen setup", "Compact footprint"],
      iconName: "Store",
    },
    {
      id: "supply-chain",
      number: "02",
      title: "Supply Chain & Cold Storage",
      subtitle: "Preserving Fruit Freshness",
      description:
        "Strengthening farm-to-cup cold storage facilities to support larger batch freezing, reducing logistics overhead and food waste.",
      bulletPoints: ["Blast freezing units", "Direct farmer aggregators", "Reduced transit wastage"],
      iconName: "Snowflake",
    },
    {
      id: "marketing",
      number: "03",
      title: "Student-Focused Marketing",
      subtitle: "Hyper-Local Community Buzz",
      description:
        "Targeted experiential marketing focused directly on youth culture, college campuses, and social virality.",
      bulletPoints: ["College fest sponsorships", "School event tie-ups", "Reels & creator engagement"],
      iconName: "Megaphone",
    },
  ] as FundAllocation[],

  investorValue: [
    {
      title: "Scalable Branded Dessert Concept",
      description:
        "A reproducible dessert kiosk format designed for high unit economics and rapid rollout in dense suburban & campus locations.",
      iconName: "Sparkles",
    },
    {
      title: "Accessible Premium Positioning",
      description:
        "Tapping the underserved gap between basic mass-market ice cream and unaffordable luxury patisseries.",
      iconName: "Target",
    },
    {
      title: "Expansion Pathway",
      description:
        "Targeted roadmap starting across West Bengal education hubs before regional multi-city scaling.",
      iconName: "MapPin",
    },
  ],
};
