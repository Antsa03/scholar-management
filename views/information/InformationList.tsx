import Information from "@/models/information/listage/Information";
import React from "react";
import Link from "next/link";
import { ChevronsRight } from "react-feather";

interface InformationListProps {
  information: Information[];
  handleDelete: Function;
}

function InformationList({ information, handleDelete }: InformationListProps) {
  if (information) {
    return information.map((info, index) => (
      <div key={index} className="w-full">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Information à propos de l'étudiant
        </h1>

        <h2 className="h2 mt-4 mb-4">ID information: {info.id_information}</h2>
        <div className="flex flex-col px-8 py-8 border-[1px] -border--border-secondary-color rounded-xl w-[99%]">
          <div className="flex flex-row gap-14 m-4 mb-14">
            <div className=" flex items-center gap-8 text-black px-8 py-4  w-[400px] rounded-full shadow-md -bg--bg-ui-color-hover">
              <img
                src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${info.photo_profil}`}
                alt="Photo de profil"
                width={120}
                height={120}
              />
              <div>
                <p className="text-lg font-semibold ">
                  {info.nom} {info.prenoms}
                </p>
                <p> {info.num_matricule}</p>
              </div>
            </div>
            <div className=""></div>

            <div className="w-[350px] ">
              <p className="h2 text-blue-600">Information personnelle :</p>
              <p>Nom: {info.nom}</p>
              <p>Prénom(s): {info.prenoms}</p>
              <p>
                Date et lieu de naissance: {info.date_naissance} à{" "}
                {info.lieu_naissance}
              </p>
              <p>N° matricule: {info.num_matricule}</p>
              <p>Sexe: {info.sexe}</p>
              <p>Nationalité: {info.nationalite}</p>
            </div>
            <div className="w-[350px] mb-4">
              <p className="h2 text-blue-600">Information académique:</p>
              <p>Année universitaire: {info.annee_universitaire}</p>
              <p>ID niveau: {info.id_niveau}</p>
              <p>Niveau: {info.niveau}</p>
              <p>Groupe: {info.groupe}</p>
            </div>
          </div>
          <div className="flex fle-row gap-14 m-4">
            <div className="w-[400px] mb-4">
              <p className="h2 ">Contact information :</p>
              <p>Téléphone: {info.telephone}</p>
              <p>Email: {info.email}</p>
              <p>Adresse: {info.adresse}</p>
            </div>
            <div className="w-[350px] mb-4">
              <p className="h2 text-blue-600">Information administrative:</p>
              <p>ID observation: {info.id_obs}</p>
              <p>Admis: {info.admis}</p>
              <p>Situation: {info.situation}</p>
            </div>
            <div className="w-[350px] mb-4">
              <p className="h2 text-blue-600">Dates:</p>

              <p>Date d'inscription: {info.date_insc}</p>
              <p>Date d'arrêt: {info.date_arret}</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 mx-4">
            <button className=" text-white tracking-wider py-2 px-4 w-fit rounded-md transition-all delay-75 ease-in-out bg-yellow-600 hover:bg-yellow-600/90 hover:scale-105">
              <Link
                href={`/utilisateur/etudiant/information/edit/${info.id_obs}/${info.id_information}`}
              >
                Modifier
              </Link>
            </button>
            <button
              onClick={() => handleDelete(info.id_obs)}
              className={`  text-white tracking-wider py-2 px-4 w-fit rounded-md transition-all delay-75 ease-in-out bg-red-600 hover:bg-red-600/90 hover:scale-105`}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    ));
  } else return <h1>Chargement ou aucune information à afficher</h1>;
}

export default InformationList;
