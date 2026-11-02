import Button from "./Button";
export default function CtaBand({ title = "Ready to Boost Your Crop Health and Yield?", text = "Get in touch with our team to find the right nutrition solution for your crops." }) {
  return (
    <section className="bg-primary py-12 text-white">
      <div className="container-x flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div><h2 className="text-2xl font-semibold !text-white sm:text-3xl">{title}</h2><p className="mt-2 text-white/90">{text}</p></div>
        <Button to="/contact" variant="yellow" className="shrink-0">Send Enquiry</Button>
      </div>
    </section>
  );
}
