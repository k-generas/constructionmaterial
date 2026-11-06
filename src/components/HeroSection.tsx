import React from "react";
import { ArrowRight, Phone, Truck, ShieldCheck, MapPin, Layers } from "lucide-react";
import { BUSINESS_INFO } from "../types.ts";

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onRequestQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onRequestQuote
}) => {
  return (
    <div className="relative">
      {/* Main Hero Banner with Generated Photography */}
      <section className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_construction_materials_1793969795237.jpg"
            alt="Construction and Materials supply depot yard in Kigali, Rwanda"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-75 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            {/* Location & Category kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kigali, Rwanda • Building Materials Store</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight mb-5" style={{ textWrap: "balance" }}>
              Quality Construction &amp; Building Materials Sourced for Your Project
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Direct supplier for certified Portland cement, structural steel rebar, construction timber, aggregates, concrete blocks, and corrugated roofing sheets. Serving commercial contractors and private builders across Kigali.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onRequestQuote}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Material Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <Layers className="w-4 h-4 text-amber-400" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone_raw}`}
                className="px-4 py-3 rounded-xl text-slate-300 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors ml-auto sm:ml-0"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Evidence & Operational Strip */}
      <section className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Site Delivery Across Kigali
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Scheduled tipper and flatbed truck transport to job sites across Nyarugenge, Gasabo &amp; Kicukiro.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Retail &amp; Bulk Contractor Supply
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Walk-in counter sales for individual builders and bulk scheduled orders for multi-stage projects.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Direct Kigali Sales Desk
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Call {BUSINESS_INFO.phone} or submit materials online for fast, accurate price quotations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Verified Local Business
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Genuine building materials store in Kigali, Rwanda. No invented prices or unconfirmed claims.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
