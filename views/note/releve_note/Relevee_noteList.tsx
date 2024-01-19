import Matiere_note from "@/models/note_1/Matiere_note";
import Releve_note from "@/models/note_1/Releve_note";
import React, { Fragment } from "react";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import UE_note from "@/models/note_1/UE_note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFilePdf,
  faFileWord,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ChevronsRight } from "react-feather";

interface Relevee_noteProps {
  releve_note: Releve_note;
  generatePdf: Function;
  generatePdf_1: Function;
  generateDoc: Function;
  generateExcel: Function;
}

function Relevee_noteList({
  releve_note,
  generatePdf,
  generatePdf_1,
  generateDoc,
  generateExcel,
}: Relevee_noteProps) {
  const [isGeneratePdf, setIsGeneratePdf] = useState(false);
  const [isGeneratePdf1, setIsGeneratePdf1] = useState(false);
  const [isGenerateDoc, setIsGenerateDoc] = useState(false);
  const [isGenerateExcel, setIsGenerateExcel] = useState(false);

  let moy_ue = 0;
  let coeff_somme = 0;
  let date = new Date();
  const formattedDate = format(date, "d MMMM yyyy", { locale: fr });
  let validation = "";
  let validation_1 = "";
  let moy_ue_tab: string[] = [];
  let validation_tab: string[] = [];
  releve_note.unite_enseignements.forEach((ue: UE_note) => {
    moy_ue = 0;
    coeff_somme = 0;
    ue.matieres.map((matiere: Matiere_note) => {
      validation_1 = "";
      coeff_somme += parseFloat(matiere.coeff.replace(",", "."));
      moy_ue +=
        parseFloat(matiere.coeff.replace(",", ".")) *
        parseFloat(matiere.note_matiere.replace(",", "."));
      if (parseFloat(matiere.note_matiere.replace(",", ".")) < 5)
        validation_1 = "Non validé";
    });
    moy_ue = moy_ue / coeff_somme;
    moy_ue_tab.push(moy_ue.toFixed(2).replace(".", ","));
    validation =
      validation_1 === "Non validé"
        ? validation_1
        : moy_ue >= 10
        ? "Validé"
        : "Non validé";
    validation_tab.push(validation);
  });
  return (
    <div className=" ml-32 flex flex-col  relative w-full">
      <div className=" mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Relevé de note
        </h1>
      </div>
      <div className=" flex flex-col gap-12 w-fit">
        <div className="flex flex-col gap-4 items-start px-8 py-4 border-[1px] -border--border-primary-color rounded-md">
          <h2 className="h2">Télécharger le relevé de note en version pdf</h2>
          <div className="flex flex-row gap-12">
            <button
              onClick={async (event) => {
                setIsGeneratePdf1(true);
                await generatePdf_1();
                setIsGeneratePdf1(false);
              }}
              className="w-[360px] bg-teal-600  hover:bg-teal-500 hover:scale-105  text-white rounded-lg  px-4 flex flew-row items-center justify-center gap-2 py-2 transition-all delay-75 ease-in-out"
            >
              {isGeneratePdf1 ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    fontSize={28}
                    className="animate-spin"
                  />
                  PDF avec en-tête et pieds de page
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faFilePdf} fontSize={28} /> PDF avec
                  en-tête et pieds de page
                </>
              )}
            </button>

            <button
              onClick={async () => {
                setIsGeneratePdf(true);
                await generatePdf();
                setIsGeneratePdf(false);
              }}
              className="w-[360px] bg-red-600 hover:bg-red-500 hover:scale-105 text-white rounded-lg  px-4 flex flew-row items-center justify-center gap-2 py-2 transition-all delay-75 ease-in-out"
            >
              {isGeneratePdf ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    fontSize={28}
                    className="animate-spin"
                  />
                  PDF sans en-tête et sans pieds de page
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faFilePdf} fontSize={28} /> PDF sans
                  en-tête et sans pieds de page
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start px-8 py-4 border-[1px] -border--border-primary-color rounded-md">
          <h2 className="h2">
            Télécharger le relevé de note en version word ou excel
          </h2>
          <div className="flex flex-row gap-8">
            <button
              onClick={async () => {
                setIsGenerateDoc(true);
                await generateDoc();
                setIsGenerateDoc(false);
              }}
              className="w-[360px] bg-blue-600 hover:bg-blue-500 hover:scale-105 text-white rounded-lg  px-4 flex flew-row items-center justify-center gap-2 py-2 transition-all delay-75 ease-in-out"
            >
              {isGenerateDoc ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    fontSize={28}
                    className="animate-spin"
                  />
                  Docx
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faFileWord} fontSize={28} />
                  Docx
                </>
              )}
            </button>
            <button
              onClick={async () => {
                setIsGenerateExcel(true);
                await generateExcel();
                setIsGenerateExcel(false);
              }}
              className="w-[360px] bg-green-600 hover:bg-green-500 hover:scale-105 text-white rounded-lg  px-4 flex flew-row items-center justify-center gap-2 py-2 transition-all delay-75 ease-in-out"
            >
              {isGenerateExcel ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    fontSize={28}
                    className="animate-spin"
                  />
                  Excel
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faFileExcel} fontSize={28} /> Excel
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="w-[80%] flex flex-col min-h-[1000px] -text--text-secondary-color tracking-wider">
        <div className="w-full">
          <div>
            <img src="/img/logo.png" alt="logo" width={150} height={80} />
            <p>Ecole Supérieur des Technologies de l'Information</p>
          </div>
          <div className="flex font-bold text-lg  mt-4">
            <div>
              <p>{releve_note.nom + " " + releve_note.prenoms}</p>
              <p>Relevé des notes - Semestre {releve_note.semestre}</p>
              <p>Session {releve_note.session}</p>
              <p>Année académique: {releve_note.annee_universitaire_2}</p>
            </div>
            <div className="ml-[260px]">
              <p className="opacity-0">Text opacity 0</p>
              <p>N° matricule: {releve_note.num_matricule}</p>
              <p>Inscrit en: {releve_note.designation_niveau}</p>
              <p>Groupe: {releve_note.groupe}</p>
            </div>
          </div>
          <h2 className="text-center font-bold mt-8">Notes et résultats</h2>
          <table className="border-[1px] border-black w-[95%]">
            <thead>
              <tr className="border-[1px] border-black text-center pt-[12px] pb-[12px]">
                <th className="border-[1px] border-black w-[95px] pt-[12px] pb-[12px]">
                  Code
                </th>
                <th className="border-[1px] border-black">Matières</th>
                <th className="border-[1px] border-black w-[70px]">Coeff</th>
                <th className="border-[1px] border-black w-[70px]">Note</th>
                <th className="border-[1px] border-black w-[100px]">
                  Note Pondérée
                </th>
                <th className="border-[1px] border-black w-[80px]">Obs</th>
              </tr>
            </thead>
            <tbody>
              {releve_note.unite_enseignements.map((ue: any, index) => (
                <Fragment key={ue.id_ue}>
                  <tr className="border-[1px] border-black pt-[12px] pb-[12px]">
                    <td
                      colSpan={5}
                      className="border-[1px] border-black font-bold text-center pt-[12px] pb-[12px]"
                    >
                      {"UE " +
                        ue.designation_ue +
                        " (" +
                        ue.credit +
                        " crédits max.)"}
                    </td>
                  </tr>
                  {ue.matieres.map((matiere: any, index: number) => (
                    <tr
                      key={index}
                      className="border-[1px] border-black pt-[12px] pb-[12px]"
                    >
                      <td className="border-[1px] border-black font-bold pt-[12px] pb-[12px]">
                        {matiere.code_matiere}
                      </td>
                      <td className="border-[1px] border-black">
                        {matiere.designation_matiere}
                      </td>
                      <td className="border-[1px] border-black text-center">
                        {matiere.coeff}
                      </td>
                      <td className="border-[1px] border-black text-center">
                        {matiere.note_matiere}
                      </td>
                      <td className="border-[1px] border-black text-center">
                        {(
                          parseFloat(matiere.coeff.replace(",", ".")) *
                          parseFloat(matiere.note_matiere.replace(",", "."))
                        )
                          .toFixed(2)
                          .replace(".", ",")}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-[1px] border-black pt-[12px] pb-[12px]">
                    <td className="border-[1px] border-black"></td>
                    <td className="border-[1px] border-black"></td>
                    <td
                      colSpan={2}
                      className="border-[1px] border-black font-bold text-center"
                    >
                      Moy UE
                    </td>
                    <td className="border-[1px] border-black pt-[12px] pb-[12px] text-center">
                      {moy_ue_tab[index]}
                    </td>
                    <td className="border-[1px] border-black text-right">
                      {validation_tab[index]}
                    </td>
                  </tr>
                </Fragment>
              ))}
              <tr className="pt-[12px] pb-[12px]">
                <td className="border-[1px] border-black font-bold">
                  {"Semestre " +
                    "(" +
                    releve_note.somme_coeff +
                    " crédits max.)"}
                </td>
                <td className="border-[1px] border-black"></td>
                <td
                  colSpan={2}
                  className="border-[1px] border-black font-bold text-center"
                >
                  Moy.GEN
                </td>
                <td className="border-[1px] border-black pt-[12px] pb-[12px] text-center">
                  {releve_note.moy_semestre.replace(".", ",")}
                </td>
                <td className="border-[1px] border-black"></td>
              </tr>
            </tbody>
          </table>
          <p className="ml-[70%] mt-[2%] mb-[10%]">
            Antananarivo le {formattedDate}
          </p>
          <div className="text-center border-t-[2px] border-[#f8A102] font-semibold">
            <p className="mt-4">
              ESTI - 5 rue Pasteur - Immeuble CCIA - Antanimena - Antananarivo
              101 - Madagascar
            </p>
            <p>
              Tel: +261 (0) 20 22 248 74 - Email : contact@esti.mg - Site :
              www.esti.mg
            </p>
            <p>NIF : 2002526104 - STAT : 85492 11 2016 0 06989</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Relevee_noteList;
