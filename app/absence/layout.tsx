import NavbarTopAbsence from "@/components/absence/navbarTopAbsence";
import React from "react";

function LayoutAbsence({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container">
      <div className="main-container">{children}</div>
    </section>
  );
}

export default LayoutAbsence;
