// Mobile/tablet (< lg): horizontal -> [icon] [name + pvt ltd]
// Laptop/desktop (lg+): vertical hanging card, big icon collapses on scroll
export default function Logo({ compact = false, className = "" }) {
  return (
    <div
      className={`bg-white transition-all duration-500
        max-lg:flex max-lg:items-center max-lg:gap-2 max-lg:rounded-md max-lg:px-2 max-lg:py-1
        lg:rounded-b-md lg:text-center ${
          compact
            ? "lg:pb-2"
            : "lg:pb-8 lg:[clip-path:polygon(0_0,100%_0,100%_90%,0_100%)]"
        } ${className}`}
    >
      {/* Mobile icon (horizontal layout) */}
      <img
        src="/images/logo.WebP"
        alt="Agri Search"
        width={36}
        height={36}
        className="h-8 w-8 shrink-0 object-contain sm:h-10 sm:w-10 lg:hidden"
      />

      {/* Desktop big icon (hero state only) */}
      <div
        className={`overflow-hidden transition-all duration-500 max-lg:hidden ${
          compact ? "max-h-0 opacity-0" : "max-h-[120px] pt-2 opacity-100"
        }`}
      >
        <img
          src="/images/logo.WebP"
          alt="Agri Search"
          width={96}
          height={96}
          className="mx-auto h-[96px] w-auto object-contain"
        />
      </div>

      {/* Text part */}
      <div className="min-w-0 text-left lg:px-2 lg:pt-1.5 lg:text-center">
        <p className="whitespace-nowrap text-[12px] font-extrabold uppercase leading-none tracking-wide text-primary sm:text-[15px] lg:text-[18px]">
          NutriCrops Agri<sup className="align-super text-[6px]">®</sup>
        </p>
        <p className="mt-0.5 whitespace-nowrap text-[8px] font-semibold leading-none text-charcoal sm:text-[10px] lg:text-[12px]">
          (INDIA) PVT. LTD.
        </p>
        <div className="mt-1 hidden h-px bg-primary/60 lg:mx-auto lg:block" />
        <p className="mt-1 hidden text-[6px] font-bold uppercase leading-tight text-charcoal sm:block sm:text-[7px] lg:text-[6px]">
          An ISO 9001:2015 &amp; 14001:2015 Certified Company
        </p>
      </div>
    </div>
  );
}