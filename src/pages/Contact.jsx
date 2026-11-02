import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "../components/common/PageHero";
import DynamicForm from "../components/common/DynamicForm";
import { Seo, localBusinessLd } from "../utils/seo";
import { companyInfo } from "../data/company";

const fields = [
  { name: "name", label: "Name", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "subject", label: "Subject" },
  { name: "message", label: "Message", type: "textarea", required: true },
];
export default function Contact() {
  const info = [
    [MapPin, "Address", companyInfo.address],
    [Phone, "Phone", companyInfo.phone, companyInfo.phone && `tel:${companyInfo.phone}`],
    [Mail, "Email", companyInfo.email, companyInfo.email && `mailto:${companyInfo.email}`],
    [Clock, "Working Hours", companyInfo.workingHours],
  ];
  return (
    <>
      <Seo title="Contact Us | NutriCrops Agriculture" description="Contact NutriCrops Agriculture for product enquiries, dealership and crop nutrition support." path="/contact" jsonLd={localBusinessLd() || undefined} />
      <PageHero title="Contact Us" subtitle="We'd love to hear from you. Send us your enquiry and our team will get back to you." crumbs={[{ name: "Home", to: "/" }, { name: "Contact Us", to: "/contact" }]} />
      <section className="py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold">Get in touch</h2><span className="mt-3 block h-[3px] w-16 bg-accent" />
            <ul className="mt-6 space-y-5">
              {info.map(([I, label, val, href]) => (
                <li key={label} className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-white"><I size={20} aria-hidden="true" /></span>
                  <div><p className="text-sm font-semibold uppercase tracking-wide text-primary">{label}</p>{val ? (href ? <a href={href}>{val}</a> : <p>{val}</p>) : <p className="text-charcoal/60">Will be updated.</p>}</div></li>
              ))}
            </ul>
          </div>
          <div className="border border-line p-6 sm:p-8 lg:col-span-3"><h2 className="mb-5 text-2xl font-semibold">Send us a message</h2><DynamicForm formName="contact" fields={fields} submitLabel="Send Message" /></div>
        </div>
        <div className="container-x mt-12">
          {companyInfo.mapEmbedUrl ? <iframe title="NutriCrops location map" src={companyInfo.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full border-0" />
            : <div className="flex h-60 items-center justify-center bg-mist text-center text-sm text-charcoal/60">Google Maps will appear here. Add <code className="mx-1">mapEmbedUrl</code> in src/data/company.js</div>}
        </div>
      </section>
    </>
  );
}
