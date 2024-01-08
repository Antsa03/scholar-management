import NavbarTopNote from "@/components/note/NavbarTopNote";
import React from "react";

function LayoutNote({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container">
      <NavbarTopNote />
      <div className="main-container">{children}</div>
    </section>
  );
}

export default LayoutNote;
