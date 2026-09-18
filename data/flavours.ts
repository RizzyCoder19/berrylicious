export interface BuilderBase {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  basePrice?: number; // Defined if base has a standalone base price (e.g. Gelato ₹190)
  hasDirectVariantPricing?: boolean; // When flavours/variants define the final price (e.g. Real Fruit or Pancakes)
  isPricePending?: boolean; // When prices are missing (e.g. Waffles)
  description: string;
}

export interface BuilderFlavour {
  id: string;
  name: string;
  compatibleBases: string[]; // ids of bases this flavour applies to
  priceAddon?: number; // Addon price (or variant price)
  exactPrice?: number; // Exact total when paired with base
  color: string;
}

export interface BuilderTopping {
  id: string;
  name: string;
  compatibleBases: string[]; // ids of bases this topping applies to
  price: number; // For Gelato, toppings are +₹50
  color: string;
}

export const BUILDER_BASES: BuilderBase[] = [
  {
    id: "gelato",
    name: "Artisan Gelato",
    tagline: "Slow-churned Italian velvet",
    icon: "IceCream",
    basePrice: 190,
    description: "Dense, creamy buffalo milk gelato base churned fresh daily.",
  },
  {
    id: "real-fruit",
    name: "Real Fruit Dessert",
    tagline: "Pure natural fruit bowl",
    icon: "Apple",
    hasDirectVariantPricing: true,
    description: "Chilled fresh crushed seasonal fruit bowl.",
  },
  {
    id: "mini-pancakes",
    name: "Mini Pancakes",
    tagline: "12 bite-sized fluffy clouds",
    icon: "Utensils",
    hasDirectVariantPricing: true,
    description: "Golden warm Dutch poffertjes grilled fresh on the iron.",
  },
  {
    id: "waffle",
    name: "Crispy Waffle",
    tagline: "Deep pocket Belgian crunch",
    icon: "Grid",
    isPricePending: true,
    description: "Crispy outer crust with soft tender center (Single / Half / Full).",
  },
];

export const BUILDER_FLAVOURS: BuilderFlavour[] = [
  // Flavours for Gelato
  {
    id: "flavour-gelato-classic",
    name: "Sweet Cream Fior di Latte",
    compatibleBases: ["gelato"],
    color: "#FFF9F0",
  },
  {
    id: "flavour-gelato-darkchoco",
    name: "Belgium Dark Chocolate",
    compatibleBases: ["gelato"],
    color: "#4A2E2B",
  },
  {
    id: "flavour-gelato-pista",
    name: "Roasted Sicilian Pistachio",
    compatibleBases: ["gelato"],
    color: "#BFE9DE",
  },
  {
    id: "flavour-gelato-berrycheesecake",
    name: "Mix Berry Cheesecake",
    compatibleBases: ["gelato"],
    color: "#E98FA8",
  },

  // Flavours for Real Fruit Dessert (Confirmed menu prices)
  {
    id: "flavour-rf-strawberry",
    name: "Fresh Strawberry (₹120)",
    compatibleBases: ["real-fruit"],
    exactPrice: 120,
    color: "#E98FA8",
  },
  {
    id: "flavour-rf-mango",
    name: "Alphonso Mango (₹120)",
    compatibleBases: ["real-fruit"],
    exactPrice: 120,
    color: "#FAD02C",
  },
  {
    id: "flavour-rf-mixedberries",
    name: "Wild Mixed Berries (₹130)",
    compatibleBases: ["real-fruit"],
    exactPrice: 130,
    color: "#9E4663",
  },
  {
    id: "flavour-rf-sitaphal",
    name: "Royal Sitaphal (₹140)",
    compatibleBases: ["real-fruit"],
    exactPrice: 140,
    color: "#E5F4E3",
  },
  {
    id: "flavour-rf-mangoberries",
    name: "Mango + Mixed Berries (₹180)",
    compatibleBases: ["real-fruit"],
    exactPrice: 180,
    color: "#FFA07A",
  },

  // Flavours for Mini Pancakes
  {
    id: "flavour-mp-chocolate",
    name: "Melted Chocolate (₹140)",
    compatibleBases: ["mini-pancakes"],
    exactPrice: 140,
    color: "#5C3A21",
  },
  {
    id: "flavour-mp-nutella",
    name: "Hazelnut Nutella (₹160)",
    compatibleBases: ["mini-pancakes"],
    exactPrice: 160,
    color: "#6B3B24",
  },
  {
    id: "flavour-mp-threeway",
    name: "Triple Chocolate Threeway (₹170)",
    compatibleBases: ["mini-pancakes"],
    exactPrice: 170,
    color: "#8B5A2B",
  },

  // Flavours for Waffles (Gated: pricing pending)
  {
    id: "flavour-wf-chocolate",
    name: "Belgian Chocolate",
    compatibleBases: ["waffle"],
    color: "#5C3A21",
  },
  {
    id: "flavour-wf-nutella",
    name: "Warm Nutella",
    compatibleBases: ["waffle"],
    color: "#6B3B24",
  },
  {
    id: "flavour-wf-biscoff",
    name: "Lotus Biscoff Crunch",
    compatibleBases: ["waffle"],
    color: "#C68B59",
  },
  {
    id: "flavour-wf-blueberry",
    name: "Blueberry Compote",
    compatibleBases: ["waffle"],
    color: "#4B296B",
  },
];

export const BUILDER_TOPPINGS: BuilderTopping[] = [
  // Gelato Toppings (+₹50 each as specified in PRD Section 11 & 13)
  {
    id: "top-ferrero",
    name: "Hazelnut & Ferrero Rocher (+₹50)",
    compatibleBases: ["gelato"],
    price: 50,
    color: "#9E4663",
  },
  {
    id: "top-caramel",
    name: "Salted Butter Caramel (+₹50)",
    compatibleBases: ["gelato"],
    price: 50,
    color: "#C68B59",
  },
  {
    id: "top-kunafa",
    name: "Toasted Kataifi Kunafa Crunch (+₹50)",
    compatibleBases: ["gelato", "mini-pancakes", "waffle"],
    price: 50,
    color: "#D4AF37",
  },
  {
    id: "top-brownie",
    name: "Choco Fudge Brownie Chunks (+₹50)",
    compatibleBases: ["gelato", "mini-pancakes", "waffle"],
    price: 50,
    color: "#4A2E2B",
  },
  {
    id: "top-darkchoco",
    name: "Belgium Dark Chocolate Curls (+₹50)",
    compatibleBases: ["gelato", "real-fruit", "mini-pancakes", "waffle"],
    price: 50,
    color: "#382D32",
  },
  {
    id: "top-tiramisu",
    name: "Tiramisu Cocoa Dust (+₹50)",
    compatibleBases: ["gelato", "mini-pancakes"],
    price: 50,
    color: "#6B4423",
  },
  {
    id: "top-berries",
    name: "Fresh Strawberry & Berry Burst (+₹50)",
    compatibleBases: ["gelato", "real-fruit", "mini-pancakes", "waffle"],
    price: 50,
    color: "#E98FA8",
  },
  {
    id: "top-pista",
    name: "Crushed Roasted Pistachio (+₹50)",
    compatibleBases: ["gelato", "real-fruit"],
    price: 50,
    color: "#BFE9DE",
  },
  {
    id: "top-none",
    name: "No extra topping (Purist)",
    compatibleBases: ["gelato", "real-fruit", "mini-pancakes", "waffle"],
    price: 0,
    color: "#FFF9F0",
  },
];
