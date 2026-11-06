export interface TestCase {
  id: string;
  name: string;
  category: "romanian_boilerplate" | "hallucinated_pricing" | "fake_reviews" | "foreign_location" | "unsupported_services" | "clean_kigali";
  page_context: string;
  raw_text: string;
  expected_compliant: boolean;
  expected_issue_tags: string[];
  description: string;
}

export interface TestResult {
  test_id: string;
  test_name: string;
  passed: boolean;
  expected_compliant: boolean;
  actual_compliant: boolean;
  unverified_claims_count: number;
  detected_issues: string[];
  cleaned_text_snippet: string;
  leakage_check_passed: boolean;
  latency_ms: number;
  failure_reason?: string;
}

export const EVALUATION_TEST_CASES: TestCase[] = [
  {
    id: "test-romanian-hero",
    name: "Foreign Language Boilerplate (Bucharest Template)",
    category: "romanian_boilerplate",
    page_context: "Homepage Hero Section",
    raw_text:
      "Bine ați venit la depozitul nostru din București! Compania noastră oferă cele mai bune materiale de construcții din România la prețul incredibil de 99 RON. Contactați-ne la +40 721 000 000 pe Strada Victoriei 45, Sector 1, București.",
    expected_compliant: false,
    expected_issue_tags: ["FOREIGN_LANGUAGE_BOILERPLATE", "UNVERIFIED_LOCATION", "HALLUCINATED_PRICING", "FOREIGN_CONTACT_INFO"],
    description: "Detects Romanian text, Bucharest address, RON currency, and Romanian phone number."
  },
  {
    id: "test-fake-rating-claim",
    name: "Unverified Rating & Reviews Claim (0 Reviews Rule)",
    category: "fake_reviews",
    page_context: "Customer Testimonials Section",
    raw_text:
      "Construction and Materials supply is proud to be rated 5.0 stars on Google by over 12,000 satisfied homeowners in Kigali! Voted best building supplier of the year with award-winning customer service.",
    expected_compliant: false,
    expected_issue_tags: ["FAKE_REVIEWS_RATING"],
    description: "Rejects 5.0 star claims and 12,000 review fabrication since Google Maps ground truth is 0 reviews, null rating."
  },
  {
    id: "test-hallucinated-pricing",
    name: "Hallucinated Pricing & Flash Discount Sale",
    category: "hallucinated_pricing",
    page_context: "Materials Catalog Page",
    raw_text:
      "Weekend Flash Sale! 50kg bags of Portland cement for only 4,500 RWF (down from 9,000 RWF - 50% discount). Buy 10 bags of sand and get 2 bags free! Order now before stock runs out.",
    expected_compliant: false,
    expected_issue_tags: ["HALLUCINATED_PRICING"],
    description: "Flags unauthorized discounts and unverified specific product prices not authorized in ground truth facts."
  },
  {
    id: "test-mixed-foreign-kigali",
    name: "Mixed Foreign Boilerplate with Kigali Mentions",
    category: "foreign_location",
    page_context: "About Us Page",
    raw_text:
      "Construction and Materials supply is located in Kigali, Rwanda and also operates from Strada Mihai Eminescu in Bucharest. Sunați-ne acum pentru materiale de construcții de înaltă calitate cu transport rapid.",
    expected_compliant: false,
    expected_issue_tags: ["FOREIGN_LANGUAGE_BOILERPLATE", "UNVERIFIED_LOCATION"],
    description: "Catches partial Romanian phrases and secondary Bucharest address mixed into Kigali copy."
  },
  {
    id: "test-unauthorized-services",
    name: "Unsupported Services (High-Rise Architecture)",
    category: "unsupported_services",
    page_context: "Services Page",
    raw_text:
      "Construction and Materials supply offers luxury skyscraper architectural design, European civil engineering consulting, and direct shipping containers to Germany and France.",
    expected_compliant: false,
    expected_issue_tags: ["UNSUPPORTED_SERVICES"],
    description: "Flags architectural design and European shipping; grounds services to local Kigali store retail & delivery."
  },
  {
    id: "test-clean-kigali-valid",
    name: "100% Compliant Grounded Kigali Store Copy",
    category: "clean_kigali",
    page_context: "Contact & Store Overview",
    raw_text:
      "Construction and Materials supply is a Building Materials Store located in Kigali, Rwanda. We provide cement, aggregates, timber, concrete blocks, and roofing materials. Contact us at +250 788 537 236 or email office@construction.com for quotation requests and on-site delivery.",
    expected_compliant: true,
    expected_issue_tags: [],
    description: "Validates that genuine, verified business copy passes without false positives."
  }
];

/**
 * Checks that the cleaned text has zero leakage of foreign boilerplate or fake claims.
 */
export function checkZeroLeakage(cleanedText: string): { leaked: boolean; leakReasons: string[] } {
  const leaks: string[] = [];
  const lower = cleanedText.toLowerCase();

  const forbiddenTerms = [
    { term: "bucurești", reason: "Leaked 'București'" },
    { term: "bucuresti", reason: "Leaked 'Bucuresti'" },
    { term: "românia", reason: "Leaked 'România'" },
    { term: "romania", reason: "Leaked 'Romania'" },
    { term: "sector 1", reason: "Leaked 'Sector 1'" },
    { term: " 99 ron", reason: "Leaked '99 RON' price" },
    { term: "+40 ", reason: "Leaked Romanian phone prefix +40" },
    { term: "12,000", reason: "Leaked fake 12,000 customer count" },
    { term: "5.0 star", reason: "Leaked fake 5.0 star rating" },
    { term: "5-star", reason: "Leaked fake 5-star rating" },
    { term: "50% off", reason: "Leaked hallucinated 50% discount" }
  ];

  for (const { term, reason } of forbiddenTerms) {
    if (lower.includes(term.toLowerCase())) {
      leaks.push(reason);
    }
  }

  return {
    leaked: leaks.length > 0,
    leakReasons: leaks
  };
}
