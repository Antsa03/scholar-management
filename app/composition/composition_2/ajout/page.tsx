"use client";
import Composer_2 from "@/models/composition/Composer_2";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import Parcours from "@/models/pedagogie/Parcours";
import { showSwal } from "@/utils/swal";
import Composition2_Form from "@/views/composition/composition_2/Composition2_Form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Composition2_Ajout() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Composer_2>({
    defaultValues: {
      id_composer_2: "",
      id_parcours: "",
      id_ue: "",
    },
  });

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

  const [unite_enseignements, setUnite_enseignements] = useState<
    Array<Unite_enseignement>
  >([]);
  const fetchUnite_enseignement = async () => {
    try {
      const response = await fetch("/api/enseignement/unite_enseignement");
      const data = await response.json();
      setUnite_enseignements(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchParcours();
    fetchUnite_enseignement();
  }, []);

  const handleComposer_2: SubmitHandler<Composer_2> = async (composer_2) => {
    try {
      const response = await fetch("/api/composition/composition2/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(composer_2),
      });
      if (response.ok) {
        //show dialogue alerte
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "La composition2 a été crée avec succès",
        });
        router.push("/composition/composition_2");
      } else {
        showSwal(
          "Erreur",
          "Echec de la création de composition2, veuillez vérifier les champs!",
          "error"
        );
        console.error(response);
      }
    } catch (error) {
      console.error(error);
      showSwal(
        "Erreur",
        "Echec de la création de composition2, veuillez vérifier les champs!",
        "error"
      );
    }
  };

  return (
    <Composition2_Form
      isUpdate={false}
      register={register}
      parcours={parcours}
      unite_enseignements={unite_enseignements}
      handleSubmit={handleSubmit(handleComposer_2)}
      errors={errors}
    />
  );
}

export default Composition2_Ajout;
