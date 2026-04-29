"use client";

import { motion } from "framer-motion";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  loading?: boolean;
}

export default function DataTable<T extends { id?: string; _id?: string }>({ columns, data, emptyMessage = "No data found", loading }: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-gray-50 dark:border-gray-800 animate-pulse">
            {columns.map((_, j) => <div key={j} className="h-4 bg-gray-100 dark:bg-gray-800 rounded flex-1" />)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            {columns.map((col) => (
              <th key={String(col.key)} className={`text-left px-4 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide ${col.className ?? ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-gray-400">{emptyMessage}</td>
            </tr>
          ) : (
            data.map((row, i) => (
              <motion.tr
                key={row._id || row.id || i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className={`px-4 py-3 text-gray-700 dark:text-gray-300 ${col.className ?? ""}`}>
                    {col.render ? col.render(row) : String((row as any)[col.key] ?? "-")}
                  </td>
                ))}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
