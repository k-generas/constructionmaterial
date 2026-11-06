/**
 * Ground-truth business facts for Construction and Materials supply in Kigali, Rwanda.
 * All Gemini prompt outputs must be strictly grounded in these verified facts.
 */

export interface BusinessFacts {
  business_name: string;
  category: string;
  city: string;
  country: string;
  full_location: string;
  phone: string;
  phone_raw: string;
  email: string;
  website: string;
  google_maps_url: string;
  coordinates: {
    lat: number;
    lng: number;
    area: string;
  };
  verified_categories: string[];
  verified_materials: {
    name: string;
    description: string;
    specification: string;
  }[];
  verified_services: string[];
  operating_hours: string;
  review_status: {
    review_count: number;
    average_rating: number | null;
    rating_claim_allowed: boolean;
    policy: string;
  };
  negative_grounding_rules: string[];
}

export const VERIFIED_BUSINESS_FACTS: BusinessFacts = {
  business_name: "Construction and Materials supply",
  category: "Building Materials Store",
  city: "Kigali",
  country: "Rwanda",
  full_location: "Kigali, Rwanda",
  phone: "+250 788 537 236",
  phone_raw: "0788537236",
  email: "office@construction.com",
  website: "https://construction.webnode.page",
  google_maps_url: "https://maps.app.goo.gl/ZdPoEbAD7w8TXa2y9",
  coordinates: {
    lat: -1.9536,
    lng: 30.0605,
    area: "Kigali Urban District / Industrial Supply Corridor, Rwanda"
  },
  verified_categories: [
    "Cement & Binding Agents",
    "Sand, Gravel & Aggregates",
    "Construction Timber & Wood Poles",
    "Concrete Hollow Blocks & Paving Stones",
    "Iron Sheets & Roofing Materials",
    "Structural Steel & Rebar (Fer à béton)",
    "Plumbing Pipes & Fittings (PVC / PPR)",
    "General Hardware, Fasteners & Binding Wire"
  ],
  verified_materials: [
    {
      name: "Portland Cement (32.5R & 42.5R)",
      description: "Standard construction and structural grade cement (Cimerwa / Twiga brands standard in Rwanda).",
      specification: "50kg bags, bulk delivery available"
    },
    {
      name: "Sand & River Aggregates",
      description: "Clean river sand for plastering, masonry mortar, and concrete casting.",
      specification: "Supplied by cubic meter (m³) or truckload"
    },
    {
      name: "Crushed Stone & Gravel",
      description: "Graded stone aggregate (0/20, 10/20) for foundations, beams, and slabs.",
      specification: "Sold by ton or tipper load"
    },
    {
      name: "Construction Timber & Eucalyptus Poles",
      description: "Seasoned timber planks, rafters, formwork wood, and eucalyptus poles for scaffolding.",
      specification: "Standard dimensional lumber cuts"
    },
    {
      name: "Concrete Blocks & Paving Stones",
      description: "Vibrated hollow blocks (15cm, 20cm) and heavy-duty interlocking pavers.",
      specification: "Tested for high compressive load strength"
    },
    {
      name: "Corrugated Iron Roofing Sheets",
      description: "Galvanized and pre-painted corrugated sheets (tôles) with ridge caps and fixings.",
      specification: "Gauge 28, 30, and 32 options"
    },
    {
      name: "Structural Rebar (Fer à béton)",
      description: "High-yield deformed steel reinforcing bars for concrete reinforcement.",
      specification: "Diameters: 8mm, 10mm, 12mm, 16mm, 20mm"
    },
    {
      name: "Plumbing & Hardware Essentials",
      description: "PVC drain pipes, PPR water supply lines, nails, binding wire, and hand tools.",
      specification: "Standard building hardware assortment"
    }
  ],
  verified_services: [
    "Retail building materials counter sales in Kigali",
    "Wholesale bulk construction supply orders for contractors and private builders",
    "Reliable on-site truck transport and delivery across Kigali and neighboring sectors",
    "Material quotation and supply estimation via direct phone (+250 788 537 236) and email"
  ],
  operating_hours: "Monday to Saturday: 07:30 - 18:00 | Sunday: Closed",
  review_status: {
    review_count: 0,
    average_rating: null,
    rating_claim_allowed: false,
    policy: "Strict Grounding Rule: The store has 0 reviews and null rating on Google Maps. No star ratings, awards, customer counts, or fabricated testimonials may be stated."
  },
  negative_grounding_rules: [
    "REJECT any Romanian boilerplate text (e.g., 'București', 'România', 'Sector 1', 'Compania noastră', 'materiale de construcții din România').",
    "REJECT foreign locations or Bucharest addresses. Ground location ONLY in Kigali, Rwanda.",
    "REJECT hallucinated prices or fake currency (e.g., '99 RON', '$19.99', '50% off discount sales'). Prices must be presented as 'Contact for current Kigali market quotation'.",
    "REJECT fake review counts or star claims (e.g., 'Rated 4.9 stars by 5,000 customers'). The store has 0 reviews and null rating.",
    "REJECT foreign phone numbers or fake emails. Use ONLY +250 788 537 236 and office@construction.com.",
    "REJECT unverified services like architectural design, high-rise structural engineering, or international overseas exports."
  ]
};
