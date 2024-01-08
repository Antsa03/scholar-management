import NavbarTopComposition from "@/components/composition/navbarTopComposition";
import React from "react";

function LayoutComposition({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container">
      <NavbarTopComposition />
      <div className="main-container">{children}</div>
    </section>
  );
}

export default LayoutComposition;
