import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar.tsx";
import { HeroSection } from "./components/HeroSection.tsx";
import { CategoriesSection } from "./components/CategoriesSection.tsx";
import { FeaturedProductsSection } from "./components/FeaturedProductsSection.tsx";
import { CallToActionSection } from "./components/CallToActionSection.tsx";
import { ProductsPage } from "./components/ProductsPage.tsx";
import { QuoteRequestPage } from "./components/QuoteRequestPage.tsx";
import { QuoteDrawer } from "./components/QuoteDrawer.tsx";
import { ProductDetailModal } from "./components/ProductDetailModal.tsx";
import { AboutPage } from "./components/AboutPage.tsx";
import { ContactPage } from "./components/ContactPage.tsx";
import { AdminPortal } from "./components/AdminPortal.tsx";
import { Footer } from "./components/Footer.tsx";

import { INITIAL_PRODUCTS, INITIAL_QUOTATIONS, INITIAL_CONTACT_MESSAGES } from "./data/catalog.ts";
import type { Product, QuotationItem, QuotationRequest, ContactMessage } from "./types.ts";

export default function App() {
  const [activePage, setActivePage] = useState<"home" | "products" | "quote" | "about" | "contact" | "admin">("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Store data states
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("kgl_products");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [quotations, setQuotations] = useState<QuotationRequest[]>(() => {
    const saved = localStorage.getItem("kgl_quotations");
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem("kgl_messages");
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_MESSAGES;
  });

  // Quotation Tray State
  const [quotationItems, setQuotationItems] = useState<QuotationItem[]>(() => {
    const saved = localStorage.getItem("kgl_quote_items");
    return saved ? JSON.parse(saved) : [];
  });
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

  // Product detail modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Theme state: default to 'light' (clean white background) as requested
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("kgl_theme");
    return (saved as "light" | "dark") || "light";
  });

  // Apply or remove .dark class on <html> root element
  useEffect(() => {
    localStorage.setItem("kgl_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("kgl_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("kgl_quotations", JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem("kgl_messages", JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem("kgl_quote_items", JSON.stringify(quotationItems));
  }, [quotationItems]);

  // Fetch initial data from server API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.log("Using cached products"));

    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        if (data.quotes && Array.isArray(data.quotes)) {
          setQuotations(data.quotes);
        }
      })
      .catch((err) => console.log("Using cached quotes"));

    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.messages && Array.isArray(data.messages)) {
          setContactMessages(data.messages);
        }
      })
      .catch((err) => console.log("Using cached messages"));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Quotation tray actions
  const handleAddToQuote = (product: Product) => {
    const existingIndex = quotationItems.findIndex((it) => it.product_id === product.id);
    if (existingIndex >= 0) {
      showToast(`${product.name} is already in your quotation list.`);
    } else {
      const newItem: QuotationItem = {
        product_id: product.id,
        product_name: product.name,
        quantity: `1 ${product.unit}`
      };
      setQuotationItems([...quotationItems, newItem]);
      showToast(`Added ${product.name} to quotation list.`);
    }
  };

  const handleRemoveQuoteItem = (index: number) => {
    setQuotationItems(quotationItems.filter((_, i) => i !== index));
  };

  const handleUpdateQuoteQuantity = (index: number, quantity: string) => {
    const updated = [...quotationItems];
    updated[index] = { ...updated[index], quantity };
    setQuotationItems(updated);
  };

  const handleClearQuoteItems = () => {
    setQuotationItems([]);
  };

  const handleRequestQuoteDirect = (product: Product) => {
    handleAddToQuote(product);
    setSelectedProduct(null);
    setActivePage("quote");
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug === "all" ? null : slug);
    setActivePage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Admin handlers
  const handleUpdateProduct = (updatedProd: Product) => {
    const next = products.map((p) => (p.id === updatedProd.id ? updatedProd : p));
    setProducts(next);
    // sync with server
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProd)
    }).catch(console.error);
    showToast(`Updated ${updatedProd.name}`);
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts([newProd, ...products]);
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProd)
    }).catch(console.error);
    showToast(`Added ${newProd.name} to catalog`);
  };

  const handleUpdateQuotationStatus = (id: string, status: QuotationRequest["status"]) => {
    const next = quotations.map((q) => (q.id === id ? { ...q, status } : q));
    setQuotations(next);
    fetch("/api/quotes/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    }).catch(console.error);
    showToast(`Quote #${id} marked as ${status}`);
  };

  // Scroll to top on page change
  const navigateTo = (page: "home" | "products" | "quote" | "about" | "contact" | "admin") => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-400/60 text-slate-900 dark:text-slate-100 text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Top Bar with White / Dark theme toggle */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        quotationItems={quotationItems}
        openQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activePage === "home" && (
          <>
            <HeroSection
              onExploreCatalog={() => navigateTo("products")}
              onRequestQuote={() => navigateTo("quote")}
            />
            <CategoriesSection onSelectCategory={handleCategorySelect} />
            <FeaturedProductsSection
              products={products}
              onOpenDetails={(p) => setSelectedProduct(p)}
              onAddToQuote={handleAddToQuote}
              quotationItems={quotationItems}
              onViewAllProducts={() => navigateTo("products")}
            />
            <CallToActionSection
              onRequestQuote={() => navigateTo("quote")}
              onExploreCatalog={() => navigateTo("products")}
            />
          </>
        )}

        {activePage === "products" && (
          <ProductsPage
            products={products}
            selectedCategorySlug={selectedCategory}
            onSelectCategorySlug={setSelectedCategory}
            onOpenDetails={(p) => setSelectedProduct(p)}
            onAddToQuote={handleAddToQuote}
            quotationItems={quotationItems}
            onRequestQuotePage={() => navigateTo("quote")}
          />
        )}

        {activePage === "quote" && (
          <QuoteRequestPage
            availableProducts={products}
            initialItems={quotationItems}
            onClearQuoteItems={handleClearQuoteItems}
            onNavigateHome={() => navigateTo("home")}
            onNavigateProducts={() => navigateTo("products")}
          />
        )}

        {activePage === "about" && (
          <AboutPage
            onRequestQuote={() => navigateTo("quote")}
            onExploreCatalog={() => navigateTo("products")}
          />
        )}

        {activePage === "contact" && <ContactPage />}

        {activePage === "admin" && (
          <AdminPortal
            products={products}
            onUpdateProduct={handleUpdateProduct}
            onAddProduct={handleAddProduct}
            quotations={quotations}
            onUpdateQuotationStatus={handleUpdateQuotationStatus}
            contactMessages={contactMessages}
          />
        )}
      </main>

      {/* Slide-out Quotation Drawer */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quotationItems}
        onRemoveItem={handleRemoveQuoteItem}
        onUpdateQuantity={handleUpdateQuoteQuantity}
        onProceedToForm={() => navigateTo("quote")}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={handleAddToQuote}
        onRequestQuoteDirect={handleRequestQuoteDirect}
        isInQuote={Boolean(selectedProduct && quotationItems.some((it) => it.product_id === selectedProduct.id))}
      />

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
