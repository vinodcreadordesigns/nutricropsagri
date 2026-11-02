import PageHero from "../../components/common/PageHero";
import Img from "../../components/common/Img";
import { Seo } from "../../utils/seo";
import { team } from "../../data/team";

export default function ManagementTeam() {
  return (
    <>
      <Seo title="Management Team | NutriCrops Agriculture" description="Meet the management team leading NutriCrops Agriculture." path="/about/management-team" />
      <PageHero title="Management Team" crumbs={[{ name: "Home", to: "/" }, { name: "Company Profile", to: "/about" }, { name: "Management Team", to: "/about/management-team" }]} />
      <section className="py-14 md:py-20"><div className="container-x">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} className="border border-line bg-white text-center transition hover:border-primary">
              <Img src={m.photo} alt={`${m.name}, ${m.designation}`} width={600} height={700} className="aspect-[6/7] w-full object-cover" />
              <div className="p-5"><h3 className="text-lg font-semibold">{m.name}</h3><p className="text-sm font-semibold text-primary">{m.designation}</p><p className="mt-2 text-sm text-charcoal/75">{m.bio}</p></div>
            </li>
          ))}
        </ul>
      </div></section>
    </>
  );
}
