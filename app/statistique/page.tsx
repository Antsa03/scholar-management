"use client";
import CountsByYear from "@/models/dashboard/Stat";
import StatistiqueView from "@/views/statistique/Statistique";
import Chart, { LinearScale } from "chart.js/auto";
import React, { useState, useEffect } from "react";

function Statistique_etudiant() {
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

  Chart.register(LinearScale);
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <StatistiqueView stat={stat} options={options} />;
}

export default Statistique_etudiant;
