// Placeholder category descriptions - edit freely.
export const categories = [
  { slug: "amino-acid-chelates", name: "Amino Acid Chelates", color: "#2E9E5B", description: "Amino acid chelated micronutrients are designed to support efficient nutrient uptake and healthy crop development." },
  { slug: "bio-fertilizers", name: "Bio Fertilizers", color: "#C9A227", description: "Bio fertilizers contain beneficial living microorganisms that help improve nutrient availability and soil health, supporting sustainable agriculture." },
  { slug: "edta-chelates", name: "EDTA Chelates", color: "#1F8A70", description: "EDTA chelates bind micronutrients to improve their stability and solubility, helping plants absorb and utilise them efficiently." },
  { slug: "micronutrient-mixture-fertilizers", name: "Micronutrient Mixture Fertilizers", color: "#6AA121", description: "Blends of essential trace elements that plants need in small amounts for balanced growth, quality and yield." },
  { slug: "natural-biostimulants", name: "Natural Biostimulants", color: "#8E4A9E", description: "Natural biostimulants support plant vigour, stress tolerance and nutrient use efficiency alongside regular crop nutrition." },
  { slug: "non-ionic-spray-adjuvant", name: "Non Ionic Spray Adjuvant", color: "#2F6FB5", description: "Spray adjuvants help improve spreading and coverage of foliar sprays on the crop surface." },
  { slug: "water-soluble-fertilizers", name: "Water Soluble Fertilizers", color: "#D9742B", description: "Fully water soluble fertilizers suitable for fertigation and foliar feeding programmes." },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);