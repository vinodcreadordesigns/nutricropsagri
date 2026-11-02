// compact=false -> hero par bada card (bada icon + text), slanted bottom (laptop + desktop)
// compact=true  -> scroll ke baad (sirf text wala part)
// Mobile/tablet par hamesha compact text-only card dikhta hai taaki header bar me fit ho.
export default function Logo({ compact = false, className = "" }) {
  return (
    <div
      className={`rounded-b-md bg-white text-center transition-all duration-500 ${
        compact
          ? "pb-1.5 lg:pb-2"
          : "pb-1.5 lg:pb-8 lg:[clip-path:polygon(0_0,100%_0,100%_90%,0_100%)]"
      } ${className}`}
    >
      {/* Bada icon: laptop + desktop par, sirf hero state me */}
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

      {/* Text part: hamesha dikhta hai */}
      <div className="px-1.5 pt-1.5 sm:px-2">
        <p className="text-[13px] font-extrabold uppercase leading-none tracking-wide text-primary sm:text-[15px] lg:text-[18px]">
          NutriCrops Agri<sup className="align-super text-[6px]">®</sup>
        </p>
        <p className="mt-0.5 text-[9px] font-semibold leading-none text-charcoal sm:text-[10px] lg:text-[12px]">
          (INDIA) PVT. LTD.
        </p>
        <div className="mx-auto mt-1 h-px bg-primary/60" />
        <p className="mt-1 text-[6px] font-bold uppercase leading-tight text-charcoal sm:text-[7px] lg:text-[6px]">
          An ISO 9001:2015 &amp; 14001:2015 Certified Company
        </p>
      </div>
    </div>
  );
}