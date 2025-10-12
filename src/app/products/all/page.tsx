import AllProducts from "@/components/AllProducts/AllProducts";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SearchField from "@/components/ProductListing/SearchField";

export const metadata = {
  title: "All Products - Medicart",
  description: "Browse all available medications and health products",
};

export default function AllProductsPage() {
  return (
    <div className="min-h-screen bg-[#004D4A] flex flex-col">
      <Navbar />
      <SearchField />
      <AllProducts />
      <Footer />
    </div>
  );
}