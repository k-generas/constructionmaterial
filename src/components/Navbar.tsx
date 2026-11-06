import React from "react";
import { Phone, FileText, Lock, Menu, X, ShoppingBag, Sun, Moon } from "lucide-react";
import { BUSINESS_INFO, type QuotationItem } from "../types.ts";

interface NavbarProps {
  activePage: "home" | "products" | "quote" | "about" | "contact" | "admin";
  setActivePage: (page: "home" | "products" | "quote" | "about" | "contact" | "admin") => void;
  quotationItems: QuotationItem[];
  openQuoteDrawer: () => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  quotationItems,
  openQuoteDrawer,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "products", label: "Materials & Catalog" },
    { id: "quote", label: "Request Quote" },
    { id: "about", label: "About Store" },
    { id: "contact", label: "Contact & Location" }
  ] as const;

  const totalQuoteQuantity = quotationItems.length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xs transition-colors duration-200">
      {/* Top informational bar */}
      <div className="bg-slate-100 dark:bg-slate-950 px-4 py-1.5 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-slate-800 dark:text-slate-300 font-medium">Building Materials Store in Kigali, Rwanda</span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-600 dark:text-slate-400">{BUSINESS_INFO.operating_hours}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${BUSINESS_INFO.phone_raw}`}
              className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <a
              href={BUSINESS_INFO.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold transition-colors"
            >
              Google Maps Location
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar - strict 3-zone layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            setActivePage("home");
            setMobileMenuOpen(false);
          }}
          className="text-left whitespace-nowrap shrink-0 group flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-xs">
            C
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white block group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Construction and Materials supply
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block -mt-0.5 tracking-wider uppercase font-semibold">
              Kigali Building Supplies Depot
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                activePage === link.id
                  ? "text-amber-600 dark:text-amber-400 border-b-2 border-amber-600 dark:border-amber-400 font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action, Theme Switcher & Quotation Tray */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Light / Dark Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode (White Color)"}
            aria-label="Toggle Color Theme"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span className="hidden sm:inline text-xs font-semibold">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline text-xs font-semibold">White</span>
              </>
            )}
          </button>

          {/* Quotation item counter button */}
          <button
            onClick={openQuoteDrawer}
            className="relative px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="View Selected Quotation Items"
          >
            <ShoppingBag className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Quote List</span>
            {totalQuoteQuantity > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold flex items-center justify-center ml-0.5 shadow-xs">
                {totalQuoteQuantity}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => setActivePage("quote")}
            className="px-3.5 sm:px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Quote</span>
          </button>

          {/* Admin link button */}
          <button
            onClick={() => setActivePage("admin")}
            title="Store Admin Management Portal"
            className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
              activePage === "admin"
                ? "bg-slate-200 dark:bg-slate-700 text-amber-600 dark:text-amber-400 border border-amber-500/40"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2 transition-colors">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activePage === link.id
                  ? "bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Direct Call: {BUSINESS_INFO.phone}</span>
            <button
              onClick={() => {
                setActivePage("admin");
                setMobileMenuOpen(false);
              }}
              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
            >
              Store Management
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
