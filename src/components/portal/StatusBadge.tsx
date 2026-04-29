const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
  pending: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  delivered: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  cancelled: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  processing: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  shipped: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400",
  paid: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
  failed: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  approved: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
  suspended: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  draft: "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

export default function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status.toLowerCase()] ?? "bg-gray-50 text-gray-600";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${style}`}>
      {status}
    </span>
  );
}
