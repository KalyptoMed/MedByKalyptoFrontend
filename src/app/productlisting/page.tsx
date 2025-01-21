import Navbar from "@/Navbar/Navbar";
import Footer from "@/Footer/Footer";
import ProductListing from "@/ProductListing/ProductDetails";
import SearchField from "@/ProductListing/SearchField";

export default function Productlisting() {
  return (
    <div>
      <Navbar />
      {/* <SearchField /> */}
      <ProductListing />
      <Footer />
    </div>
  );
}
