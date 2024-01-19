import NavbarTopUe from "@/components/unite_enseignement/navbarTopUe";
import React from "react";

function UeLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container">
      <div className="main-container">{children}</div>
    </section>
  );
}

export default UeLayout;
