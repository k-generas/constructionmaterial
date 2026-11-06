import React from "react";
import { Phone, FileText, Lock, Menu, X, ShoppingBag, Sun, Moon, ChevronDown } from "lucide-react";
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
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (dropdownOpen || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, mobileMenuOpen]);

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
      <div className="bg-slate-100 dark:bg-slate-950 px-3 sm:px-4 py-1.5 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-slate-800 dark:text-slate-300 font-medium text-[10px] sm:text-xs">Building Materials Store in Kigali, Rwanda</span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-600 dark:text-slate-400">{BUSINESS_INFO.operating_hours}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px]">
            <a
              href={`tel:${BUSINESS_INFO.phone_raw}`}
              className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1 sm:gap-1.5"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span className="hidden sm:inline">Call: {BUSINESS_INFO.phone}</span>
              <span className="sm:hidden">{BUSINESS_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-600">|</span>
            <a
              href={BUSINESS_INFO.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">Google Maps Location</span>
              <span className="sm:hidden">Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar - responsive layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Logo/Wordmark */}
        <button
          onClick={() => {
            setActivePage("home");
            setMobileMenuOpen(false);
          }}
          className="text-left whitespace-nowrap shrink-0 group flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">
            C
          </div>
          <div className="hidden md:block">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white block group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Construction and Materials supply
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block -mt-0.5 tracking-wider uppercase font-semibold">
              Kigali Building Supplies Depot
            </span>
          </div>
          <div className="md:hidden">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white block group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
              Construction & Materials
            </span>
          </div>
        </button>

        {/* Zone 2: Desktop Navigation Links (xl screens only) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
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

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Theme Switcher - visible on md and up */}
          <button
            onClick={onToggleTheme}
            className="hidden md:flex p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer items-center gap-1.5"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode (White Color)"}
            aria-label="Toggle Color Theme"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span className="text-xs font-semibold">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold">White</span>
              </>
            )}
          </button>

          {/* Quote List - visible on lg and up */}
          <button
            onClick={openQuoteDrawer}
            className="hidden lg:flex relative px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-medium items-center gap-1.5 transition-colors cursor-pointer"
            title="View Selected Quotation Items"
          >
            <ShoppingBag className="w-4 h-4 text-amber-500" />
            <span>Quote List</span>
            {totalQuoteQuantity > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold flex items-center justify-center ml-0.5 shadow-xs">
                {totalQuoteQuantity}
              </span>
            )}
          </button>

          {/* Request Quote CTA - visible on lg and up */}
          <button
            onClick={() => setActivePage("quote")}
            className="hidden lg:flex px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Quote</span>
          </button>

          {/* Admin button - visible on lg and up */}
          <button
            onClick={() => setActivePage("admin")}
            title="Store Admin Management Portal"
            className={`hidden lg:flex p-2 rounded-xl text-xs transition-colors cursor-pointer ${
              activePage === "admin"
                ? "bg-slate-200 dark:bg-slate-700 text-amber-600 dark:text-amber-400 border border-amber-500/40"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Medium screen dropdown menu (md to xl) */}
          <div className="hidden md:flex lg:hidden relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" />
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-50 py-2">
                {/* Navigation Links */}
                <div className="px-3 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">Navigation</span>
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActivePage(link.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activePage === link.id
                          ? "bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 font-bold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">Actions</span>
                  
                  {/* Theme toggle for dropdown */}
                  <button
                    onClick={() => {
                      onToggleTheme();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2"
                  >
                    {theme === "light" ? (
                      <>
                        <Moon className="w-4 h-4" />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4" />
                        <span>Light Mode</span>
                      </>
                    )}
                  </button>

                  {/* Quote List for dropdown */}
                  <button
                    onClick={() => {
                      openQuoteDrawer();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                    <span>Quote List</span>
                    {totalQuoteQuantity > 0 && (
                      <span className="ml-auto bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {totalQuoteQuantity}
                      </span>
                    )}
                  </button>

                  {/* Request Quote for dropdown */}
                  <button
                    onClick={() => {
                      setActivePage("quote");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Request Quote</span>
                  </button>

                  {/* Admin for dropdown */}
                  <button
                    onClick={() => {
                      setActivePage("admin");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Admin Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle (small screens) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2 transition-colors">
          {/* Navigation Links */}
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

          {/* Actions Section */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">Actions</span>
            
            {/* Theme toggle */}
            <button
              onClick={() => {
                onToggleTheme();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                </>
              )}
            </button>

            {/* Quote List */}
            <button
              onClick={() => {
                openQuoteDrawer();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span>Quote List</span>
              {totalQuoteQuantity > 0 && (
                <span className="ml-auto bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalQuoteQuantity}
                </span>
              )}
            </button>

            {/* Admin */}
            <button
              onClick={() => {
                setActivePage("admin");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Contact Info */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Direct Call: {BUSINESS_INFO.phone}</span>
          </div>
        </div>
      )}
    </header>
  );
};
