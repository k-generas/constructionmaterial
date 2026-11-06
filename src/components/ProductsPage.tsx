import React, { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, Phone, FileText } from "lucide-react";
import { PRODUCT_CATEGORIES } from "../data/catalog.ts";
import { ProductCard } from "./ProductCard.tsx";
import { BUSINESS_INFO, type Product, type QuotationItem } from "../types.ts";

interface ProductsPageProps {
  products: Product[];
  selectedCategorySlug: string | null;
  onSelectCategorySlug: (slug: string | null) => void;
  onOpenDetails: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  quotationItems: QuotationItem[];
  onRequestQuotePage: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  selectedCategorySlug,
  onSelectCategorySlug,
  onOpenDetails,
  onAddToQuote,
  quotationItems,
  onRequestQuotePage
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesCategory =
        !selectedCategorySlug ||
        selectedCategorySlug === "all" ||
        prod.category_slug === selectedCategorySlug;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q) ||
        prod.specification.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategorySlug, searchQuery]);

  const quoteProductIds = useMemo(() => {
    return new Set(quotationItems.map((item) => item.product_id));
  }, [quotationItems]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Kigali Store Inventory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Construction &amp; Building Materials Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Explore verified construction supplies available for project delivery and walk-in counter sales in Kigali. All pricing is provided via official quotation matching your requested quantity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRequestQuotePage}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>Submit Material List</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="space-y-4 mb-8">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cement, timber, rebar, blocks, roofing..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategorySlug("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              !selectedCategorySlug || selectedCategorySlug === "all"
                ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-xs"
            }`}
          >
            All Materials ({products.length})
          </button>

          {PRODUCT_CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category_slug === cat.slug).length;
            const isSelected = selectedCategorySlug === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategorySlug(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-xs"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75 ml-1">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenDetails={onOpenDetails}
              onAddToQuote={onAddToQuote}
              isInQuote={quoteProductIds.has(prod.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xs">
          <Filter className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Matching Materials Found</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-5">
            We couldn't find items matching "{searchQuery}". Please reset your filters or call our Kigali sales desk directly.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery("");
                onSelectCategorySlug("all");
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone_raw}`}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}

      {/* Custom Material Inquiry Banner */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-colors duration-200">
        <div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
            Special Contractor Sourcing
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            Need Custom Dimensions or Materials Not Listed Above?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            We source custom timber cuts, specific rebar diameters, and bulk quarry aggregates for building projects across Kigali.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={`tel:${BUSINESS_INFO.phone_raw}`}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Call Sales Desk</span>
          </a>

          <button
            onClick={onRequestQuotePage}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Request Custom Quotation
          </button>
        </div>
      </div>
    </div>
  );
};
