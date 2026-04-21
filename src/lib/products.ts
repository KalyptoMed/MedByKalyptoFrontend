import { Product } from "@/types";

const drugImagePath = "/assets/images/Drug.png";

export const allProducts: Product[] = [
  // ANTIBIOTICS
  { id: "doxycap-100mg", name: "DOXYCAP", description: "Doxycycline 100mg caps (10×10)", price: 2000, originalPrice: 3500, discount: 43, rating: 4, reviewCount: 128, image: drugImagePath, category: "ANTIBIOTICS", brand: "Medicart", genericName: "Doxycycline Hyclate", inStock: true, howToUse: "Take with a full glass of water. Drink plenty of liquids while taking this medicine.", fullDescription: "Doxycycline is a broad-spectrum antibiotic of the tetracycline class used in the treatment of infections caused by bacteria and certain parasites." },
  { id: "amoxil-500mg", name: "AMOXIL", description: "Amoxicillin 500mg (5×20)", price: 1800, originalPrice: 2500, discount: 28, rating: 4, reviewCount: 95, image: drugImagePath, category: "ANTIBIOTICS", brand: "GSK", genericName: "Amoxicillin", inStock: true },
  { id: "ciprofloxacin-500mg", name: "CIPROFLOXACIN", description: "Ciprofloxacin 500mg tabs (10×10)", price: 2500, rating: 4, reviewCount: 76, image: drugImagePath, category: "ANTIBIOTICS", genericName: "Ciprofloxacin", inStock: true },
  { id: "azithromycin-500mg", name: "AZITHROMYCIN", description: "Azithromycin 500mg tabs (3×6)", price: 3200, originalPrice: 4000, discount: 20, rating: 5, reviewCount: 142, image: drugImagePath, category: "ANTIBIOTICS", genericName: "Azithromycin", inStock: true },
  { id: "metronidazole-400mg", name: "METRONIDAZOLE", description: "Metronidazole 400mg tabs (10×10)", price: 1500, rating: 3, reviewCount: 54, image: drugImagePath, category: "ANTIBIOTICS", genericName: "Metronidazole", inStock: true },
  { id: "cephalexin-500mg", name: "CEPHALEXIN", description: "Cephalexin 500mg caps (10×10)", price: 2800, rating: 4, reviewCount: 63, image: drugImagePath, category: "ANTIBIOTICS", genericName: "Cephalexin", inStock: false },

  // ANTI-MALARIAL
  { id: "coartem", name: "COARTEM", description: "Artemether/Lumefantrine tabs", price: 2800, originalPrice: 3200, discount: 13, rating: 5, reviewCount: 210, image: drugImagePath, category: "ANTI-MALARIAL", genericName: "Artemether/Lumefantrine", inStock: true },
  { id: "lonart", name: "LONART", description: "Artemether/Lumefantrine tabs", price: 2600, rating: 4, reviewCount: 88, image: drugImagePath, category: "ANTI-MALARIAL", genericName: "Artemether/Lumefantrine", inStock: true },
  { id: "chloroquine-250mg", name: "CHLOROQUINE", description: "Chloroquine 250mg tabs (10×10)", price: 900, rating: 3, reviewCount: 34, image: drugImagePath, category: "ANTI-MALARIAL", genericName: "Chloroquine Phosphate", inStock: true },

  // ANTI-DIABETICS
  { id: "metformin-500mg", name: "METFORMIN", description: "Metformin 500mg tabs (10×10)", price: 2500, rating: 4, reviewCount: 177, image: drugImagePath, category: "ANTI-DIABETICS", genericName: "Metformin HCl", inStock: true },
  { id: "glimepiride-2mg", name: "GLIMEPIRIDE", description: "Glimepiride 2mg tabs (10×10)", price: 3000, originalPrice: 3800, discount: 21, rating: 4, reviewCount: 92, image: drugImagePath, category: "ANTI-DIABETICS", genericName: "Glimepiride", inStock: true },

  // ANTACIDS
  { id: "omezole-20", name: "OMEZOLE 20", description: "Omeprazole 20mg caps (4×7)", price: 2000, rating: 4, reviewCount: 115, image: drugImagePath, category: "ANTACIDS/ANTI-ULCER", genericName: "Omeprazole", inStock: true },
  { id: "ranitidine-150mg", name: "RANITIDINE", description: "Ranitidine 150mg tabs (10×10)", price: 1500, rating: 3, reviewCount: 48, image: drugImagePath, category: "ANTACIDS/ANTI-ULCER", genericName: "Ranitidine HCl", inStock: true },

  // ANTI-DIARRHOEAL
  { id: "coloseal-caps", name: "COLOSEAL CAPS", description: "Loperamide 2mg caps (10×10)", price: 2000, rating: 4, reviewCount: 67, image: drugImagePath, category: "ANTI-DIARRHOEAL", genericName: "Loperamide", inStock: true },
  { id: "imodium", name: "IMODIUM", description: "Loperamide 2mg caps (6×6)", price: 1800, originalPrice: 2200, discount: 18, rating: 5, reviewCount: 203, image: drugImagePath, category: "ANTI-DIARRHOEAL", genericName: "Loperamide", inStock: true },

  // VITAMINS
  { id: "vitamin-c-1000mg", name: "VITAMIN C", description: "Vitamin C 1000mg tabs (10×10)", price: 3500, rating: 5, reviewCount: 320, image: drugImagePath, category: "VITAMINS/SUPPLEMENTS", genericName: "Ascorbic Acid", inStock: true },
  { id: "multivitamin", name: "MULTIVITAMIN", description: "Complete multivitamin caps (30 caps)", price: 4000, originalPrice: 5000, discount: 20, rating: 5, reviewCount: 285, image: drugImagePath, category: "VITAMINS/SUPPLEMENTS", inStock: true },
];

export const categories = Array.from(new Set(allProducts.map((p) => p.category)));

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.id === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.discount && p.discount > 15).slice(0, 6);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.genericName?.toLowerCase().includes(q)
  );
}
