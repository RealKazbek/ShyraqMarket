"use client";

import CatalogMenu from "./CatalogMenu";
import SearchBar from "./SearchBar";
import UserPanel from "./UserPanel";

export default function HeaderClient() {
  return (
    <div className="flex items-center gap-3 sm:gap-6">
      <CatalogMenu />
      <SearchBar />
      <UserPanel />
    </div>
  );
}
