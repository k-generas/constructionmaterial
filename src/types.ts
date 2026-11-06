export interface Product {
  id: string;
  name: string;
  category: string;
  category_slug: string;
  description: string;
  specification: string;
  unit: string;
  pricing_type: "quotation_required" | "confirmed_price";
  price_rwf?: number;
  availability: "in_stock" | "by_order" | "low_stock";
  image_url: string;
  is_provisional: boolean;
  featured?: boolean;
}

export interface QuotationItem {
  product_id: string;
  product_name: string;
  quantity: string;
}

export interface QuotationRequest {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_location: string;
  preferred_date?: string;
  items: QuotationItem[];
  additional_notes?: string;
  status: "new" | "in_review" | "quoted" | "fulfilled" | "archived";
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  created_at: string;
  status: "unread" | "read" | "replied";
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  iconName: string;
}

export interface BusinessInfo {
  name: string;
  category: string;
  location: string;
  phone: string;
  phone_raw: string;
  email: string;
  website: string;
  google_maps_url: string;
  operating_hours: string;
  review_status: {
    review_count: number;
    rating: null;
    note: string;
  };
}

export const BUSINESS_INFO: BusinessInfo = {
  name: "Construction and Materials supply",
  category: "Building Materials Store",
  location: "Kigali, Rwanda",
  phone: "+250 788 537 236",
  phone_raw: "0788537236",
  email: "office@construction.com",
  website: "https://construction.webnode.page",
  google_maps_url: "https://maps.app.goo.gl/ZdPoEbAD7w8TXa2y9",
  operating_hours: "Monday - Saturday: 07:30 - 18:00 | Sunday: Closed",
  review_status: {
    review_count: 0,
    rating: null,
    note: "New Google Maps Business Listing. Zero star claims or unverified reviews published."
  }
};
