"use client";
import Relation from "@/models/utilisateur/Relation";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import Responsable_legal from "@/models/utilisateur/listage/Responsable_legal";
import { showToast } from "@/utils/swal";
import RelationForm from "@/views/utilisateur/relation/RelationForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

function RelationCreate() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Relation>({
    defaultValues: {
      id_relation: "",
      id_responsable_legal: "",
      num_matricule: "",
    },
  });

  const [responsable_legals, setResponsableLegals] = useState<
    Array<Responsable_legal>
  >([]);
  const fetchResponsableLegals = async () => {
    try {
      const response = await fetch("/api/utilisateur/responsable_legal");
      const data = await response.json();
      setResponsableLegals(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [etudiants, setEtudiants] = useState<Array<Etudiant>>([]);
  const fetchEtudiants = async () => {
    try {
      const response = await fetch("/api/utilisateur/etudiant");
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResponsableLegals();
    fetchEtudiants();
  }, []);

  const handleRelation: SubmitHandler<Relation> = async (relation) => {
    try {
      const response = await fetch("/api/utilisateur/relation/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(relation),
      });
      if (response.ok) {
        //show dialogue alerte
        showToast("La relation parentale a été ajoutée", "", "success");

        // alert("Relation créée avec succès");
        router.push("/utilisateur/relation");
      } else {
        Swal.fire(
          "Erreur",
          "Echec de la création, veuillez vérifier les champs!",
          "error"
        );
        console.error(response);
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Erreur",
        "Echec de la création, veuillez vérifier les champs!",
        "error"
      );
    }
  };

  return (
    <RelationForm
      isUpdate={false}
      register={register}
      responsable_legals={responsable_legals}
      etudiants={etudiants}
      onSubmit={handleSubmit(handleRelation)}
      errors={errors}
    />
  );
}

export default RelationCreate;
