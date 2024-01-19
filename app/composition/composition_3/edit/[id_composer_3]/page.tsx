"use client";
import Composer_3 from "@/models/composition/Composer_3";
import Niveau from "@/models/pedagogie/Niveau";
import Parcours from "@/models/pedagogie/Parcours";
import { showSwal } from "@/utils/swal";
import Composition3_Form from "@/views/composition/composition_3/Composition3_Form";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function Composer3_Edit() {
  const params = useParams();

  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Composer_3>({
    defaultValues: {
      id_composer_3: "",
      id_niveau: "",
      id_parcours: "",
    },
  });

  const fetchComposer3 = async () => {
    try {
      const response = await fetch(
        `/api/composition/composition3/${params?.id_composer_3}`
      );
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    fetchComposer3();
  }, [params?.id_composer_3, parcours, niveaux]);

  const handleUpdate: SubmitHandler<Composer_3> = async (composer_3) => {
    try {
      const response = await fetch(
        `/api/composition/composition3/update/${params?.id_composer_3}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(composer_3),
        }
      );
      if (response.ok) {
        // alert("Modification de composition 3 avec succès");
        showSwal(
          "Modification de compostition 3 effectuée avec succès ",
          "",
          "success"
        );
        router.push("/composition/composition_3");
      } else {
        showSwal("Echec de la modification de composition 3", "", "error");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Composition3_Form
      isUpdate={true}
      register={register}
      niveaux={niveaux}
      parcours={parcours}
      handleSubmit={handleSubmit(handleUpdate)}
      errors={errors}
    />
  );
}

export default Composer3_Edit;
