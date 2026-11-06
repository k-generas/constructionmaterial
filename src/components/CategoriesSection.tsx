import React from "react";
import { ArrowRight, Package, Mountain, Layers, Trees, Boxes, Home, Hammer, Wrench } from "lucide-react";
import { PRODUCT_CATEGORIES } from "../data/catalog.ts";
import type { ProductCategory } from "../types.ts";

interface CategoriesSectionProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const getIcon = (slug: string) => {
    switch (slug) {
      case "cement":
        return <Package className="w-5 h-5" />;
      case "sand-aggregates":
        return <Mountain className="w-5 h-5" />;
      case "gravel-stone":
        return <Layers className="w-5 h-5" />;
      case "timber-poles":
        return <Trees className="w-5 h-5" />;
      case "concrete-blocks":
        return <Boxes className="w-5 h-5" />;
      case "roofing-sheets":
        return <Home className="w-5 h-5" />;
      case "structural-steel":
        return <Hammer className="w-5 h-5" />;
      case "plumbing-hardware":
        return <Wrench className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-100/70 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Materials Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Essential Construction Supply Categories
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Provisional catalog of verified building materials available for walk-in counter sales and scheduled contractor deliveries across Kigali.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory("all")}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View All Materials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCT_CATEGORIES.map((cat: ProductCategory) => (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-amber-500/60 dark:hover:border-amber-400/50 hover:bg-amber-50/20 dark:hover:bg-slate-900/90 text-left transition-all duration-200 group flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  {getIcon(cat.slug)}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-300">
                <span className="font-medium">Browse Materials</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
