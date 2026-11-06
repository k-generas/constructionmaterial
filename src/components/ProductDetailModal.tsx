import React, { useState } from "react";
import { X, Plus, Check, Phone, Info, Package, MapPin } from "lucide-react";
import { BUSINESS_INFO, type Product } from "../types.ts";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
  onRequestQuoteDirect: (product: Product) => void;
  isInQuote?: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  onRequestQuoteDirect,
  isInQuote = false
}) => {
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 transition-colors duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/80 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-slate-100 dark:bg-slate-950 aspect-[4/3] md:aspect-auto h-full min-h-[260px] flex items-center justify-center overflow-hidden">
            {!imgError ? (
              <img
                src={product.image_url}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-slate-400 dark:text-slate-500">
                <Package className="w-12 h-12 text-slate-400 dark:text-slate-600 mb-2" />
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{product.name}</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {product.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications */}
              <div className="mt-5 space-y-2.5 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Packaging / Unit:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{product.unit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Specification:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{product.specification}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Pricing Policy:</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    {product.pricing_type === "confirmed_price" && product.price_rwf
                      ? `${product.price_rwf.toLocaleString()} RWF`
                      : "Quotation on Request"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Delivery Coverage:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Across Kigali &amp; districts</span>
                </div>
              </div>

              {/* Provisional Notice */}
              {product.is_provisional && (
                <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Provisional catalog item. Final grade, brand, and stock batch confirmed upon quote request.
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAddToQuote(product)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isInQuote
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {isInQuote ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Quote List</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Quote List</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onRequestQuoteDirect(product)}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Request Quote Now</span>
                </button>
              </div>

              <a
                href={`tel:${BUSINESS_INFO.phone_raw}`}
                className="w-full py-2 text-center text-xs text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Or inquire directly: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
