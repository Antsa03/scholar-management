"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Composition1_Form from "@/views/composition/composition_1/Composition1_Form";
import Matiere from "@/models/enseignement/Matiere";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import { SubmitHandler, useForm } from "react-hook-form";
import Composer_1 from "@/models/composition/Composer_1";
import { showSwal } from "@/utils/swal";

function Composer1_Edit() {
  const router = useRouter();

  const params = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Composer_1>({
    defaultValues: {
      id_composer_1: "",
      code_matiere: "",
      id_ue: "",
      annee_universitaire_1: "",
    },
  });

  const fetchComposer_1 = async () => {
    try {
      const response = await fetch(
        `/api/composition/composition1/${params?.id_composer_1}`
      );
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [matieres, setMatieres] = useState<Array<Matiere>>([]);
  const fetchMatieres = async () => {
    try {
      const response = await fetch("/api/enseignement/matiere");
      const data = await response.json();
      setMatieres(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [unite_enseignements, setUnite_enseignements] = useState<
    Array<Unite_enseignement>
  >([]);
  const fetchUnite_enseignements = async () => {
    try {
      const response = await fetch("/api/enseignement/unite_enseignement");
      const data = await response.json();
      setUnite_enseignements(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMatieres();
    fetchUnite_enseignements();
  }, []);

  useEffect(() => {
    fetchComposer_1();
  }, [params?.id_composer_1, matieres, unite_enseignements]);

  const handleComposer1: SubmitHandler<Composer_1> = async (composer_1) => {
    try {
      const response = await fetch(
        `/api/composition/composition1/update/${params?.id_composer_1}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(composer_1),
        }
      );
      if (response.ok) {
        showSwal("Modification de composition1 avec succès", "", "success");
        router.push("/composition/composition_1");
      } else {
        showSwal("Echec de la modification de composition1", "", "success");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Composition1_Form
      isUpdate={true}
      register={register}
      matieres={matieres}
      unite_enseignements={unite_enseignements}
      handleSubmit={handleSubmit(handleComposer1)}
      errors={errors}
    />
  );
}

export default Composer1_Edit;
