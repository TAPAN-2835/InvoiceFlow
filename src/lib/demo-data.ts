import { createEmptyItem, nextInvoiceNumber, type Invoice } from "./invoice";

export function buildDemoInvoice(existing: Invoice[] = []): Partial<Invoice> {
  return {
    number: nextInvoiceNumber("INV-", existing),
    placeOfSupply: "29",
    taxMode: "exclusive",
    business: {
      name: "Patel Tech Solutions",
      gstin: "27AABCP2835F1Z8",
      address: "402, Andheri Kurla Road, Andheri East\nMumbai, Maharashtra — 400069",
      phone: "+91 98765 43210",
      email: "billing@pateltech.in",
      stateCode: "27",
    },
    customer: {
      name: "Sharma Digital Services Pvt Ltd",
      gstin: "29AABCS5678G1Z3",
      address: "88, MG Road, Indiranagar\nBengaluru, Karnataka — 560038",
      phone: "+91 91234 56789",
      email: "accounts@sharmadigital.com",
      stateCode: "29",
    },
    items: [
      { ...createEmptyItem(), name: "Web Application Development", description: "Full-stack React + Node.js build", hsn: "998314", qty: 1, rate: 45000, discount: 0, tax: 18 },
      { ...createEmptyItem(), name: "UI/UX Design Package", description: "Wireframes, prototypes & design system", hsn: "998314", qty: 1, rate: 18000, discount: 5, tax: 18 },
      { ...createEmptyItem(), name: "Annual Maintenance (AMC)", description: "12-month support & updates", hsn: "998315", qty: 1, rate: 12000, discount: 0, tax: 18 },
    ],
    notes: "Thank you for your business. Payment via UPI or bank transfer within 14 days.",
    terms: "Payment due within 14 days. Late payments subject to 1.5% monthly interest.",
    upi: { id: "pateltech@okicici", name: "Patel Tech Solutions" },
    status: "pending",
  };
}
