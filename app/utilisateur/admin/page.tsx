"use client";
import { useState, useEffect } from "react";
import AdminList from "@/views/utilisateur/admin/AdminList";
import Admin from "@/models/utilisateur/listage/Admin";
import Swal from "sweetalert2";
import { showSwalWithoutConfirm, showSwal } from "@/utils/swal";

function Administrateur() {
  // Authentification pour les admins
  const [admins, setAdmins] = useState<Array<Admin>>([]);

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/utilisateur/admin");
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id_utilisateur: string) => {
    try {
      const result = await Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimez-le!",
        cancelButtonText: "Non, annulez!",
        // customClass: "custom-alert",
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `/api/utilisateur/delete/${id_utilisateur}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          showSwalWithoutConfirm(
            "Supprimé",
            "L'administrateur a été supprimé.",
            "success"
          );
          fetchAdmins();
        } else {
          showSwal("Annulé", "Echec de la suppression!", "error");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const [search_value, setSearch_value] = useState("");
  const fetchRecherche_admin = async () => {
    try {
      const response = await fetch("/api/recherche/utilisateur/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_value),
      });
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_admin = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchAdmins();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_admin();
  };

  return (
    <AdminList
      admins={admins}
      handleDelete={handleDelete}
      handleRecherche_admin={handleRecherche_admin}
      handleRecherche={handleRecherche}
    />
  );
}

export default Administrateur;
