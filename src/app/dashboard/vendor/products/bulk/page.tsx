"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, Plus, Trash2, Save, AlertCircle } from "lucide-react";
import Papa from "papaparse";
import { useMyProducts, useBulkUpdateProducts, useBulkDeleteProducts, type ApiProduct } from "@/hooks/product.hooks";

const CATEGORIES = ["Antibiotics", "Anti-Malarial", "Anti-Diabetics", "Antacids", "Vitamins", "Pain Relief", "Other"];
const STATUSES = ["active", "draft", "out_of_stock"];

type Row = {
  id: string;
  name: string;
  category: string;
  price: string;
  comparePrice: string;
  stock: string;
  sku: string;
  status: string;
  _dirty?: boolean;
  _new?: boolean;
};

const COLUMNS: { key: keyof Omit<Row, "id" | "_dirty" | "_new">; header: string; width: string; type?: string }[] = [
  { key: "name", header: "Product Name", width: "w-52", type: "text" },
  { key: "category", header: "Category", width: "w-36", type: "select" },
  { key: "sku", header: "SKU", width: "w-32", type: "text" },
  { key: "price", header: "Price (₦)", width: "w-28", type: "number" },
  { key: "comparePrice", header: "Compare (₦)", width: "w-28", type: "number" },
  { key: "stock", header: "Stock", width: "w-24", type: "number" },
  { key: "status", header: "Status", width: "w-32", type: "select" },
];

let counter = 10000;

function toRow(p: ApiProduct): Row {
  return {
    id: p._id,
    name: p.name,
    category: p.category ?? "",
    price: String(p.price),
    comparePrice: p.comparePrice ? String(p.comparePrice) : "",
    stock: String(p.stock),
    sku: p.sku ?? "",
    status: p.status,
  };
}

