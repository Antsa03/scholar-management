"use client";
import React, { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SidebarListItem from "@/components/sidebar/sidebarListItem";
import Image from "next/image";
import { IonIcon } from "@ionic/react";
import { repeatOutline } from "ionicons/icons";
import { useWindowSize } from "react-use";

export const SidebarContext = createContext({
  expanded: false,
});

interface SidebarProps {
  isSidebarOpen: boolean;
}

function Sidebar({ isSidebarOpen }: SidebarProps) {
  const { data: session }: any = useSession();
  const [expanded, setExpanded] = useState(true);
  const { width } = useWindowSize();

  const [displayToggleBtnExpanded, setDisplayToggleBtnExpanded] =
    useState(true);

  useEffect(() => {
    if (width < 1536) {
      setDisplayToggleBtnExpanded(false);
      setExpanded(true);
    } else setDisplayToggleBtnExpanded(true);
  }, [width]); // False

  if (session && session.role !== "Etudiant")
    return (
      <div className="sticky top-0 left-0 h-screen z-10 w-fit">
        <div
          className={`sidebar ${isSidebarOpen ? "left-0" : "-left-[340px]"}`}
        >
          <div
            className={`flex flex-row gap-4 items-center justify-start px-6  h-[80px] relative ${
              expanded ? "w-[280px]" : "w-fit"
            }`}
          >
            <Image
              src="/img/logo.png"
              alt="Logo de l'Esti"
              width={64}
              height={64}
              className={`overflow-hidden transition-all  ${
                expanded ? "w-fit" : "w-0"
              }`}
            />

            {expanded && (
              <h2
                className={`font-poppins-regular text-gray-700 font-medium text-[16px]`}
              >
                Scholar Management
              </h2>
            )}

            {displayToggleBtnExpanded && (
              <div
                className={`absolute self-center right-0  ${
                  expanded ? "" : "left-8"
                }`}
              >
                <button
                  onClick={() => setExpanded((expanded) => !expanded)}
                  className="flex flex-row  justify-center items-center  w-10 h-10 hover:bg-blue-100 rounded-md"
                >
                  <IonIcon
                    icon={repeatOutline}
                    className="ion-icon-middle text-black cursor-pointer justify-self-end block"
                  ></IonIcon>
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {/* <h2 className="text-sm tracking-wide -text--text-secondary-color">
      Pages
    </h2> */}
            <SidebarContext.Provider value={{ expanded }}>
              <SidebarListItem></SidebarListItem>
            </SidebarContext.Provider>
          </div>
        </div>
      </div>
    );
}

export default Sidebar;
