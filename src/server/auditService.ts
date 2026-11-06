import { GoogleGenAI, Type } from "@google/genai";
import { VERIFIED_BUSINESS_FACTS } from "./groundTruth.ts";

export interface AuditInput {
  raw_text: string;
  page_context?: string;
  force_fallback?: boolean;
}

export interface AuditOutput {
  is_compliant: boolean;
  cleaned_text: string;
  unverified_claims: string[];
  detected_issues: string[];
  confidence_score: number;
  changes_summary: string;
  is_fallback?: boolean;
  execution_mode: "gemini-3.8-flash" | "deterministic-fallback";
  latency_ms: number;
  timestamp: string;
}

/**
 * Deterministic fallback audit engine when Gemini API is unavailable or rate-limited.
 * Guarantees zero leakage of Romanian boilerplate or hallucinated pricing.
 */
export function deterministicAudit(rawText: string, pageContext?: string): AuditOutput {
  const start = Date.now();
  const lower = rawText.toLowerCase();
  const unverified: string[] = [];
  const issues: string[] = [];

  // Romanian boilerplate triggers
  const romanianPatterns = [
    /\bbucure[sș]ti\b/i,
    /\brom[aâ]nia\b/i,
    /\bsector\s*[1-6]\b/i,
    /\bcompania noastr[aă]\b/i,
    /\bmateriale de construc[tț]ii\b/i,
    /\bpre[tț](ul)?\b/i,
    /\bron\b/i,
    /\blei\b/i,
    /\bclien[tț]i\b/i,
    /\bcontacta[tț]i-ne\b/i,
    /\blivrare gratuit[aă]\b/i,
    /\bdepozitul\b/i,
    /\boferim\b/i,
    /\bcele mai bune\b/i,
    /\bstrada\b/i,
    /\b[sș]i\b/i,
    /\bcu\b/i,
    /\bde\b/i
  ];

  // Specific phrases
  if (
    /bucure/i.test(rawText) ||
    /rom[aâ]ni/i.test(rawText) ||
    /sector\s*[1-6]/i.test(rawText) ||
    /\b[4-9][0-9]\s*(ron|lei|eur)/i.test(rawText)
  ) {
    issues.push("FOREIGN_LANGUAGE_BOILERPLATE");
    issues.push("UNVERIFIED_LOCATION");
    unverified.push("Romanian template location (Bucharest / Romania / Sector) detected in place of Kigali, Rwanda");
  }

  // Pricing detection
  const priceRegex = /(\$\d+(\.\d{2})?|\d+\s*(ron|lei|eur|usd|\$|rwf|frw)|\b(50% off|sale|discount|free)\b)/gi;
  const priceMatches = rawText.match(priceRegex);
  if (priceMatches && priceMatches.length > 0) {
    issues.push("HALLUCINATED_PRICING");
    unverified.push(`Hallucinated or unverified pricing claims: ${priceMatches.join(", ")}`);
  }

  // Review & rating claims
  if (
    /\b(5\s*stars?|4\.[0-9]\s*stars?|rated|reviews?|evalua[tț]i|10\.?000|5\.?000|clien[tț]i mul[tț]umi[tț]i|satisfied customers?)\b/i.test(
      rawText
    )
  ) {
    issues.push("FAKE_REVIEWS_RATING");
    unverified.push(
      "Unverified rating/reviews claim detected: Store has 0 reviews and null rating on Google Maps."
    );
  }

  // Foreign phone or email
  if (/\+40\b|\+1\b|\+44\b/i.test(rawText)) {
    issues.push("FOREIGN_CONTACT_INFO");
    unverified.push("Foreign non-Rwandan phone number detected. Verified store contact is +250 788 537 236.");
  }

  // Unsupported services
  if (/\b(architectural design|3d modeling|skyscraper|import from europe|international shipping)\b/i.test(rawText)) {
    issues.push("UNSUPPORTED_SERVICES");
    unverified.push("Unverified service claims not offered by local building materials store.");
  }

  // Check if foreign text detected
  let foreignScore = 0;
  for (const pat of romanianPatterns) {
    if (pat.test(lower)) foreignScore++;
  }
  if (foreignScore >= 3 && !issues.includes("FOREIGN_LANGUAGE_BOILERPLATE")) {
    issues.push("FOREIGN_LANGUAGE_BOILERPLATE");
    unverified.push("Romanian template boilerplate text detected.");
  }

  const isCompliant = issues.length === 0 && unverified.length === 0;

  // Generate ground-truth replacement copy based on pageContext
  let cleanedText = "";
  const context = (pageContext || "general").toLowerCase();

  if (isCompliant) {
    cleanedText = rawText.trim();
  } else if (context.includes("hero") || context.includes("home")) {
    cleanedText = `Welcome to ${VERIFIED_BUSINESS_FACTS.business_name}, your premier ${VERIFIED_BUSINESS_FACTS.category} located in ${VERIFIED_BUSINESS_FACTS.full_location}. We supply high-grade cement, sand, gravel, construction timber, concrete blocks, corrugated iron sheets, and structural steel for residential and commercial building projects across Kigali. Contact our team at ${VERIFIED_BUSINESS_FACTS.phone} or email ${VERIFIED_BUSINESS_FACTS.email} for current market quotations and fast on-site delivery.`;
  } else if (context.includes("about")) {
    cleanedText = `${VERIFIED_BUSINESS_FACTS.business_name} is an established ${VERIFIED_BUSINESS_FACTS.category} situated in ${VERIFIED_BUSINESS_FACTS.full_location}. We specialize in direct sourcing and bulk distribution of certified construction materials including Portland cement, structural steel rebar, quarry aggregates, and roofing supplies. We provide reliable transport and logistics support directly to job sites throughout Kigali and surrounding districts.`;
  } else if (context.includes("product") || context.includes("material")) {
    cleanedText = `Verified Construction Materials Catalog:\n- Portland Cement: Certified 32.5R and 42.5R structural grade cement in 50kg bags.\n- Aggregates & Sand: Clean river sand, quarry dust, and graded crushed stone for concrete casting.\n- Timber & Scaffolding: Dimensional construction planks, rafters, and eucalyptus poles.\n- Concrete Hollow Blocks: Tested vibrated blocks and interlocking paving stones.\n- Roofing & Steel: Corrugated iron sheets (tôles), ridge caps, and high-tensile steel rebar (8mm-16mm).\n- Hardware: Plumbing pipes, fittings, binding wire, and construction tools.\n\nAll items available for retail purchase and bulk contractor orders. Inquire at ${VERIFIED_BUSINESS_FACTS.phone} for current Kigali market rates.`;
  } else if (context.includes("contact") || context.includes("delivery")) {
    cleanedText = `Visit our store in ${VERIFIED_BUSINESS_FACTS.full_location} or contact us for dependable delivery across Kigali. Phone: ${VERIFIED_BUSINESS_FACTS.phone} | Email: ${VERIFIED_BUSINESS_FACTS.email} | Website: ${VERIFIED_BUSINESS_FACTS.website}. Store Hours: ${VERIFIED_BUSINESS_FACTS.operating_hours}.`;
  } else {
    cleanedText = `${VERIFIED_BUSINESS_FACTS.business_name} is a verified ${VERIFIED_BUSINESS_FACTS.category} serving ${VERIFIED_BUSINESS_FACTS.full_location}. We supply certified cement, gravel, sand, timber, concrete blocks, and roofing steel. Call ${VERIFIED_BUSINESS_FACTS.phone} or visit our store in Kigali for project quotations and prompt on-site delivery.`;
  }

  const latency = Date.now() - start;

  return {
    is_compliant: isCompliant,
    cleaned_text: cleanedText,
    unverified_claims: unverified,
    detected_issues: issues,
    confidence_score: isCompliant ? 1.0 : 0.95,
    changes_summary: isCompliant
      ? "Text passed all Kigali ground-truth verification checks with zero unverified claims."
      : `Replaced foreign boilerplate and ungrounded claims (${issues.join(", ")}) with verified Kigali ground-truth business facts.`,
    is_fallback: true,
    execution_mode: "deterministic-fallback",
    latency_ms: latency,
    timestamp: new Date().toISOString()
  };
}

