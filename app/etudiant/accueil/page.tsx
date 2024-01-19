"use client";
import React from "react";
import Lottie from "lottie-react";
import AnimationData from "@/public/lotties/ComputerServer.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

function Accueil_etudiant() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className=" flex flex-col justify-center items-start gap-12 pb-12 px-12">
        <h1 className="font-poppins text-lg sm:text-2xl md:text-4xl leading-10 -text--text-blue-color tracking-wide  dark:-text--text-dark-secondary-color ">
          " Bienvenue sur ESTI scholar management "
        </h1>
        <button
          onClick={() => router.push("/etudiant/note")}
          className="text-white text-lg -bg--bg-solid-blue font-poppins tracking-wide px-12 py-4 rounded-lg hover:-bg--bg-solid-blue/95 hover:scale-105 transition-all delay-75 ease-in-out"
        >
          Voir vos notes
          <FontAwesomeIcon icon={faArrowRight} className="text-lg ml-4" />
        </button>
      </div>
      <div className="w-fit h-fit lg:-translate-x-16">
        <Lottie
          animationData={AnimationData}
          className=" w-full h-full sm:w-[600px] s:h-[600px] md:w-[800px] md:h-[800px]"
        />
      </div>
    </div>
  );
}

export default Accueil_etudiant;
