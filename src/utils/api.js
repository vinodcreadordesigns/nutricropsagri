// Replace this with your real backend / email service (EmailJS, Formspree, your API...).
// Example:
//   const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
//   if (!res.ok) throw new Error("Failed");
export async function submitForm(payload) {
  await new Promise((r) => setTimeout(r, 900));
  return { ok: true, payload };
}
