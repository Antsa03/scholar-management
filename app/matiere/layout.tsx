"use client";
import NavbarTopMatiere from "@/components/matiere/navbarTopMatiere";
import React from "react";

function LayoutMatiere({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container">
      <div className="main-container">{children}</div>
    </section>
  );
}

export default LayoutMatiere;
