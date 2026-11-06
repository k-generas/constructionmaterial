import React from "react";
import { ArrowRight, Package } from "lucide-react";
import { ProductCard } from "./ProductCard.tsx";
import type { Product, QuotationItem } from "../types.ts";

interface FeaturedProductsSectionProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  quotationItems: QuotationItem[];
  onViewAllProducts: () => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  onOpenDetails,
  onAddToQuote,
  quotationItems,
  onViewAllProducts
}) => {
  const quoteProductIds = React.useMemo(() => {
    return new Set(quotationItems.map((item) => item.product_id));
  }, [quotationItems]);

  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Contractor Core Supplies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Featured Construction Materials
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              High-demand structural essentials ready for immediate trade counter pickup or scheduled truckload site delivery in Kigali.
            </p>
          </div>

          <button
            onClick={onViewAllProducts}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All {products.length} Materials</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenDetails={onOpenDetails}
              onAddToQuote={onAddToQuote}
              isInQuote={quoteProductIds.has(prod.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
