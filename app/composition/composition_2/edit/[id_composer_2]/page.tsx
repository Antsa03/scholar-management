"use client";
import Composer_2 from "@/models/composition/Composer_2";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import Parcours from "@/models/pedagogie/Parcours";
import { showSwal } from "@/utils/swal";
import Composition2_Form from "@/views/composition/composition_2/Composition2_Form";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function Composition2_Ajout() {
  const params = useParams();

  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Composer_2>({
    defaultValues: {
      id_composer_2: "",
      id_parcours: "",
      id_ue: "",
    },
  });

  const fetchComposer2 = async () => {
    try {
      const response = await fetch(
        `/api/composition/composition2/${params?.id_composer_2}`
      );
      const data = await response.json();
      reset(data);
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

  useEffect(() => {
    fetchComposer2();
  }, [params?.id_composer_2, parcours, unite_enseignements]);

  const handleUpdate: SubmitHandler<Composer_2> = async (composer_2) => {
    try {
      const response = await fetch(
        `/api/composition/composition2/update/${params?.id_composer_2}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(composer_2),
        }
      );
      if (response.ok) {
        // alert("Modification de composition2 avec succès");
        showSwal(
          "Modification de composition 2 effectuée avec succès",
          "",
          "success"
        );
        router.push("/composition/composition_2");
      } else {
        console.error(response);
        // alert("Echec lors de la modification de composition2");
        showSwal("Echec lors de la modification de composition 2", "", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Composition2_Form
      isUpdate={true}
      register={register}
      parcours={parcours}
      unite_enseignements={unite_enseignements}
      handleSubmit={handleSubmit(handleUpdate)}
      errors={errors}
    />
  );
}

export default Composition2_Ajout;
