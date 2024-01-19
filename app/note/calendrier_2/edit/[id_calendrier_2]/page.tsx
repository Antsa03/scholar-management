"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Calendrier_2_Form from "@/views/note/calendrier_2/Calendrier_2_Form";
import { SubmitHandler, useForm } from "react-hook-form";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import { showSwal } from "@/utils/swal";

function Calendrier_2_Edit() {
  const params = useParams();
  const router = useRouter();
  //Tout ce qui concerne calendrier_2
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Calendrier_2>({
    defaultValues: {
      id_calendrier_2: "",
      annee_universitaire_2: "",
      semestre: "",
      session: "",
    },
  });

  const fetchCalendrier_2 = async () => {
    try {
      const response = await fetch(
        `/api/note_1/calendrier_2/${params?.id_calendrier_2}`
      );
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCalendrier_2();
  }, [params?.id_calendrier_2]);

  const handleUpdateCalendrier2: SubmitHandler<Calendrier_2> = async (
    calendrier_2
  ) => {
    try {
      const response = await fetch(
        `/api/note_1/calendrier_2/update/${params?.id_calendrier_2}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calendrier_2),
        }
      );
      if (response.ok) {
        // alert("Calendrier créé avec succès");
        showSwal("Calendrier créé avec succès", "", "success");
        router.push("/note/calendrier_2");
      } else {
        // alert("Echec de la création de calendrier_2");
        showSwal("Echec de la création de calendrier_2", "", "error");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Calendrier_2_Form
      isUpdate
      register={register}
      handleSubmit={handleSubmit(handleUpdateCalendrier2)}
      errors={errors}
    />
  );
}

export default Calendrier_2_Edit;
