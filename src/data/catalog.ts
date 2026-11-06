import type { Product, ProductCategory, QuotationRequest, ContactMessage } from "../types.ts";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "cement",
    name: "Portland Cement",
    description: "Certified construction and structural grade cement in standard 50kg bags.",
    iconName: "Package"
  },
  {
    slug: "sand-aggregates",
    name: "Sand & River Aggregates",
    description: "Clean river sand for plastering, masonry mortar, and concrete casting.",
    iconName: "Mountain"
  },
  {
    slug: "gravel-stone",
    name: "Crushed Stone & Gravel",
    description: "Graded stone aggregate (0/20, 10/20) for foundations, beams, and slabs.",
    iconName: "Layers"
  },
  {
    slug: "timber-poles",
    name: "Timber & Eucalyptus Poles",
    description: "Structural lumber, framing rafters, and eucalyptus scaffolding poles.",
    iconName: "Trees"
  },
  {
    slug: "concrete-blocks",
    name: "Concrete Blocks & Pavers",
    description: "Vibrated hollow blocks (15cm, 20cm) and interlocking paving stones.",
    iconName: "Boxes"
  },
  {
    slug: "roofing-sheets",
    name: "Roofing Sheets (Tôles)",
    description: "Galvanized and color-coated corrugated iron sheets with ridge caps.",
    iconName: "Home"
  },
  {
    slug: "structural-steel",
    name: "Reinforcing Steel (Rebar)",
    description: "High-yield deformed steel reinforcing bars (Fer à béton 8mm - 20mm).",
    iconName: "Hammer"
  },
  {
    slug: "plumbing-hardware",
    name: "Plumbing & Hardware",
    description: "PVC drain pipes, PPR water lines, nails, binding wire, and builder tools.",
    iconName: "Wrench"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-cement-325",
    name: "Portland Cement (CEM II 32.5R)",
    category: "Portland Cement",
    category_slug: "cement",
    description: "General-purpose Portland-composite cement ideal for bricklaying, plastering, screeds, and general non-structural concrete works.",
    specification: "50kg paper sacks, moisture-resistant packaging",
    unit: "50kg Bag",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "/src/assets/images/cement_portland_bags_1793969795657.jpg",
    is_provisional: true,
    featured: true
  },
  {
    id: "prod-cement-425",
    name: "Structural Portland Cement (CEM I 42.5N/R)",
    category: "Portland Cement",
    category_slug: "cement",
    description: "High-early-strength structural cement designed for reinforced concrete frames, multi-story columns, beams, and high-load civil engineering.",
    specification: "50kg sacks, high compressive 28-day strength",
    unit: "50kg Bag",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "/src/assets/images/cement_portland_bags_1793969795657.jpg",
    is_provisional: true,
    featured: true
  },
  {
    id: "prod-sand-river",
    name: "Clean River Sand (Plastering & Masonry)",
    category: "Sand & River Aggregates",
    category_slug: "sand-aggregates",
    description: "Sifted, low-clay river sand providing optimal workability for wall rendering, fine plaster finish, and bricklaying mortar.",
    specification: "Supplied in cubic meters (m³) or 10-wheel tipper loads",
    unit: "Tipper Load / m³",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    is_provisional: true,
    featured: true
  },
  {
    id: "prod-crushed-stone",
    name: "Crushed Stone Aggregate (10/20mm Gravel)",
    category: "Crushed Stone & Gravel",
    category_slug: "gravel-stone",
    description: "Machine-crushed basalt / granite aggregate graded to 10/20mm for foundation footings, concrete slabs, and structural lintels.",
    specification: "Sold by metric ton or full dump truckload",
    unit: "Ton / Truckload",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
    is_provisional: true
  },
  {
    id: "prod-timber-planks",
    name: "Construction Timber Planks & Rafters",
    category: "Timber & Eucalyptus Poles",
    category_slug: "timber-poles",
    description: "Straight-sawn pine and cypress lumber suitable for roof trusses, purlins, wall framing, and concrete slab formwork shuttering.",
    specification: "Standard dimensions (2x4, 2x6, 1x8, lengths 3m - 4.5m)",
    unit: "Piece / Bundle",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "/src/assets/images/timber_construction_lumber_1793969797500.jpg",
    is_provisional: true,
    featured: true
  },
  {
    id: "prod-eucalyptus-poles",
    name: "Seasoned Eucalyptus Scaffolding Poles",
    category: "Timber & Eucalyptus Poles",
    category_slug: "timber-poles",
    description: "Sturdy hardwood eucalyptus poles for construction scaffolding, temporary formwork shoring, and rural boundary fencing.",
    specification: "Lengths 4m to 6m, selected for straightness and load safety",
    unit: "Pole",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "/src/assets/images/timber_construction_lumber_1793969797500.jpg",
    is_provisional: true
  },
  {
    id: "prod-blocks-hollow-15",
    name: "Vibrated Concrete Hollow Blocks (15cm)",
    category: "Concrete Blocks & Pavers",
    category_slug: "concrete-blocks",
    description: "Machine-vibrated concrete hollow masonry blocks (40x20x15cm) for perimeter walls, partition walls, and commercial buildings.",
    specification: "Dimensions: 40cm x 20cm x 15cm; tested compressive strength",
    unit: "Block / Pallet",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
    is_provisional: true,
    featured: true
  },
  {
    id: "prod-pavers-interlocking",
    name: "Heavy-Duty Interlocking Paving Stones",
    category: "Concrete Blocks & Pavers",
    category_slug: "concrete-blocks",
    description: "Industrial 60mm and 80mm interlocking concrete pavers suitable for residential driveways, parking compounds, and commercial walkways.",
    specification: "60mm (light traffic) & 80mm (heavy truck traffic) options",
    unit: "m² / Pallet",
    pricing_type: "quotation_required",
    availability: "by_order",
    image_url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    is_provisional: true
  },
  {
    id: "prod-roofing-sheets",
    name: "Corrugated Iron Roofing Sheets (Tôles Ondulées)",
    category: "Roofing Sheets (Tôles)",
    category_slug: "roofing-sheets",
    description: "Weather-resistant galvanized and pre-painted corrugated steel sheets (BG 28 / BG 30) for residential, agricultural, and warehouse roofing.",
    specification: "Lengths: 2m, 2.5m, 3m; Standard corrugated profile",
    unit: "Sheet",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "/src/assets/images/roofing_iron_sheets_1793969796666.jpg",
    is_provisional: true,
    featured: true
  },
  {
    id: "prod-rebar-12mm",
    name: "High-Yield Deformed Rebar 12mm (Fer à béton)",
    category: "Reinforcing Steel (Rebar)",
    category_slug: "structural-steel",
    description: "High-yield ribbed steel reinforcement bars (Grade 500 / BS4449) used for concrete foundation cages, retaining walls, and load-bearing columns.",
    specification: "Standard length: 12 meters per bar; Diameter: 12mm",
    unit: "Bar (12m) / Bundle",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "/src/assets/images/rebar_structural_steel_1793969795916.jpg",
    is_provisional: true,
    featured: true
  },
  {
    id: "prod-rebar-10mm",
    name: "Deformed Steel Reinforcing Bars 10mm",
    category: "Reinforcing Steel (Rebar)",
    category_slug: "structural-steel",
    description: "Ribbed reinforcement bar for concrete beam stirrups, suspended floor slabs, and masonry bond beams.",
    specification: "Standard length: 12 meters per bar; Diameter: 10mm",
    unit: "Bar (12m) / Bundle",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "/src/assets/images/rebar_structural_steel_1793969795916.jpg",
    is_provisional: true
  },
  {
    id: "prod-rebar-16mm",
    name: "Heavy Structural Rebar 16mm",
    category: "Reinforcing Steel (Rebar)",
    category_slug: "structural-steel",
    description: "Heavy-gauge structural reinforcement for multi-story foundation rafts, bridge culverts, and high-load industrial buildings.",
    specification: "Standard length: 12 meters per bar; Diameter: 16mm",
    unit: "Bar (12m) / Bundle",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "/src/assets/images/rebar_structural_steel_1793969795916.jpg",
    is_provisional: true
  },
  {
    id: "prod-plumbing-pipes",
    name: "PVC Drainage & PPR Pressure Pipes",
    category: "Plumbing & Hardware",
    category_slug: "plumbing-hardware",
    description: "Heavy-duty PVC pipes for sanitary wastewater and PPR hot/cold water supply lines, with compatible elbows, tees, and joiners.",
    specification: "Diameters 50mm, 75mm, 110mm, 160mm; 4m lengths",
    unit: "Pipe Length (4m)",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    is_provisional: true
  },
  {
    id: "prod-hardware-binding-wire",
    name: "Annealed Binding Wire & Construction Nails",
    category: "Plumbing & Hardware",
    category_slug: "plumbing-hardware",
    description: "Pliable black annealed wire for tying rebar cages, and steel wire nails (2-inch to 5-inch) for formwork carpentry.",
    specification: "Rolls of 25kg binding wire; 50kg nail bags or retail boxes",
    unit: "Roll / Box",
    pricing_type: "quotation_required",
    availability: "in_stock",
    image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    is_provisional: true
  }
];

