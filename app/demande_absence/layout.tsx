import NavbarTopDemandeAbsence from "@/components/demande_absence/navbarTopDemandeAbsence";
import React from "react";

function LayoutDemandeAbsence({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container">
      <div className="main-container">{children}</div>
    </section>
  );
}

export default LayoutDemandeAbsence;
