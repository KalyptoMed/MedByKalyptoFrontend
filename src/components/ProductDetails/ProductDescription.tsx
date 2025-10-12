interface ProductDescriptionProps {
  description: string;
  howToUse: string;
}

export function ProductDescription({ description, howToUse }: ProductDescriptionProps) {
  return (
    <div className="bg-[#EBFFF5] from-blue-100 to-white rounded-3xl p-8 mb-6 shadow-lg w-[90%] mx-auto mt-4">
      <h2 className="text-3xl font-bold text-teal-900 mb-4">Description</h2>
      <p className="text-[#004D4A] leading-relaxed mb-8 text-2xl">
        {description}
      </p>

      <h2 className="text-3xl font-bold text-teal-900 mb-4">How to use</h2>
      <p className="text-[#004D4A] leading-relaxed text-2xl">
        {howToUse}
      </p>
    </div>
  );
}