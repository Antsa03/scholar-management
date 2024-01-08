"use client";
import Composer_3 from "@/models/composition/Composer_3";
import Niveau from "@/models/pedagogie/Niveau";
import Parcours from "@/models/pedagogie/Parcours";
import Composition3_Form from "@/views/composition/composition_3/Composition3_Form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Composer3_Ajout() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Composer_3>({
    defaultValues: {
      id_composer_3: "",
      id_niveau: "",
      id_parcours: "",
    },
  });

  const [niveaux, setNiveaux] = useState<Array<Niveau>>([]);
  const fetchNiveaux = async () => {
    try {
      const response = await fetch("/api/pedagogie/niveau");
      const data = await response.json();
      setNiveaux(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [parcours, setParcours] = useState<Array<Parcours>>([]);
  const fetchParcours = async () => {
    try {
      const response = await fetch("/api/pedagogie/parcours");
      const data = await response.json();
      setParcours(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNiveaux();
    fetchParcours();
  }, []);

  const handleComposer_3: SubmitHandler<Composer_3> = async (composer_3) => {
    try {
      const response = await fetch("/api/composition/composition3/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(composer_3),
      });
      if (response.ok) {
        //show dialogue alerte
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: true,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "La composition3 a été crée avec succès",
        });

        router.push("/composition/composition_3");
      } else {
        alert("Echec de la création de composition3");
        Swal.fire(
          "Erreur",
          "Echec de la création de composition3, veuillez vérifier les champs!",
          "error"
        );
        console.error(response);
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Erreur",
        "Echec de la création de composition3 , veuillez vérifier les champs!",
        "error"
      );
    }
  };

  return (
    <Composition3_Form
      isUpdate={false}
      register={register}
      niveaux={niveaux}
      parcours={parcours}
      handleSubmit={handleSubmit(handleComposer_3)}
      errors={errors}
    />
  );
}

export default Composer3_Ajout;
