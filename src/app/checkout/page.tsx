import dynamic from "next/dynamic";

const CheckoutClient = dynamic(() => import("@/components/Checkout/CheckoutClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#F8FFFE] pt-20 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#004D4A] border-t-[#D0FF71] rounded-full animate-spin" />
    </div>
  ),
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
