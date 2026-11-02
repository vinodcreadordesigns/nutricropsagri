// CENTRAL COMPANY CONFIG - edit everything about the company here.
export const companyInfo = {
  name: "NutriCrops Agriculture",
  tagline: "Advanced Crop Nutrition & Fertilizer Solutions",
  siteUrl: "https://www.nutricrops.example", // TODO: replace with your real domain
  phone: "", // e.g. "+91 00000 00000"
  email: "", // e.g. "info@yourdomain.com"
  address: "", // full postal address
  whatsapp: "", // digits with country code, e.g. "910000000000"
  workingHours: "", // e.g. "Mon - Sat: 9:30 AM - 6:00 PM"
  mapEmbedUrl: "", // Google Maps "Embed a map" src URL
};

// Leave a URL empty and its icon is hidden automatically.
export const socialLinks = { facebook: "", instagram: "", linkedin: "", youtube: "" };

export const navLinks = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "Company Profile", to: "/about" },
      { label: "Management Team", to: "/about/management-team" },
      { label: "Our History", to: "/about/history" },
    ],
  },
  { label: "Our Products", to: "/products" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

export const footerPolicies = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
  { label: "Shipping & Delivery Policy", to: "/shipping-delivery-policy" },
  { label: "Refund & Cancellation", to: "/refund-cancellation" },
];

// Placeholder numbers - replace with real ones.
export const stats = [
  { value: 20, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Products" },
  { value: 100, suffix: "+", label: "Crop Solutions" },
  { value: 10000, suffix: "+", label: "Farmers Served" },
];

export const aboutPoints = [
  "Agriculture expertise focused on plant nutrition",
  "Quality-driven manufacturing and product consistency",
  "Innovation through continuous research",
  "Farmer-focused, sustainable agriculture solutions",
];

export const whyChoose = [
  { icon: "BadgeCheck", title: "Quality Products", text: "Consistent quality standards across every batch we manufacture." },
  { icon: "FlaskConical", title: "Advanced Nutrition", text: "Formulations designed to improve nutrient availability for crops." },
  { icon: "Microscope", title: "Research & Innovation", text: "Continuous improvement driven by agronomy and field learning." },
  { icon: "Sprout", title: "Farmer Focused", text: "Practical products and guidance built around farmers' needs." },
  { icon: "Headset", title: "Reliable Support", text: "A responsive team to help with product and usage questions." },
  { icon: "Leaf", title: "Sustainable Agriculture", text: "Inputs that support healthier soils and responsible farming." },
];

export const siteMenuPages = [
  { title: "Company Profile", to: "/about", text: "about company vision mission values" },
  { title: "Management Team", to: "/about/management-team", text: "management leadership team" },
  { title: "Our History", to: "/about/history", text: "history timeline journey" },
  { title: "Our Products", to: "/products", text: "products catalogue range" },
  { title: "Gallery", to: "/gallery", text: "gallery photos factory events" },
  { title: "Blog", to: "/blog", text: "blog articles news" },
  { title: "Contact Us", to: "/contact", text: "contact enquiry address phone email" },
  { title: "Career", to: "/career", text: "career jobs vacancies" },
];
