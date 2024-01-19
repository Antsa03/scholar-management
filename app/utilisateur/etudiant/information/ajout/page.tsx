"use client";
import Niveau from "@/models/pedagogie/Niveau";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { calculateLevenshteinDistance } from "@/utils/levenshteinDistance";
import { showSwal } from "@/utils/swal";
import InformationForm from "@/views/information/InformationForm";
import ObservationForm from "@/views/information/ObservationForm";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronsRight } from "react-feather";
import Swal from "sweetalert2";

function Information_Ajout() {
  const router = useRouter();
  // Tout ce qui concerne l'observation
  const [observation, setObservation] = useState({
    id_obs: "",
    admis: "",
    situation: "",
    date_insc: "",
    date_arret: "",
  });

  const handleInputObservation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setObservation({
      ...observation,
      [event.target.name]: event.target.value,
    });
  };

  const handleObservation = async () => {
    try {
      const response = await fetch("/api/information/observation/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(observation),
      });
      if (response.ok) console.log("Observation créée avec succès");
      else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne l'information
  const [information, setInformation] = useState({
    id_information: "",
    num_matricule: "",
    annee_universitaire_5: "",
    id_obs: "",
    id_niveau: "",
    groupe: "",
  });

  const handleInputInformation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInformation({
      ...information,
      [event.target.name]: event.target.value,
    });
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

  useEffect(() => {
    fetchNiveaux();
  }, []);

  const handleInformation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleObservation();
    try {
      const response = await fetch("/api/information/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(information),
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
          title: "Information créée avec succès",
        });

        router.push(
          `/utilisateur/etudiant/information/${information.num_matricule}`
        );
      } else {
        showSwal("Echec de la création de l'information", "", "success");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Afficher la liste des étudiants
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
    fetchEtudiants();
  }, []);

  // L'état de l'affichage de l'étudiants
  const [showAllEtudiants, setShowAllEtudiants] = useState<boolean>(false);
  const handleShowAllEtudiants = () => {
    setSuggestions_etudiants([]);
    setShowAllEtudiants(!showAllEtudiants);
  };

  // Suggestions des étudiants
  const [suggestions_etudiants, setSuggestions_etudiants] = useState<
    Array<Etudiant>
  >([]);
  const setNum_matricule = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (information.num_matricule !== "") {
      setSuggestions_etudiants(
        etudiants.filter(
          (item) =>
            item &&
            item.num_matricule &&
            typeof item.num_matricule === "string" &&
            calculateLevenshteinDistance(
              item.num_matricule,
              event.target.value
            ) <= 2
        )
      );
    }
    if (event.target.value === "") setSuggestions_etudiants([]);
    setInformation({
      ...information,
      num_matricule: event.target.value,
    });
  };

  const handleClickSuggestion_etudiant = (value: string) => {
    setInformation({ ...information, num_matricule: value });
    setSuggestions_etudiants([]);
  };

  const handleClickAllEtudiant = (value: string) => {
    setInformation({ ...information, num_matricule: value });
    setShowAllEtudiants(false);
    setSuggestions_etudiants([]);
  };

  return (
    <div className="main-child-container">
      <div className="flex flex-col gap-4  items-center  custom-lg:items-start w-full">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Information supplémentaire à propos de l'étudiant
        </h1>

        <div className="flex flex-row gap-28">
          <ObservationForm
            isUpdate={false}
            observation={observation}
            handleInputChange={handleInputObservation}
          />
          <InformationForm
            isUpdate={false}
            id_obs={observation.id_obs}
            niveaux={niveaux}
            information={information}
            handleInputChange={handleInputInformation}
            etudiants={etudiants}
            showAllEtudiants={showAllEtudiants}
            handleShowAllEtudiants={handleShowAllEtudiants}
            suggestions_etudiants={suggestions_etudiants}
            setNum_matricule={setNum_matricule}
            handleClickSuggestion_etudiant={handleClickSuggestion_etudiant}
            handleClickAllEtudiant={handleClickAllEtudiant}
            handleSubmit={handleInformation}
          />
        </div>
      </div>
    </div>
  );
}

export default Information_Ajout;
