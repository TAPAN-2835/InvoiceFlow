import type { Invoice } from "./invoice";

export async function exportInvoicePDF(node: HTMLElement, invoice: Invoice) {
  const [{ default: html2canvas }, jspdfMod] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  const jsPDF = jspdfMod.jsPDF;
  const canvas = await html2canvas(node, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgW = pageW;
  const imgH = (canvas.height * pageW) / canvas.width;
  let heightLeft = imgH;
  let position = 0;
  pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
  heightLeft -= pageH;
  while (heightLeft > 0) {
    position = heightLeft - imgH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
    heightLeft -= pageH;
  }
  pdf.save(`${invoice.number || "invoice"}.pdf`);
}

export async function exportInvoicePNG(node: HTMLElement, invoice: Invoice) {
  const { default: html2canvas } = await import("html2canvas");
  const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#ffffff" });
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `${invoice.number || "invoice"}.png`;
  a.click();
}

export async function generateUPIQR(opts: { upiId: string; name: string; amount: number; note?: string }) {
  const QR = await import("qrcode");
  const url = `upi://pay?pa=${encodeURIComponent(opts.upiId)}&pn=${encodeURIComponent(opts.name)}&am=${opts.amount.toFixed(2)}&cu=INR${opts.note ? `&tn=${encodeURIComponent(opts.note)}` : ""}`;
  return QR.toDataURL(url, { margin: 1, width: 240, color: { dark: "#0F172A", light: "#FFFFFF" } });
}

export async function fireConfetti() {
  if (typeof window === "undefined") return;
  const { default: confetti } = await import("canvas-confetti");
  const end = Date.now() + 600;
  const colors = ["#3B82F6", "#06B6D4", "#7C3AED"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
