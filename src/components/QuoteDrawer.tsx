import React from "react";
import { X, Trash2, ArrowRight, ShoppingBag, FileText, Phone } from "lucide-react";
import { BUSINESS_INFO, type QuotationItem } from "../types.ts";

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuotationItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: string) => void;
  onProceedToForm: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToForm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between shadow-2xl transition-colors duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Quotation List ({items.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items Content */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Your quotation list is empty</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Explore our catalog and click "Add to Quote" to build your materials order.
              </p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{item.product_name}</h4>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">Qty:</span>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(index, e.target.value)}
                      className="w-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(index)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Pricing is calculated based on site destination and quantities upon submission.
          </div>

          <button
            disabled={items.length === 0}
            onClick={() => {
              onClose();
              onProceedToForm();
            }}
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Proceed to Quotation Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${BUSINESS_INFO.phone_raw}`}
            className="block text-center text-xs text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            Or Call Directly: <span className="text-amber-600 dark:text-amber-400 font-mono font-semibold">{BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
