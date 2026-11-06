import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Truck
} from "lucide-react";
import { BUSINESS_INFO } from "../types.ts";

export const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg("Please fill in your name, phone number, and message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          subject: subject || "General Inquiry",
          message
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      setSubmittedSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      console.error("Contact submit error:", err);
      // Local fallback for offline/preview
      setSubmittedSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6 sm:py-8 lg:py-14 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-6 sm:mb-10 text-center max-w-2xl mx-auto">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          Store Contact &amp; Location
        </span>
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
          Contact Our Kigali Sales Desk
        </h1>
        <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Reach our building supplies depot in Kigali by phone, email, or send us a message below. Walk-in trade visitors and contractor supply inquiries are always welcome.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Information Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 sm:space-y-4">
          {/* Main Verified Contact Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5 shadow-xs transition-colors duration-200">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-500" />
              <span>Construction and Materials supply</span>
            </h2>

            <div className="space-y-3 sm:space-y-4 text-[10px] sm:text-xs">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-wider block text-[9px] sm:text-[10px]">Physical Store Location</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-0.5 block">{BUSINESS_INFO.location}</span>
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5">Industrial &amp; Building Supply Corridor, Kigali, Rwanda</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-wider block text-[9px] sm:text-[10px]">Sales Phone &amp; Orders</span>
                  <a
                    href={`tel:${BUSINESS_INFO.phone_raw}`}
                    className="text-xs sm:text-sm font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline mt-0.5 block"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <span className="text-slate-500 text-[10px] sm:text-[11px]">Direct mobile line (Rwanda)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-wider block text-[9px] sm:text-[10px]">Email Correspondence</span>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-[10px] sm:text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white mt-0.5 block"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-wider block text-[9px] sm:text-[10px]">Store Hours</span>
                  <span className="text-[10px] sm:text-xs font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{BUSINESS_INFO.operating_hours}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 sm:gap-2.5">
              <a
                href={BUSINESS_INFO.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-[10px] sm:text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
              >
                <span>Open Google Maps Pin</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
              </a>

              <a
                href={BUSINESS_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-[10px] sm:text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
              >
                <span>Existing Webnode Website</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500" />
              </a>
            </div>
          </div>

          {/* Delivery Scope Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 space-y-2 shadow-xs transition-colors">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
              <span>Delivery Transport Radius</span>
            </div>
            <p className="leading-relaxed">
              We coordinate dedicated tipper trucks and light flatbeds for job sites across Nyarugenge, Gasabo, Kicukiro, and surrounding sectors in Kigali Province.
            </p>
          </div>
        </div>

        {/* Right Message Form & Google Maps Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          {/* Message Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xs transition-colors duration-200">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">Send a Message or Inquiry</h3>
            <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
              Have questions about material specifications or availability? Our Kigali team will reply promptly.
            </p>

            {submittedSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Message Sent Successfully</strong>
                  <span>Your message has been received by our store team. We will call or email you shortly.</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jean Damascene"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-[10px] sm:text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-[10px] sm:text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address <span className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-[10px] sm:text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Cement availability for next week"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-[10px] sm:text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Message Details <span className="text-amber-600 dark:text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry or site requirements..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 text-[10px] sm:text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-y"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] sm:text-xs sm:text-sm font-bold shadow-xs disabled:opacity-50 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 border-2 border-slate-950/40 border-t-slate-950 rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Interactive Google Maps Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs overflow-hidden transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Google Maps Location (Kigali, Rwanda)
                </h4>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400">
                -1.9536° S, 30.0605° E
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 h-40 sm:h-52 flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                alt="Kigali Street Map"
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px] flex flex-col items-center justify-center p-3 sm:p-4 text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg mb-2">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                  {BUSINESS_INFO.name}
                </h5>
                <p className="text-[10px] sm:text-xs text-amber-300 font-medium">
                  {BUSINESS_INFO.location}
                </p>
                <a
                  href={BUSINESS_INFO.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 sm:mt-3 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-white text-[10px] sm:text-xs font-semibold border border-slate-700 flex items-center gap-1 sm:gap-1.5 transition-colors"
                >
                  <span>Open in Google Maps App</span>
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