export default function BulkEditorPage() {
  const { data, isLoading } = useMyProducts(1, 100);
  const { mutate: bulkSave, isPending: saving } = useBulkUpdateProducts();
  const { mutate: bulkDelete } = useBulkDeleteProducts();

  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [importError, setImportError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.items) setRows(data.items.map(toRow));
  }, [data]);

  const update = useCallback((id: string, key: keyof Row, value: string) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, [key]: value, _dirty: true } : r));
  }, []);

  const addRow = () => {
    const id = `new-${counter++}`;
    setRows((prev) => [...prev, { id, name: "", category: "", price: "", comparePrice: "", stock: "", sku: "", status: "draft", _new: true, _dirty: true }]);
  };

  const toggleSelect = (id: string) => setSelected((prev) => { const n = new Set(prev); if (n.has(id)) { n.delete(id); } else { n.add(id); } return n; });
  const toggleAll = () => setSelected(selected.size === rows.length ? new Set() : new Set(rows.map((r) => r.id)));

  const handleDelete = () => {
    const existingIds = Array.from(selected).filter((id) => !id.startsWith("new-"));
    const newIds = Array.from(selected).filter((id) => id.startsWith("new-"));
    setRows((prev) => prev.filter((r) => !newIds.includes(r.id)));
    if (existingIds.length) bulkDelete(existingIds, { onSuccess: () => setRows((prev) => prev.filter((r) => !existingIds.includes(r.id))) });
    setSelected(new Set());
  };

  const handleSave = () => {
    const dirty = rows.filter((r) => r._dirty && !r._new);
    if (!dirty.length) return;
    const updates = dirty.map((r) => ({
      id: r.id,
      data: { name: r.name, category: r.category, price: Number(r.price), comparePrice: r.comparePrice ? Number(r.comparePrice) : undefined, stock: Number(r.stock), sku: r.sku, status: r.status },
    }));
    bulkSave(updates, { onSuccess: () => setRows((prev) => prev.map((r) => ({ ...r, _dirty: false, _new: false }))) });
  };

  const exportCSV = () => {
    const csv = Papa.unparse(rows.map(({ id: _id, _dirty, _new, ...rest }) => rest));
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "products-bulk.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const importCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError("");
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data: parsed, errors }) => {
        if (errors.length) { setImportError("CSV parse error — check your file format."); return; }
        const required = ["name", "price", "stock"];
        const missing = required.filter((k) => !Object.keys(parsed[0] ?? {}).includes(k));
        if (missing.length) { setImportError(`Missing columns: ${missing.join(", ")}`); return; }
        const imported: Row[] = parsed.map((row) => ({ id: `new-${counter++}`, name: row.name ?? "", category: row.category ?? "", price: row.price ?? "", comparePrice: row.comparePrice ?? "", stock: row.stock ?? "", sku: row.sku ?? "", status: row.status ?? "draft", _dirty: true, _new: true }));
        setRows((prev) => [...prev, ...imported]);
      },
    });
    e.target.value = "";
  };

  const dirtyCount = rows.filter((r) => r._dirty && !r._new).length;

  if (isLoading) return <div className="flex justify-center py-20"><span className="w-8 h-8 border-2 border-[#004D4A]/20 border-t-[#004D4A] rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <motion.button whileTap={{ scale: 0.95 }} onClick={addRow}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#004D4A] text-[#D0FF71] text-sm font-bold hover:bg-[#006B67] transition">
          <Plus size={15} /> Add Row
        </motion.button>
        {selected.size > 0 && (
          <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileTap={{ scale: 0.95 }} onClick={handleDelete}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition">
            <Trash2 size={15} /> Delete ({selected.size})
          </motion.button>
        )}
        <div className="ml-auto flex items-center gap-2">
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={importCSV} />
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-[#004D4A] hover:text-[#004D4A] transition">
            <Upload size={14} /> Import CSV
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={exportCSV}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-[#004D4A] hover:text-[#004D4A] transition">
            <Download size={14} /> Export CSV
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSave} disabled={dirtyCount === 0 || saving}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition ${dirtyCount > 0 ? "bg-[#004D4A] text-[#D0FF71] hover:bg-[#006B67]" : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"}`}>
            {saving ? <span className="w-4 h-4 border-2 border-[#D0FF71]/40 border-t-[#D0FF71] rounded-full animate-spin" /> : <><Save size={14} /> Save {dirtyCount > 0 ? `(${dirtyCount})` : ""}</>}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {importError && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 text-sm font-medium">
            <AlertCircle size={16} /> {importError}
          </motion.div>
        )}
        {dirtyCount > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-sm font-medium">
            <AlertCircle size={15} /> {dirtyCount} unsaved change{dirtyCount > 1 ? "s" : ""}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="px-3 py-3 w-10">
                <input type="checkbox" checked={selected.size === rows.length && rows.length > 0} onChange={toggleAll} className="rounded accent-[#004D4A]" />
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide w-8">#</th>
              {COLUMNS.map((col) => (
                <th key={col.key} className={`px-2 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide ${col.width}`}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((row, i) => (
                <motion.tr key={row.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18, delay: i < 10 ? i * 0.02 : 0 }}
                  className={`border-b border-gray-50 dark:border-gray-800/50 transition-colors ${selected.has(row.id) ? "bg-[#004D4A]/5 dark:bg-[#004D4A]/10" : row._dirty ? "bg-yellow-50/40 dark:bg-yellow-900/10" : ""}`}>
                  <td className="px-3 py-2">
                    <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleSelect(row.id)} className="rounded accent-[#004D4A]" />
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-400 font-mono">{i + 1}</td>
                  {COLUMNS.map((col) => (
                    <td key={col.key} className={`px-2 py-1.5 ${col.width}`}>
                      {col.type === "select" ? (
                        <select value={(row as any)[col.key]} onChange={(e) => update(row.id, col.key, e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-transparent bg-transparent text-sm focus:outline-none focus:border-[#004D4A] focus:bg-white dark:focus:bg-gray-800 dark:text-gray-200 hover:border-gray-200 dark:hover:border-gray-700 transition cursor-pointer">
                          <option value="">— select —</option>
                          {(col.key === "category" ? CATEGORIES : STATUSES).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input type={col.type ?? "text"} value={(row as any)[col.key]}
                          onChange={(e) => update(row.id, col.key, e.target.value)}
                          placeholder={col.type === "number" ? "0" : "—"}
                          className="w-full px-2 py-1.5 rounded-lg border border-transparent bg-transparent text-sm focus:outline-none focus:border-[#004D4A] focus:bg-white dark:focus:bg-gray-800 dark:text-gray-200 hover:border-gray-200 dark:hover:border-gray-700 transition placeholder:text-gray-300" />
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {rows.length === 0 && <p className="py-16 text-center text-gray-400 text-sm">No products yet. Add a row or import a CSV.</p>}
      </div>
      <p className="text-xs text-gray-400 text-right">{rows.length} product{rows.length !== 1 ? "s" : ""} · Click any cell to edit</p>
    </div>
  );
}
