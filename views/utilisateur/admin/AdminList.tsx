import Admin from "@/models/utilisateur/listage/Admin";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface AdminListProps {
  admins: Admin[];
  handleDelete: Function;
  handleRecherche_admin: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
}

function AdminList({
  admins,
  handleDelete,
  handleRecherche_admin,
  handleRecherche,
}: AdminListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des admninistrateurs
        </h1>
      </div>
      <div className="ml-32 flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleRecherche}>
          <input
            type="text"
            placeholder="Recherche"
            className="search-bar-input"
            onChange={handleRecherche_admin}
          />
          <button className="btn-search">
            <Search></Search>
          </button>
        </form>
      </div>

      <div className="container-table">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell"># Admin</th>
              <th className="table-header-cell">Nom</th>
              <th className="table-header-cell">Prénoms</th>
              <th className="table-header-cell">Sexe</th>
              <th className="table-header-cell">Fonction</th>
              <th className="table-header-cell">Adresse</th>
              <th className="table-header-cell">Téléphone</th>
              <th className="table-header-cell">Email</th>
              <th className="table-header-cell" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id_admin} className="table-row">
                <td className="table-row-cell">{admin.id_utilisateur}</td>
                <td className="table-row-cell">{admin.id_admin}</td>
                <td className="table-row-cell">{admin.nom}</td>
                <td className="table-row-cell">{admin.prenoms}</td>
                <td className="table-row-cell">{admin.sexe}</td>
                <td className="table-row-cell">{admin.fonction}</td>
                <td className="table-row-cell">{admin.adresse}</td>
                <td className="table-row-cell">{admin.telephone}</td>
                <td className="table-row-cell-email">{admin.email}</td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/utilisateur/admin/edit/${admin.id_utilisateur}/${admin.id_admin}`}
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
                <td className="px-1 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(admin.id_utilisateur)}
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

export default AdminList;
