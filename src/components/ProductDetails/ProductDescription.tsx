interface ProductDescriptionProps {
  description: string;
  howToUse: string;
}

export function ProductDescription({ description, howToUse }: ProductDescriptionProps) {
  return (
    <div className="bg-[#EBFFF5] from-blue-100 to-white rounded-3xl p-8 mb-6 shadow-lg w-[90%] mx-auto mt-4">
      <h2 className="text-3xl font-bold text-teal-900 mb-4">Description</h2>
      <p className="text-teal-800 leading-relaxed mb-8">
        {description}
      </p>

      <h2 className="text-3xl font-bold text-teal-900 mb-4">How to use</h2>
      <p className="text-teal-800 leading-relaxed">
        {howToUse}
      </p>
    </div>
  );
}