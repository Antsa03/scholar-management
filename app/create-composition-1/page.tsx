"use client";
import React from "react";
import Composition1 from "@/public/json/composition1.json";

function Page() {
  const saveComposition1 = async () => {
    Composition1.forEach(async (composition_1) => {
      const response = await fetch("/api/composition/composition1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(composition_1),
      });
      if (response.ok) console.log("Composition_1 crée");
      else console.error(response);
    });
  };
  return (
    <div>
      <button onClick={saveComposition1}>Enregister composition 1</button>
      <pre>{JSON.stringify(Composition1, null, 2)}</pre>
    </div>
  );
}

export default Page;
