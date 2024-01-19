"use client";
import React, { useEffect, useState } from "react";
import CountsByYear from "@/models/dashboard/Stat";
import Image from "next/image";
import Calendar from "@/public/img/calendar.png";
import Student from "@/public/img/student.png";
import { IonIcon } from "@ionic/react";
import { home } from "ionicons/icons";

function Accueil() {
  const [stat, setStat] = useState<CountsByYear>({});
  const fetchStat = async () => {
    try {
      const response = await fetch("/api/dashboard/etudiant");
      const data = await response.json();
      setStat(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStat();
  }, []);

  return (
    <section className="section-container">
      <div className="main-container-accueil">
        <h1 className="h1 flex flex-row justify-start gap-4 mb-4">
          <IonIcon
            icon={home}
            className="-text--text-blue-color ion-icon-middle"
          ></IonIcon>
          Bienvenue sur Scholar Management
        </h1>
        <h2 className="h2 mb-4">
          Nombre total d'élève chaque année universitaire :
        </h2>
        {Object.entries(stat).map(([year, info]) => (
          <div
            key={year}
            className="flex flex-row justify-start items-center gap-4 px-6 py-2  text-lg tracking-wide -bg--bg-secondary-color mb-2 border-[1px] border-gray-300 rounded-md"
          >
            <div className="flex flex-row flex-1 gap-4 items-center">
              <div className="w-[80px] h-3/4 shadow-sm rounded-full p-5">
                <Image src={Calendar} alt="Logo calendrier"></Image>
              </div>
              <p className="flex-1 text-xl -text--text-secondary-color ">
                Année universitaire :
                <span className="text-2xl font-bold px-2 tracking-wider">
                  {year}
                </span>
              </p>
            </div>

            <div className="flex flex-row flex-1 gap-4 items-center">
              <div className="w-[80px] h-3/4 shadow-sm rounded-full p-5">
                <Image src={Student} alt="Logo calendrier"></Image>
              </div>
              <p className="flex-1 text-xl -text--text-secondary-color ">
                Nombre total d'étudiants :
                <span className="text-2xl font-bold px-2 tracking-wider">
                  {" "}
                  {Number(info.total)} étudiants
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Accueil;
