import Navbar from "@/Navbar/Navbar";
import Footer from "@/Footer/Footer";
import ProductListing from "@/ProductListing/ProductDetails";
import SearchField from "@/ProductListing/SearchField";

export default function Productlisting() {
  return (
    <div className="h-screen-full pt-4 bg-[#0038FF] flex flex-col">
      <Navbar />
      <SearchField />
      <ProductListing />
      <Footer />
    </div>
  );
}
