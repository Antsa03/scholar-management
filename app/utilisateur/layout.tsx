import React from "react";
import NavbarTopUtilisateur from "@/components/utilisateur/navbarTopUtilisateur";

function UtilisateurLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-container">
      {" "}
      <div className="main-container">{children}</div>
    </section>
  );
}

export default UtilisateurLayout;
