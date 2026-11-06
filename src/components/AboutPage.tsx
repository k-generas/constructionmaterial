import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  ShieldCheck,
  Building2,
  Clock,
  Truck,
  CheckCircle2,
  Info
} from "lucide-react";
import { BUSINESS_INFO } from "../types.ts";

interface AboutPageProps {
  onRequestQuote: () => void;
  onExploreCatalog: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onRequestQuote, onExploreCatalog }) => {
  return (
    <div className="py-8 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          Store Information &amp; Verified Facts
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
          About Construction and Materials supply
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Building Materials Store established in Kigali, Rwanda. Providing genuine construction materials to commercial contractors, engineers, and individual residential home builders.
        </p>
      </div>

      {/* Main Grid: Business Profile & Evidence */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Business Overview (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs transition-colors duration-200">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-500" />
              <span>Who We Are</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Construction and Materials supply</strong> is a local hardware and building supplies supplier located in Kigali, Rwanda. We specialize in stocking certified construction essentials directly suited for structural engineering, residential construction, and renovation works.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Our core inventory encompasses structural Portland cement (CEM II 32.5R &amp; CEM I 42.5N), high-tensile ribbed steel rebar (Fer à béton), dimensional construction timber, eucalyptus scaffolding poles, sand and quarry aggregates, concrete hollow blocks, and corrugated roofing sheets.
            </p>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Our Operational Principles
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fair &amp; Verified Quotations:</strong> We do not publish artificial discount sales or invented prices; every client receives up-to-date market rates.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Reliable Kigali Site Logistics:</strong> Transport arrangements directly to your foundation, slab, or framing site.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Trade Counter &amp; Direct Phone Support:</strong> Direct communication with knowledgeable local store staff.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Review Status Transparency Card */}
          <div className="bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
              <Info className="w-4 h-4" />
              <span>Transparent Public Listing Policy</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our Google Maps profile is a new business listing with 0 reviews and null rating. We strictly decline publishing fabricated 5-star testimonials or unverified customer statistics. We invite builders in Kigali to test our material standards directly.
            </p>
          </div>
        </div>

        {/* Right Column: Verified Details & Location Card (5 cols) */}
        <div className="md:col-span-5 space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-xs space-y-5 shadow-xs transition-colors duration-200">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Verified Business Directory Information</span>
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Business Name</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{BUSINESS_INFO.name}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Business Category</span>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{BUSINESS_INFO.category}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Location</span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{BUSINESS_INFO.location}</span>
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Direct Telephone</span>
                <a
                  href={`tel:${BUSINESS_INFO.phone_raw}`}
                  className="text-xs font-mono font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Official Email</span>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center gap-1.5 mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Operating Schedule</span>
                <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{BUSINESS_INFO.operating_hours}</span>
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <a
                href={BUSINESS_INFO.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
              >
                <span>View Google Maps Pin</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
              </a>

              <a
                href={BUSINESS_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
              >
                <span>Existing Webnode Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-500" />
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRequestQuote}
              className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-xs text-center"
            >
              Request Quotation
            </button>
            <button
              onClick={onExploreCatalog}
              className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer text-center"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
