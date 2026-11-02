import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";

export default function Header() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => setMenu(false), [pathname]);
  const closeSearch = useCallback(() => setSearch(false), []);

  return (
    <>
      <Navbar
        onSearch={() => setSearch(true)}
        menuOpen={menu}
        onToggle={() => setMenu((m) => !m)}
      />
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
      <SearchModal open={search} onClose={closeSearch} />
    </>
  );
}