import { categories, getCategory } from "./categories.js";

// All product text below is PLACEHOLDER. Replace with real, approved product data.
const defaults = {
  benefits: [
    "High nutrient availability",
    "Improved plant growth",
    "Better nutrient absorption",
    "Supports crop development",
    "Suitable for multiple crops",
  ],
  uses: [
    "Foliar application during active crop growth stages",
    "Soil application as part of a crop nutrition programme",
    "Drip irrigation / fertigation where suitable",
  ],
  dosage: [
    { application: "Foliar Spray", dosage: "To be updated", method: "Foliar" },
    { application: "Soil Application", dosage: "To be updated", method: "Soil" },
    { application: "Drip Irrigation", dosage: "To be updated", method: "Drip" },
  ],
  dosageNote: "Dosage information will be updated according to product specifications.",
  crops: ["Cereals", "Vegetables", "Fruits", "Pulses", "Oilseeds", "Cash Crops"],
  technical: [
    { label: "Composition", value: "To be updated" },
    { label: "Form", value: "To be updated" },
    { label: "Solubility", value: "To be updated" },
    { label: "Nutrient Content", value: "To be updated" },
    { label: "Packaging", value: "To be updated" },
  ],
};

const make = (slug, name, category, shortDescription, description) => {
  const cat = getCategory(category);
  if (!cat) {
    throw new Error(`Unknown category "${category}" for product "${slug}". Check the slug in categories.js.`);
  }
  return {
    id: slug,
    slug,
    name,
    category,
    image: `/images/products/${slug}.svg`,
    shortDescription,
    description:
      description ||
      `${name} is part of the NutriCrops range of ${cat.name.toLowerCase()}. This is placeholder text - replace it with the approved product description, composition and usage details.`,
    ...defaults,
  };
};

export const products = [
  make("release-calcium", "Release Calcium", "edta-chelates", "Chelated calcium to support cell wall strength and crop quality."),
  make("release-magnesium", "Release Magnesium", "edta-chelates", "Chelated magnesium to support chlorophyll formation and healthy leaves."),
  make("release-zinc", "Release Zinc", "edta-chelates", "Chelated zinc to support enzyme activity and early crop growth."),
  make("release-iron", "Release Iron", "edta-chelates", "Chelated iron to help correct iron deficiency in crops."),
  make("release-copper", "Release Copper", "edta-chelates", "Chelated copper to support plant metabolism and development."),
  make("release-manganese", "Release Manganese", "edta-chelates", "Chelated manganese to support photosynthesis and crop vigour."),
  make("amino-chelate-zinc", "Amino Chelate Zinc", "amino-acid-chelates", "Amino acid chelated zinc for efficient nutrient uptake."),
  make("amino-chelate-iron", "Amino Chelate Iron", "amino-acid-chelates", "Amino acid chelated iron for greener, healthier plants."),
  make("bio-fertilizer-consortium", "Bio Fertilizer Consortium", "bio-fertilizers", "Beneficial microbial consortium to improve nutrient availability."),
  make("mycorrhizal-biofertilizer", "Mycorrhizal Biofertilizer", "bio-fertilizers", "Supports a stronger root system and nutrient uptake."),
  make("micronutrient-mix-soil", "Micronutrient Mix - Soil Grade", "micronutrient-mixture-fertilizers", "Balanced trace element blend for soil application."),
  make("micronutrient-mix-foliar", "Micronutrient Mix - Foliar Grade", "micronutrient-mixture-fertilizers", "Balanced trace element blend for foliar sprays."),
  make("seaweed-biostimulant", "Seaweed Biostimulant", "natural-biostimulants", "Natural biostimulant to support plant vigour and stress tolerance."),
  make("humic-biostimulant", "Humic Biostimulant", "natural-biostimulants", "Supports soil structure, root growth and nutrient uptake."),
  make("non-ionic-spray-adjuvant", "Non Ionic Spray Adjuvant", "non-ionic-spray-adjuvant", "Improves spreading and coverage of foliar sprays."),
  make("water-soluble-fertilizer-a", "Water Soluble Fertilizer - Grade A", "water-soluble-fertilizers", "Fully water soluble nutrition for fertigation and foliar use."),
  make("water-soluble-fertilizer-b", "Water Soluble Fertilizer - Grade B", "water-soluble-fertilizers", "Fully water soluble nutrition for balanced crop feeding."),
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (slug) => products.filter((p) => p.category === slug);
export const getRelated = (product, n = 4) =>
  products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => (b.category === product.category) - (a.category === product.category))
    .slice(0, n);
export { categories };