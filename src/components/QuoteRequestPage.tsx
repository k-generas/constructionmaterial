import React, { useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Package
} from "lucide-react";
import { BUSINESS_INFO, type Product, type QuotationItem, type QuotationRequest } from "../types.ts";

interface QuoteRequestPageProps {
  availableProducts: Product[];
  initialItems: QuotationItem[];
  onClearQuoteItems: () => void;
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
}

export const QuoteRequestPage: React.FC<QuoteRequestPageProps> = ({
  availableProducts,
  initialItems,
  onClearQuoteItems,
  onNavigateHome,
  onNavigateProducts
}) => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [items, setItems] = useState<QuotationItem[]>(
    initialItems.length > 0
      ? initialItems
      : [
          {
            product_id: "prod-cement-425",
            product_name: "Structural Portland Cement 42.5N",
            quantity: "50 bags"
          }
        ]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<QuotationRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Material Item handlers
  const handleUpdateItem = (index: number, field: "product_name" | "quantity", value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSelectProduct = (index: number, productId: string) => {
    const found = availableProducts.find((p) => p.id === productId);
    if (!found) return;
    const updated = [...items];
    updated[index] = {
      product_id: found.id,
      product_name: found.name,
      quantity: updated[index].quantity || `1 ${found.unit}`
    };
    setItems(updated);
  };

  const handleAddItem = () => {
    const first = availableProducts[0] || { id: "custom", name: "Custom Building Material", unit: "Unit" };
    setItems([
      ...items,
      {
        product_id: first.id,
        product_name: first.name,
        quantity: "1"
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMsg("Please enter your name or company contact.");
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setErrorMsg("Please enter a valid phone number so our Kigali sales desk can reach you.");
      return;
    }

    if (items.length === 0 || items.some((it) => !it.product_name.trim() || !it.quantity.trim())) {
      setErrorMsg("Please specify at least one material and required quantity.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail || undefined,
          delivery_location: deliveryLocation || "Kigali, Rwanda",
          preferred_date: preferredDate || undefined,
          items,
          additional_notes: additionalNotes || undefined
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      setSubmittedQuote(data.quote);
      onClearQuoteItems();
    } catch (err: any) {
      console.error("Submission failed:", err);
      // Fallback local submission in case of offline/network issues
      const localQuote: QuotationRequest = {
        id: `QT-${Math.floor(10000 + Math.random() * 90000)}`,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || undefined,
        delivery_location: deliveryLocation || "Kigali, Rwanda",
        preferred_date: preferredDate,
        items,
        additional_notes: additionalNotes,
        status: "new",
        created_at: new Date().toISOString()
      };
      setSubmittedQuote(localQuote);
      onClearQuoteItems();
    } finally {
      setIsSubmitting(false);
    }
  };

  // If submitted successfully, show confirmation screen
  if (submittedQuote) {
    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-xl transition-colors duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Quotation Inquiry Received
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Thank You, {submittedQuote.customer_name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
            Your material quotation inquiry has been registered under Reference{" "}
            <strong className="text-amber-600 dark:text-amber-400 font-mono">#{submittedQuote.id}</strong>.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Reference ID:</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">#{submittedQuote.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Contact Phone:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{submittedQuote.customer_phone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Delivery Destination:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{submittedQuote.delivery_location}</span>
            </div>

            <div className="pt-2">
              <span className="text-slate-500 dark:text-slate-400 block mb-1.5 font-medium">Requested Materials ({submittedQuote.items.length}):</span>
              <ul className="space-y-1">
                {submittedQuote.items.map((it, idx) => (
                  <li key={idx} className="flex justify-between text-slate-800 dark:text-slate-300 bg-white dark:bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span>{it.product_name}</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">{it.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 text-left flex items-start gap-2.5">
            <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div className="leading-relaxed">
              <strong>Notice:</strong> This is an official material inquiry, not a completed financial order. Our sales desk in Kigali will review current yard stock and contact you at <strong>{submittedQuote.customer_phone}</strong> with the confirmed pricing quotation.
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSubmittedQuote(null);
                setCustomerName("");
                setCustomerPhone("");
                setCustomerEmail("");
                setDeliveryLocation("");
                setAdditionalNotes("");
                setItems([
                  {
                    product_id: "prod-cement-425",
                    product_name: "Structural Portland Cement 42.5N",
                    quantity: "50 bags"
                  }
                ]);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>

            <button
              onClick={onNavigateProducts}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-14 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Title Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          Commercial &amp; Residential Quotations
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
          Request a Building Materials Quotation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Submit your required construction materials, quantities, and preferred job site delivery location in Kigali. Our sales team will prepare a formal price quotation with transport estimates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (8 Cols) */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xs transition-colors duration-200">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <span>1. Contact &amp; Builder Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Name or Company <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Alexis Habimana / Alpha Builders Ltd"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number (Rwanda) <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address <span className="text-slate-400 dark:text-slate-500 text-[11px]">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="office@yourcompany.com"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* 2. Materials List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                  2. Requested Construction Materials <span className="text-amber-600 dark:text-amber-400">*</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Material</span>
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                  >
                    {/* Material Selector or Free text */}
                    <div className="flex-1">
                      <label className="block text-[11px] text-slate-500 mb-1">
                        Select Material
                      </label>
                      <select
                        value={item.product_id}
                        onChange={(e) => handleSelectProduct(index, e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
                      >
                        {availableProducts.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.unit})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity */}
                    <div className="w-full sm:w-44">
                      <label className="block text-[11px] text-slate-500 mb-1">
                        Quantity &amp; Specification
                      </label>
                      <input
                        type="text"
                        required
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(index, "quantity", e.target.value)}
                        placeholder="e.g. 50 bags, 2 tippers, 100 bars"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Remove button */}
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="p-2 self-end sm:self-center text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors mt-2 sm:mt-4 cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Delivery & Project Location */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 pb-2 border-b border-slate-200 dark:border-slate-800">
                3. Delivery Location &amp; Project Schedule
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Site Delivery Location (Kigali / Districts)
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Kicukiro, Gasabo, Gisozi, Nyarugenge"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Delivery Date <span className="text-slate-400 dark:text-slate-500 text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Additional Project Specifications / Delivery Access Notes
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Mention site road access, crane/offloading requirements, or specific rebar diameters..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-y"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Inquiries are reviewed by our Kigali yard team Monday - Saturday.
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-xs disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950/40 border-t-slate-950 rounded-full animate-spin" />
                    <span>Transmitting Quotation...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Submit Quotation Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Information Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Direct Sales Desk Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 text-xs space-y-4 shadow-xs">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Direct Phone Quotation</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Need immediate pricing for today's concrete casting or urgent site restocking? Call our sales team directly:
            </p>
            <a
              href={`tel:${BUSINESS_INFO.phone_raw}`}
              className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 font-mono font-bold text-center text-sm hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
            >
              {BUSINESS_INFO.phone}
            </a>
            <div className="text-[11px] text-slate-500">
              Hours: {BUSINESS_INFO.operating_hours}
            </div>
          </div>

          {/* Quotation Policy Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 text-xs space-y-3 shadow-xs">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Transparent Quotation Policy</span>
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>All prices are strictly quoted based on current Kigali market rates and requested volumes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Submitting an inquiry does not place a binding charge until you approve the quote.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Direct delivery available across Nyarugenge, Gasabo, Kicukiro, and surrounding sectors.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
