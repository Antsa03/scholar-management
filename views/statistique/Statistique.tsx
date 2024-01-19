import CountsByYear from "@/models/dashboard/Stat";
import React from "react";
import { Bar } from "react-chartjs-2";
import { ChevronsRight } from "react-feather";

interface Option {
  scales: {
    y: {
      beginAtZero: boolean;
    };
  };
}

interface StatistiqueViewProps {
  stat: CountsByYear;
  options: Option;
}

function StatistiqueView({ stat, options }: StatistiqueViewProps) {
  return (
    <div className="section-container ">
      <div className="main-container  pl-32">
        <h1 className="h1 flex flex-row items-center gap-2 mb-5 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Statistiques des étudiants
        </h1>
        <div className="flex flex-col gap-12">
          {Object.entries(stat).map(([year, info]) => (
            <div key={year}>
              <h2 className="h2 mb-5">
                Année universitaire: {year} - Nombre total d'étudiants:{" "}
                {Number(info.total)}
              </h2>
              <div className="w-full md:w-[1000px]">
                <Bar
                  data={{
                    labels: Object.keys(info.byGroup),
                    datasets: [
                      {
                        label: "Nombre d'étudiants",
                        data: Object.values(info.byGroup),
                        backgroundColor: "rgba(75,192,192,0.6)",
                        borderColor: "rgba(75,192,192,1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(75,192,192,0.6)",
                        hoverBorderColor: "rgba(75,192,192,1)",
                      },
                    ],
                  }}
                  options={options}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatistiqueView;
