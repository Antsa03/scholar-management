"use client";
import React from "react";
import { useState } from "react";
import AdministrateurFormulaire from "./AdministrateurFormulaire";
import EtudiantFormulaire from "./EtudiantFormulaire";
import ResponsableLegalFormulaire from "./ResponsableLegalFormulaire";
import EnseignantFormulaire from "./EnseignantFormulaire";
import { UseFormTrigger } from "react-hook-form";
import Utilisateur from "@/models/utilisateur/Utilisateur";

interface renderedUtilisateurProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
  trigger_utilisateur_form: UseFormTrigger<Utilisateur>;
}

function RenderedUtilisateurSpecifique({
  handleUtilisateur,
  id_utilisateur,
  router,
  trigger_utilisateur_form,
}: renderedUtilisateurProps) {
  const [inputChecked, SetInputChecked] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetInputChecked(e.target.value);
  };

  const renderComponent = (inputChecked: string) => {
    switch (inputChecked) {
      case "enseignant":
        return (
          <EnseignantFormulaire
            handleUtilisateur={handleUtilisateur}
            id_utilisateur={id_utilisateur}
            router={router}
            trigger_utilisateur_form={trigger_utilisateur_form}
          />
        );
      case "etudiant":
        return (
          <EtudiantFormulaire
            handleUtilisateur={handleUtilisateur}
            id_utilisateur={id_utilisateur}
            router={router}
            trigger_utilisateur_form={trigger_utilisateur_form}
          />
        );
      case "responsable":
        return (
          <ResponsableLegalFormulaire
            handleUtilisateur={handleUtilisateur}
            id_utilisateur={id_utilisateur}
            router={router}
            trigger_utilisateur_form={trigger_utilisateur_form}
          />
        );
      default:
        return (
          <AdministrateurFormulaire
            handleUtilisateur={handleUtilisateur}
            id_utilisateur={id_utilisateur}
            router={router}
            trigger_utilisateur_form={trigger_utilisateur_form}
          />
        );
    }
  };

  return (
    <div className="w-fit">
      <div className="flex flex-col">
        <div className="container-input">
          <label htmlFor="sexe" className="h2">
            Information selon le type d'utilisateur
          </label>
          <div className="container-input">
            <label htmlFor="" className="text-sm">
              {" "}
              Veuillez choisir le type d'utilisateur :
            </label>

            <div className="flex flex-row text-[18px] gap-3 mb-4 w-[450px]">
              <div className="flex flex-row items-center gap-1 w-auto">
                <span>Admin</span>
                <input
                  type="radio"
                  name="sexe"
                  className=""
                  value="admin"
                  onChange={handleChange}
                  defaultChecked={true}
                />
              </div>
              <div className="flex flex-row items-center gap-1 w-auto">
                <span>Enseignant</span>
                <input
                  type="radio"
                  name="sexe"
                  className=""
                  value="enseignant"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row items-center gap-1 w-auto">
                <span>Etudiant</span>
                <input
                  type="radio"
                  name="sexe"
                  className=""
                  value="etudiant"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row items-center flex-nowrap gap-1 w-auto">
                <span className="whitespace-no-wrap">Responsable légal</span>
                <input
                  type="radio"
                  name="sexe"
                  className=""
                  value="responsable"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderComponent(inputChecked)}
    </div>
  );
}

export default RenderedUtilisateurSpecifique;
