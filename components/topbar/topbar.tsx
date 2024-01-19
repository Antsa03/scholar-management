"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth";
import { IonIcon } from "@ionic/react";
import { keyOutline } from "ionicons/icons";
import Link from "next/link";

interface topbarContainerProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
function TopbarContainer({ darkMode, setDarkMode }: topbarContainerProps) {
  const { data: session }: any = useSession();

  if (session)
    return (
      <>
        <div className="flex flex-row gap-4  items-center w-auto h-fit relative">
          <div
            className="max-w-[60px] max-h-[60px] tooltip-bottom"
            data-tooltip="Modifier photo de profil"
          >
            <Link href="/modifier-pdp">
              {" "}
              <img
                src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${session?.user.image}`}
                alt="Image de profil"
                className=" -border--border-third-color border-2 rounded-full"
                width={60}
                height={60}
              />
            </Link>
          </div>

          <div className="flex flex-row items-center gap-8 text-base tracking-wider">
            <span className="font-semibold font-poppins-regular tracking-wide -text--text-secondary-color">
              {session?.user.name}
            </span>
            <span>
              Status :
              <span className="-text--text-blue-color font-medium -bg--bg-ui-color ml-2 px-4 py-2 p-[2px] rounded-md">
                {session?.user.role}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-4 mr-4">
          <Link
            href={"/modifier-mdp"}
            className="flex flex-row  items-center justify-center px-2 w-fit hover:bg-blue-100 rounded-md tooltip-bottom"
            data-tooltip="Modifier mot de passe"
          >
            {" "}
            <IonIcon
              className={`" text-black text-3xl cursor-pointer justify-self-end self-end" `}
              icon={keyOutline}
            />
          </Link>
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex flex-row  items-center justify-center px-2 w-fit hover:bg-blue-100 rounded-md"
          >
            {darkMode === false ? (
              <IonIcon
                className={`" text-black text-3xl cursor-pointer justify-self-end self-end" `}
                icon={sunnySharp}
              />
            ) : (
              <IonIcon
                className={`" text-black cursor-pointer justify-self-end self-end" `}
                icon={sunnyOutline}
              />
            )}
          </button> */}
          <div className="2xl:block ">
            <LogoutButton />
          </div>
        </div>
      </>
    );
}

export default TopbarContainer;
