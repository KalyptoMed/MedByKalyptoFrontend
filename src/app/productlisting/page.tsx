import ProductListing from "@/components/ProductListing/ProductDetails";
import SearchField from "@/components/ProductListing/SearchField";

export default function Productlisting() {
  return (
    <div className="h-screen-full bg-[#004d4a] flex flex-col">
      <SearchField />
      <ProductListing />
    </div>
  );
}