export const INITIAL_QUOTATIONS: QuotationRequest[] = [
  {
    id: "QT-84210",
    customer_name: "Jean-Paul Habimana",
    customer_phone: "+250 788 123 456",
    customer_email: "jp.habimana@gmail.com",
    delivery_location: "Kicukiro, Niboye Sector, Site near Mount Kigali Hospital",
    preferred_date: "2026-11-12",
    items: [
      { product_id: "prod-cement-425", product_name: "Structural Portland Cement 42.5N", quantity: "150 bags" },
      { product_id: "prod-rebar-12mm", product_name: "High-Yield Deformed Rebar 12mm", quantity: "80 bars" },
      { product_id: "prod-sand-river", product_name: "Clean River Sand", quantity: "2 tipper loads" }
    ],
    additional_notes: "Two-story commercial building project. Need delivery to commence Monday morning with tipper access.",
    status: "new",
    created_at: "2026-11-06T09:40:00Z"
  },
  {
    id: "QT-84209",
    customer_name: "Claire Mukamugema",
    customer_phone: "+250 783 987 654",
    delivery_location: "Gasabo, Kimironko Sector, near Promise School",
    items: [
      { product_id: "prod-roofing-sheets", product_name: "Corrugated Iron Roofing Sheets (BG 28)", quantity: "45 sheets (3m)" },
      { product_id: "prod-timber-planks", product_name: "Construction Timber Planks (2x4)", quantity: "60 pieces" }
    ],
    additional_notes: "Residential roof renovation. Please include quotation for matching ridge caps.",
    status: "quoted",
    created_at: "2026-11-05T14:15:00Z"
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "msg-01",
    name: "Alexis Nshimiyimana",
    phone: "+250 788 654 321",
    email: "alexis.n@construct-rwanda.com",
    subject: "Bulk supply discount for residential compound in Nyarugenge",
    message: "Hello, we are starting a 4-house residential project in Nyarugenge. We would like to know if you offer credit or milestone payment terms for contractor accounts upon delivery of cement and rebar.",
    created_at: "2026-11-05T11:20:00Z",
    status: "unread"
  }
];
