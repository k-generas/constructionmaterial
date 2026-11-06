import React, { useState } from "react";
import { Plus, Check, Eye, Package } from "lucide-react";
import type { Product } from "../types.ts";

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  isInQuote?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToQuote,
  isInQuote = false
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col group shadow-xs hover:shadow-md">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-950 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image_url}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-4 bg-slate-100 dark:bg-slate-950 text-slate-500 text-center">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 dark:text-slate-600 mb-1" />
            <span className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-400">{product.name}</span>
          </div>
        )}

        {/* Quick View Overlay Button */}
        <button
          onClick={() => onOpenDetails(product)}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-xl bg-white/90 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white backdrop-blur-xs border border-slate-200 dark:border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
          title="View Material Specifications"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Subtle Provisional indicator */}
        {product.is_provisional && (
          <div className="absolute bottom-2 left-2 px-1.5 sm:px-2 py-0.5 rounded bg-white/90 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 text-[9px] sm:text-[10px] font-mono border border-slate-200 dark:border-slate-800/80 backdrop-blur-xs">
            Provisional Catalog
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-0.5 sm:mb-1">
            {product.category}
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="text-xs sm:text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Specification */}
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Unit:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{product.unit}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-medium">
              Pricing
            </span>
            <span className="text-[10px] sm:text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-200">
              {product.pricing_type === "confirmed_price" && product.price_rwf
                ? `${product.price_rwf.toLocaleString()} RWF`
                : "Quotation on Request"}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => onAddToQuote(product)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isInQuote
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                  : "bg-slate-100 hover:bg-amber-400 hover:text-slate-950 dark:bg-slate-800 dark:hover:bg-amber-400 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {isInQuote ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Added</span>
                  <span className="sm:hidden">✓</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Add to Quote</span>
                  <span className="sm:hidden">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
