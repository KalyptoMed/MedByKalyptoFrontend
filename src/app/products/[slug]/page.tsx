import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SearchField from "@/components/ProductListing/SearchField";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

export default function ProductDetailsPage() {
  return (
    <div className="h-screen-full pt-4 bg-[#004D4A] flex flex-col">
      <Navbar />
          <SearchField />
          <ProductDetails params={{
        slug: ""
      }} />
      <Footer />
    </div>
  );
}