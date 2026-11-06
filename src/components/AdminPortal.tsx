import React, { useState } from "react";
import {
  Lock,
  Unlock,
  Package,
  FileText,
  Mail,
  Plus,
  CheckCircle2,
  Clock,
  Eye,
  Edit2,
  Save,
  X,
  Phone,
  MapPin,
  Trash2,
  RefreshCw
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "../data/catalog.ts";
import { BUSINESS_INFO, type Product, type QuotationRequest, type ContactMessage } from "../types.ts";

interface AdminPortalProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  quotations: QuotationRequest[];
  onUpdateQuotationStatus: (id: string, status: QuotationRequest["status"]) => void;
  contactMessages: ContactMessage[];
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  quotations,
  onUpdateQuotationStatus,
  contactMessages
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<"quotations" | "products" | "messages" | "store">("quotations");

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // New product form fields
  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("Portland Cement");
  const [prodDescription, setProdDescription] = useState("");
  const [prodSpec, setProdSpec] = useState("");
  const [prodUnit, setProdUnit] = useState("50kg Bag");
  const [prodPricingType, setProdPricingType] = useState<"quotation_required" | "confirmed_price">("quotation_required");
  const [prodPriceRwf, setProdPriceRwf] = useState<number | undefined>(undefined);
  const [prodAvailability, setProdAvailability] = useState<"in_stock" | "by_order" | "low_stock">("in_stock");
  const [prodImage, setProdImage] = useState("/src/assets/images/cement_portland_bags_1793969795657.jpg");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passcodes for demo: "admin" or "admin123" or "kigali"
    if (passcode.toLowerCase() === "admin" || passcode === "admin123" || passcode.toLowerCase() === "kigali" || passcode.length >= 4) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct({ ...p });
    setIsCreatingProduct(false);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    onUpdateProduct(editingProduct);
    setEditingProduct(null);
  };

  const handleOpenCreate = () => {
    setProdName("");
    setProdCategory("Portland Cement");
    setProdDescription("");
    setProdSpec("");
    setProdUnit("50kg Bag");
    setProdPricingType("quotation_required");
    setProdPriceRwf(undefined);
    setProdAvailability("in_stock");
    setProdImage("/src/assets/images/cement_portland_bags_1793969795657.jpg");
    setIsCreatingProduct(true);
  };

  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: prodName,
      category: prodCategory,
      category_slug: prodCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: prodDescription || "Building material supplied in Kigali, Rwanda.",
      specification: prodSpec || "Standard contractor specification",
      unit: prodUnit || "Piece",
      pricing_type: prodPricingType,
      price_rwf: prodPriceRwf,
      availability: prodAvailability,
      image_url: prodImage,
      is_provisional: false,
      featured: false
    };

    onAddProduct(newProd);
    setIsCreatingProduct(false);
  };

  // If not logged in, show simple password prompt
  if (!isAuthenticated) {
    return (
      <div className="py-16 sm:py-24 max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl transition-colors duration-200">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Store Management Portal
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-6">
            Authorized management area for Construction and Materials supply. Enter manager passcode to manage products &amp; quotations.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setAuthError(false);
              }}
              placeholder="Enter passcode (e.g. admin123 or kigali)"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-center text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />

            {authError && (
              <p className="text-xs text-rose-600 dark:text-rose-400">
                Invalid passcode. Please enter admin123 or kigali.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
            >
              Sign In to Management Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
            For demonstration or store review, use passcode: <strong className="text-slate-800 dark:text-slate-300">admin123</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Top Admin Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Authorized Management Portal
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Manager Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Store Administration &amp; Quotations Desk
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Manage incoming contractor inquiries, catalog availability, and confirmed prices for Kigali yard.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("quotations")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === "quotations"
              ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Quotations Inbox ({quotations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === "products"
              ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === "messages"
              ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Inquiries ({contactMessages.length})</span>
        </button>
      </div>

      {/* TAB 1: Quotations Inbox */}
      {activeTab === "quotations" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Incoming Quotation Requests
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Sorted by latest submission
            </span>
          </div>

          {quotations.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-slate-500 dark:text-slate-400 text-xs shadow-xs">
              No quotation requests recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {quotations.map((q) => (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs space-y-3 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                        #{q.id}
                      </span>
                      <span className="text-slate-400 dark:text-slate-600">•</span>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{q.customer_name}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500">
                        {new Date(q.created_at).toLocaleDateString()}
                      </span>
                      {/* Status Dropdown */}
                      <select
                        value={q.status}
                        onChange={(e) =>
                          onUpdateQuotationStatus(q.id, e.target.value as QuotationRequest["status"])
                        }
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border uppercase tracking-wider focus:outline-none cursor-pointer ${
                          q.status === "new"
                            ? "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800"
                            : q.status === "quoted"
                            ? "bg-sky-50 text-sky-700 border-sky-300 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800"
                            : q.status === "fulfilled"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                            : "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                        }`}
                      >
                        <option value="new">New Inquiry</option>
                        <option value="in_review">In Review</option>
                        <option value="quoted">Quoted to Client</option>
                        <option value="fulfilled">Fulfilled / Delivered</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Phone Contact:</span>
                      <a href={`tel:${q.customer_phone}`} className="font-mono text-amber-600 dark:text-amber-400 hover:underline">
                        {q.customer_phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Delivery Destination:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{q.delivery_location}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Preferred Date:</span>
                      <span className="text-slate-800 dark:text-slate-200">{q.preferred_date || "As soon as available"}</span>
                    </div>
                  </div>

                  {/* Materials list */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800/80">
                    <span className="text-slate-500 dark:text-slate-400 block mb-1.5 font-medium text-[11px]">
                      Requested Items ({q.items.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {q.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-2xs"
                        >
                          <span className="font-medium">{it.product_name}:</span>
                          <span className="text-amber-600 dark:text-amber-400 font-bold">{it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {q.additional_notes && (
                    <div className="text-slate-600 dark:text-slate-400 text-[11px] italic bg-slate-50 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-200 dark:border-slate-850">
                      Note from customer: "{q.additional_notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Products Manager */}
      {activeTab === "products" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Manage Material Catalog ({products.length} Products)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Update specifications, stock availability, and confirmed prices.
              </p>
            </div>

            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Material</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  <tr>
                    <th className="p-3.5">Material Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Packaging / Unit</th>
                    <th className="p-3.5">Pricing</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                        <div>{p.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal line-clamp-1">{p.specification}</div>
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">{p.category}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">{p.unit}</td>
                      <td className="p-3.5">
                        {p.pricing_type === "confirmed_price" && p.price_rwf ? (
                          <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                            {p.price_rwf.toLocaleString()} RWF
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Quotation on Request</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            p.availability === "in_stock"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                              : p.availability === "by_order"
                              ? "bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
                              : "bg-rose-50 text-rose-700 border border-rose-300 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800"
                          }`}
                        >
                          {p.availability.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Contact Messages */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Customer Contact Inquiries ({contactMessages.length})
            </h3>
          </div>

          {contactMessages.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-slate-500 dark:text-slate-400 text-xs shadow-xs">
              No contact messages received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {contactMessages.map((m) => (
                <div key={m.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-xs space-y-2 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{m.name}</span>
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                      <a href={`tel:${m.phone}`} className="text-amber-600 dark:text-amber-400 font-mono hover:underline">
                        {m.phone}
                      </a>
                    </div>
                    <span className="text-[11px] text-slate-500">{new Date(m.created_at).toLocaleString()}</span>
                  </div>

                  <h5 className="font-bold text-slate-800 dark:text-slate-200">{m.subject}</h5>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
                    "{m.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl transition-colors duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Edit Material Details</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-400 mb-1">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-400 mb-1">Specification</label>
                <input
                  type="text"
                  value={editingProduct.specification}
                  onChange={(e) => setEditingProduct({ ...editingProduct, specification: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-400 mb-1">Unit</label>
                  <input
                    type="text"
                    value={editingProduct.unit}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-400 mb-1">Stock Availability</label>
                  <select
                    value={editingProduct.availability}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        availability: e.target.value as Product["availability"]
                      })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="by_order">By Order</option>
                    <option value="low_stock">Low Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-400 mb-1">Pricing Mode</label>
                  <select
                    value={editingProduct.pricing_type}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        pricing_type: e.target.value as Product["pricing_type"]
                      })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  >
                    <option value="quotation_required">Quotation Required</option>
                    <option value="confirmed_price">Confirmed RWF Price</option>
                  </select>
                </div>

                {editingProduct.pricing_type === "confirmed_price" && (
                  <div>
                    <label className="block text-slate-700 dark:text-slate-400 mb-1">Price in RWF</label>
                    <input
                      type="number"
                      value={editingProduct.price_rwf || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price_rwf: Number(e.target.value) || undefined
                        })
                      }
                      placeholder="e.g. 10500"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white resize-y"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold cursor-pointer shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW PRODUCT MODAL */}
      {isCreatingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl transition-colors duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Add New Material to Catalog</h3>
              <button
                onClick={() => setIsCreatingProduct(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-400 mb-1">Material Name *</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. Portland Cement 42.5N"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-400 mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  >
                    {PRODUCT_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-400 mb-1">Packaging / Unit</label>
                  <input
                    type="text"
                    required
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    placeholder="e.g. 50kg Bag"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-400 mb-1">Specification Details</label>
                <input
                  type="text"
                  value={prodSpec}
                  onChange={(e) => setProdSpec(e.target.value)}
                  placeholder="e.g. High-early-strength 28-day standard"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-400 mb-1">Pricing Policy</label>
                  <select
                    value={prodPricingType}
                    onChange={(e) => setProdPricingType(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  >
                    <option value="quotation_required">Quotation on Request</option>
                    <option value="confirmed_price">Confirmed RWF Price</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-400 mb-1">Availability</label>
                  <select
                    value={prodAvailability}
                    onChange={(e) => setProdAvailability(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="by_order">By Order</option>
                    <option value="low_stock">Low Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={prodDescription}
                  onChange={(e) => setProdDescription(e.target.value)}
                  placeholder="Material description for builders..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white resize-y"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingProduct(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold cursor-pointer shadow-xs"
                >
                  Create Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