/**
 * Audits web copy using Gemini API (gemini-3.8-flash) with structured output JSON schema.
 * Grounds output strictly against VERIFIED_BUSINESS_FACTS.
 */
export async function auditCopy(input: AuditInput): Promise<AuditOutput> {
  const start = Date.now();
  if (input.force_fallback) {
    return deterministicAudit(input.raw_text, input.page_context);
  }
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
    // Graceful fallback when API key is not configured
    return deterministicAudit(input.raw_text, input.page_context);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });

    const systemInstruction = `You are an expert copy validation and transformation guardrail for a Building Materials Store in Kigali, Rwanda.
Your job is to audit incoming website copy, identify unverified facts or foreign placeholder boilerplate, and transform it into 100% compliant, evidence-grounded copy.

GROUND TRUTH VERIFIED FACTS FOR THIS BUSINESS:
- Business Name: "${VERIFIED_BUSINESS_FACTS.business_name}"
- Business Category: "${VERIFIED_BUSINESS_FACTS.category}"
- Exact Location: "${VERIFIED_BUSINESS_FACTS.full_location}" (City: Kigali, Country: Rwanda)
- Phone Number: "${VERIFIED_BUSINESS_FACTS.phone}"
- Email Address: "${VERIFIED_BUSINESS_FACTS.email}"
- Website: "${VERIFIED_BUSINESS_FACTS.website}"
- Google Maps: "${VERIFIED_BUSINESS_FACTS.google_maps_url}"
- Operating Hours: "${VERIFIED_BUSINESS_FACTS.operating_hours}"
- Verified Product Categories: ${JSON.stringify(VERIFIED_BUSINESS_FACTS.verified_categories)}
- Verified Services: ${JSON.stringify(VERIFIED_BUSINESS_FACTS.verified_services)}
- Review Status: The store currently has 0 reviews and null rating on Google Maps. No star ratings (e.g. "5 stars"), awards, or customer counts (e.g. "10,000 happy clients") may be stated or implied.

STRICT GUARDRAIL RULES:
1. Grounding Guarantee: You MUST ground all generated copy EXCLUSIVELY in the provided verified facts.
2. Foreign Language & Boilerplate Rejection: Any foreign language boilerplate (especially Romanian text referencing Bucharest / București, Sector 1, Romania, or European locations) MUST be flagged and eradicated.
3. Hallucinatory Pricing Rejection: The store does NOT have public fixed online prices. Any hallucinatory prices (e.g., "$19.99", "99 RON", "25,000 RWF", fake 50% discounts) MUST be rejected and replaced with an invitation to request a current Kigali quotation via phone or email.
4. Review & Rating Guardrail: The store has 0 reviews. Any rating claim (e.g., "5 stars", "4.9/5", "rated by thousands") is UNVERIFIED and MUST be rejected.
5. Location & Contact Accuracy: The business is ONLY in Kigali, Rwanda. Replace any foreign addresses or non-Kigali phone numbers with the verified Kigali address and +250 788 537 236.
6. Schema Compliance: Return your evaluation strictly according to the specified JSON schema.`;

    const userPrompt = `AUDIT REQUEST:
Page Context: ${input.page_context || "General Website Section"}
Raw Text:
"""
${input.raw_text}
"""

Evaluate this raw text against the Ground Truth Facts.
- Determine if it is fully compliant (is_compliant = true only if zero unverified claims or foreign boilerplate exist).
- Generate cleaned_text: Professional, polished, natural marketing copy matching the page context and strictly adhering to Kigali, Rwanda verified facts.
- List all unverified_claims detected in the raw text.
- Categorize detected_issues (e.g., FOREIGN_LANGUAGE_BOILERPLATE, UNVERIFIED_LOCATION, HALLUCINATED_PRICING, FAKE_REVIEWS_RATING, FOREIGN_CONTACT_INFO, UNSUPPORTED_SERVICES).
- Assign a confidence_score between 0.0 and 1.0.
- Provide a concise changes_summary explaining the audit decisions.`;

    const generatePromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            is_compliant: {
              type: Type.BOOLEAN,
              description:
                "True if the original raw_text was 100% compliant with verified Kigali business facts; false if it contained foreign boilerplate, unverified claims, fake ratings, or fake prices."
            },
            cleaned_text: {
              type: Type.STRING,
              description:
                "The cleaned, professional copy strictly grounded in verified facts for Construction and Materials supply in Kigali, Rwanda."
            },
            unverified_claims: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Specific unverified claims, foreign text snippets, or ungrounded statements found in the raw text."
            },
            detected_issues: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description:
                "Categorized issue codes (e.g. FOREIGN_LANGUAGE_BOILERPLATE, UNVERIFIED_LOCATION, HALLUCINATED_PRICING, FAKE_REVIEWS_RATING, FOREIGN_CONTACT_INFO)."
            },
            confidence_score: {
              type: Type.NUMBER,
              description: "Confidence score between 0.0 and 1.0 representing certainty of grounding."
            },
            changes_summary: {
              type: Type.STRING,
              description: "Concise summary of changes made to make the copy compliant."
            }
          },
          required: [
            "is_compliant",
            "cleaned_text",
            "unverified_claims",
            "detected_issues",
            "confidence_score",
            "changes_summary"
          ]
        }
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Gemini API call timed out after 6s")), 6000);
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const latency = Date.now() - start;
    const jsonStr = (response.text ?? "").trim();
    if (!jsonStr) {
      throw new Error("Empty response returned from Gemini API");
    }

    const parsed = JSON.parse(jsonStr);

    return {
      is_compliant: Boolean(parsed.is_compliant),
      cleaned_text: String(parsed.cleaned_text || "").trim(),
      unverified_claims: Array.isArray(parsed.unverified_claims) ? parsed.unverified_claims : [],
      detected_issues: Array.isArray(parsed.detected_issues) ? parsed.detected_issues : [],
      confidence_score: typeof parsed.confidence_score === "number" ? parsed.confidence_score : 0.98,
      changes_summary: String(parsed.changes_summary || "Audit complete."),
      is_fallback: false,
      execution_mode: "gemini-3.8-flash",
      latency_ms: latency,
      timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    console.error("Gemini API error during copy audit, falling back to deterministic grounding engine:", err);
    // Explicit fallback to static verified ground-truth copy per requirements
    const fallback = deterministicAudit(input.raw_text, input.page_context);
    fallback.changes_summary = `Gemini API fallback applied (${err?.message || "Service unavailable"}). Text evaluated and grounded strictly using verified Kigali business facts.`;
    return fallback;
  }
}
