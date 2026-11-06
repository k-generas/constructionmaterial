import React from "react";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Lock } from "lucide-react";
import { BUSINESS_INFO } from "../types.ts";

interface FooterProps {
  onNavigate: (page: "home" | "products" | "quote" | "about" | "contact" | "admin") => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs sm:text-sm shadow-xs">
                C
              </div>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Construction and Materials supply
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Your trusted partner for building and construction supplies in Kigali, Rwanda. Sourcing certified Portland cement, structural steel rebar, timber, aggregates, blocks, and corrugated roofing sheets.
            </p>
            <div className="text-[10px] sm:text-[11px] text-slate-500 pt-1">
              Category: Building Materials Store • Kigali, Rwanda
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Store Homepage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("products")}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Materials &amp; Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("quote")}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer text-amber-600 dark:text-amber-400 font-semibold"
                >
                  Request a Quotation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  About the Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Contact &amp; Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contacts */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Verified Contacts
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">{BUSINESS_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone_raw}`} className="text-slate-900 dark:text-white font-mono hover:underline font-medium">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white truncate">
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Verified Links & Store Hours */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Official Profiles
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a
                  href={BUSINESS_INFO.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 inline-flex items-center gap-1 sm:gap-1.5 transition-colors font-semibold"
                >
                  <span>Google Maps Listing</span>
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 inline-flex items-center gap-1 sm:gap-1.5 transition-colors"
                >
                  <span>Existing Webnode Site</span>
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </a>
              </li>
              <li className="pt-1 sm:pt-2 text-[10px] sm:text-[11px] text-slate-500">
                Hours: {BUSINESS_INFO.operating_hours}
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admin")}
                  className="mt-1 text-[10px] sm:text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Admin Management Area</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
            <span>
              &copy; {new Date().getFullYear()} Construction and Materials supply. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
            <span>Kigali, Rwanda</span>
            <span>•</span>
            <span>No Unverified Claims</span>
            <span>•</span>
            <span>Delivery Across Kigali</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
