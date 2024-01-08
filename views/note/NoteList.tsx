import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";
import { UseFormRegister } from "react-hook-form";
import Noter_1_liste from "@/models/note_1/listage-note/Note_listage";

interface Search {
  search: string;
  code_matiere: string;
}

interface NoteListProps {
  noter_1: Noter_1_liste[];
  handleDelete: Function;
  register: UseFormRegister<Search>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  listAll: Function;
}

function NoteList({
  noter_1,
  handleDelete,
  register,
  handleSubmit,
  listAll,
}: NoteListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className="ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des notes des étudiants
        </h1>
      </div>
      <div className="flex flex-row gap-8 ml-32">
        <form className="flex flex-row w-fit z-0" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="N° matricule ou nom"
            {...register("search")}
            className="search-bar-input"
          />
          <input
            type="text"
            placeholder="Code matière"
            {...register("code_matiere")}
            className="search-bar-input ml-6"
          />
          <button className="btn-search">
            <Search></Search>
          </button>
        </form>
        <button onClick={() => listAll()} className="btn-list-all">
          Tout lister
        </button>
      </div>
      <div className="text-center mt-6 container-table">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell"># calendrier_2</th>
              <th className="table-header-cell">N° matricule</th>
              <th className="table-header-cell">Nom</th>
              <th className="table-header-cell">Prénom(s)</th>
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell">Note matière</th>
              <th className="table-header-cell" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {noter_1.map((noter, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{noter.id_noter_1}</td>
                <td className="table-row-cell">{noter.id_calendrier_2}</td>
                <td className="table-row-cell">{noter.num_matricule}</td>
                <td className="table-row-cell">{noter.nom}</td>
                <td className="table-row-cell">{noter.prenoms}</td>
                <td className="table-row-cell">{noter.code_matiere}</td>
                <td className="table-row-cell">{noter.note_matiere}</td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/note/edit/${noter.id_noter_1}`}
                      className="link-edit"
                    >
                      <FontAwesomeIcon
                        className="icon-fa-edit "
                        icon={faEdit}
                        fontSize={28}
                      />
                    </Link>
                  </button>
                </td>
                <td className="table-row-cell">
                  <button
                    onClick={() => handleDelete(noter.id_noter_1)}
                    className="tooltip-supprimer link-delete"
                    data-tooltip="Supprimer"
                  >
                    <FontAwesomeIcon
                      className="icon-fa-delete"
                      icon={faTrash}
                      fontSize={28}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NoteList;
