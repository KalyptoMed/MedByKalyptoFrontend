import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductListing from "@/components/ProductListing/ProductDetails";
import SearchField from "@/components/ProductListing/SearchField";

export default function Productlisting() {
  return (
    <div className="h-screen-full pt-4 bg-[#004d4a] flex flex-col">
      <Navbar />
      <SearchField />
      <ProductListing />
      <Footer />
    </div>
  );
}
