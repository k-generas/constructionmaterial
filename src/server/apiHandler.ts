import type { IncomingMessage, ServerResponse } from "http";
import { INITIAL_PRODUCTS, INITIAL_QUOTATIONS, INITIAL_CONTACT_MESSAGES } from "../data/catalog.ts";
import { BUSINESS_INFO, type Product, type QuotationRequest, type ContactMessage } from "../types.ts";

function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

async function parseJsonBody(req: IncomingMessage): Promise<any> {
  if ((req as any).body && typeof (req as any).body === "object") {
    return (req as any).body;
  }
  return {};
}

// In-memory data store for server runtime (also synced with client localStorage for offline resilience)
let productsStore: Product[] = [...INITIAL_PRODUCTS];
let quotationsStore: QuotationRequest[] = [...INITIAL_QUOTATIONS];
let contactStore: ContactMessage[] = [...INITIAL_CONTACT_MESSAGES];

/**
 * Universal API handler that handles /api/* routes for the customer-facing business website.
 */
export async function handleApiRequest(
  req: IncomingMessage,
  res: ServerResponse,
  next?: () => void
): Promise<boolean> {
  const url = req.url || "";
  const pathname = url.split("?")[0];

  if (!pathname.startsWith("/api/")) {
    if (next) next();
    return false;
  }

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return true;
  }

  try {
    // 1. Products: GET /api/products
    if (pathname === "/api/products" && req.method === "GET") {
      sendJson(res, 200, { products: productsStore });
      return true;
    }

    // 2. Products: POST /api/products (Create / Update for Admin)
    if (pathname === "/api/products" && req.method === "POST") {
      const body = await parseJsonBody(req);
      if (!body.name || !body.category) {
        sendJson(res, 400, { error: "Product name and category are required." });
        return true;
      }

      const existingIndex = productsStore.findIndex((p) => p.id === body.id);
      if (existingIndex >= 0) {
        productsStore[existingIndex] = { ...productsStore[existingIndex], ...body };
        sendJson(res, 200, { success: true, product: productsStore[existingIndex] });
      } else {
        const newProduct: Product = {
          id: body.id || `prod-${Date.now()}`,
          name: body.name,
          category: body.category,
          category_slug: body.category_slug || body.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          description: body.description || "Building material supplied in Kigali, Rwanda.",
          specification: body.specification || "Standard contractor specification",
          unit: body.unit || "Unit",
          pricing_type: body.pricing_type || "quotation_required",
          price_rwf: body.price_rwf,
          availability: body.availability || "in_stock",
          image_url: body.image_url || "/src/assets/images/cement_portland_bags_1793969795657.jpg",
          is_provisional: body.is_provisional !== undefined ? body.is_provisional : true,
          featured: Boolean(body.featured)
        };
        productsStore.unshift(newProduct);
        sendJson(res, 201, { success: true, product: newProduct });
      }
      return true;
    }

    // 3. Quotation Requests: GET /api/quotes
    if (pathname === "/api/quotes" && req.method === "GET") {
      sendJson(res, 200, { quotes: quotationsStore });
      return true;
    }

    // 4. Quotation Requests: POST /api/quotes (Customer Submission)
    if (pathname === "/api/quotes" && req.method === "POST") {
      const body = await parseJsonBody(req);

      if (!body.customer_name || !body.customer_phone) {
        sendJson(res, 400, { error: "Customer name and phone number are required." });
        return true;
      }

      if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
        sendJson(res, 400, { error: "At least one material must be requested." });
        return true;
      }

      const quoteId = `QT-${Math.floor(10000 + Math.random() * 90000)}`;
      const newQuote: QuotationRequest = {
        id: quoteId,
        customer_name: String(body.customer_name).trim(),
        customer_phone: String(body.customer_phone).trim(),
        customer_email: body.customer_email ? String(body.customer_email).trim() : undefined,
        delivery_location: body.delivery_location
          ? String(body.delivery_location).trim()
          : "Kigali, Rwanda",
        preferred_date: body.preferred_date,
        items: body.items.map((it: any) => ({
          product_id: String(it.product_id || ""),
          product_name: String(it.product_name || "Material"),
          quantity: String(it.quantity || "1")
        })),
        additional_notes: body.additional_notes ? String(body.additional_notes).trim() : undefined,
        status: "new",
        created_at: new Date().toISOString()
      };

      quotationsStore.unshift(newQuote);
      sendJson(res, 201, {
        success: true,
        message: "Quotation request successfully received by Kigali store team.",
        quote: newQuote
      });
      return true;
    }

    // 5. Quotation Requests: PATCH/POST /api/quotes/update-status (Admin Status Update)
    if (pathname === "/api/quotes/update-status" && (req.method === "POST" || req.method === "PATCH")) {
      const body = await parseJsonBody(req);
      const { id, status } = body;
      const quote = quotationsStore.find((q) => q.id === id);
      if (!quote) {
        sendJson(res, 404, { error: `Quote ${id} not found.` });
        return true;
      }
      if (status) {
        quote.status = status;
      }
      sendJson(res, 200, { success: true, quote });
      return true;
    }

    // 6. Contact Messages: GET /api/contact
    if (pathname === "/api/contact" && req.method === "GET") {
      sendJson(res, 200, { messages: contactStore });
      return true;
    }

    // 7. Contact Messages: POST /api/contact
    if (pathname === "/api/contact" && req.method === "POST") {
      const body = await parseJsonBody(req);
      if (!body.name || !body.phone || !body.message) {
        sendJson(res, 400, { error: "Name, phone, and message are required." });
        return true;
      }

      const newMsg: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: String(body.name).trim(),
        phone: String(body.phone).trim(),
        email: body.email ? String(body.email).trim() : undefined,
        subject: body.subject ? String(body.subject).trim() : "General Store Inquiry",
        message: String(body.message).trim(),
        created_at: new Date().toISOString(),
        status: "unread"
      };

      contactStore.unshift(newMsg);
      sendJson(res, 201, {
        success: true,
        message: "Inquiry received. We will respond promptly via phone or email.",
        message_id: newMsg.id
      });
      return true;
    }

    // 8. Business Info & Health: GET /api/health
    if (pathname === "/api/health" && req.method === "GET") {
      sendJson(res, 200, {
        status: "healthy",
        business: BUSINESS_INFO,
        products_count: productsStore.length,
        quotes_count: quotationsStore.length,
        timestamp: new Date().toISOString()
      });
      return true;
    }

    // Unmatched API endpoint
    sendJson(res, 404, { error: `Endpoint ${pathname} not found.` });
    return true;
  } catch (err: any) {
    console.error("API error:", err);
    sendJson(res, 500, { error: "Server Error", message: err?.message || String(err) });
    return true;
  }
}
