"use client";
import React from "react";
import { IonIcon } from "@ionic/react";
import { reorderTwo, closeOutline } from "ionicons/icons";
import { useSession } from "next-auth/react";

interface SidebarShowProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

function SidebarShow({ toggleSidebar, isSidebarOpen }: SidebarShowProps) {
  const { data: session }: any = useSession();
  if (session?.role === "Etudiant") return null;
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="absolute  z-[1000] 2xl:hidden hover:rounded-full  top-4 right-2"
      >
        {" "}
        {isSidebarOpen ? (
          <IonIcon
            icon={closeOutline}
            className="text-[48px] text-black"
          ></IonIcon>
        ) : (
          <IonIcon
            icon={reorderTwo}
            className="text-[48px] text-black"
          ></IonIcon>
        )}
      </button>
    </>
  );
}

export default SidebarShow;
