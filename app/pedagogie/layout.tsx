import NavbarTopPedagogie from "@/components/pedagogie/navbarTopPedagogie";
import React from "react";
function LayoutPedagogie({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container">
      <div className="main-container">{children}</div>
    </section>
  );
}

export default LayoutPedagogie;
