import Enseignant_info from "@/models/information/Enseignant_info";
import React from "react";
import { ChevronsRight } from "react-feather";

interface EnseignantInfoViewProps {
  enseignant_info: Enseignant_info;
}

function EnseignantInfoView({ enseignant_info }: EnseignantInfoViewProps) {
  return (
    <div className="ml-4">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Information à propos de l'étudiant
      </h1>

      <h2 className="h2 mt-4 mb-4">
        ID enseignant: {enseignant_info.id_enseignant}
      </h2>
      <div className="flex flex-col px-8 py-8  w-[99%] border-[1px] -border--border-secondary-color rounded-xl">
        <div className="flex flex-row gap-14 m-4 mb-14">
          <div className=" flex items-center gap-8 text-black px-8 py-4  w-[400px] rounded-full shadow-md -bg--bg-ui-color-hover">
            <div className="w-[120px] h-[120px] overflow-hidden rounded-full">
              {" "}
              <img
                src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${enseignant_info.photo_profil}`}
                alt="Photo de profil"
                width={120}
                height={120}
              />
            </div>
            <div>
              <p className="text-lg font-semibold ">
                {enseignant_info.nom} {enseignant_info.prenoms}
              </p>
              <p> {enseignant_info.id_enseignant}</p>
            </div>
          </div>

          <div className="w-[350px]">
            <p className="h2 text-blue-600">Information personnelle :</p>
            <p>ID enseignant: {enseignant_info.id_enseignant}</p>
            <p>Nom: {enseignant_info.nom}</p>
            <p>Prénom(s): {enseignant_info.prenoms}</p>
            <p>Sexe: {enseignant_info.sexe}</p>
          </div>

          <div>
            <p className="h2 text-blue-600">Profil professionnel</p>
            <p>Diplôme: {enseignant_info.diplome}</p>
            <p>Grade: {enseignant_info.grade}</p>
            <p>Spécialité: {enseignant_info.specialite}</p>
            <p>Date de recrutement: {enseignant_info.date_recrutement}</p>
            <p>Date d'arrêt d'enseignement: {enseignant_info.date_arret_ens}</p>
          </div>

          <div className="w-[400px] mb-4">
            <p className="h2 ">Contact :</p>
            <p>Téléphone: {enseignant_info.telephone}</p>
            <p>Email: {enseignant_info.email}</p>
            <p>Adresse: {enseignant_info.adresse}</p>
          </div>
        </div>
        <div className="flex flex-col m-4">
          <p className="h2">Matière(s) enseignée(s):</p>
          <ol className="list-decimal list-inside">
            {enseignant_info.matieres.map((matiere, index) => (
              <li key={index} className="mb-1">
                <span className="-text--text-blue-color font-semibold mr-2">
                  {matiere.code_matiere}
                </span>
                <span>{matiere.designation_matiere}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default EnseignantInfoView;
