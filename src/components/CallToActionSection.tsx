import React from "react";
import { FileText, Phone, Truck, MapPin, ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../types.ts";

interface CallToActionSectionProps {
  onRequestQuote: () => void;
  onExploreCatalog: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onRequestQuote,
  onExploreCatalog
}) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-100/60 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-slate-950 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Ready to Supply Your Site?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 leading-tight">
              Get an Accurate Price Quotation for Your Construction Schedule
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Whether you are casting foundation footings in Kicukiro, erecting roof trusses in Gasabo, or managing multi-house development in Nyarugenge, we arrange dependable materials and on-site delivery.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Kigali Site Transport</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Trade Counter Pickup</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{BUSINESS_INFO.phone}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onRequestQuote}
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Request Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone_raw}`}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
