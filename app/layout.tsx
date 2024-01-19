"use client";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "./provider";
import TopbarContainer from "@/components/topbar/topbar";
import Sidebar from "@/views/divers/sidebar";
import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { reorderTwo, closeOutline } from "ionicons/icons";
import { usePathname } from "next/navigation";
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { data: session } = useSession();
  // const isEtudiantLogin = session?.user.role === "Etudiant";
  const pathname = usePathname();

  const isLoginPathname =
    pathname === "/" || pathname?.includes("password-reset/");

  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="fr" className="min-h-screen">
      <head>
        <meta
          name="google-site-verification"
          content="HEBP5T6yHqThCrXuOSSXc6raCvCZPMoNIAh7KdV2grY"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Scholar management</title>
      </head>
      <body
        className={` ${darkMode ? "dark" : ""}  ${
          isLoginPathname
            ? "w-screen h-screen flex flex-col items-center justify-center"
            : "body"
        }`}
        suppressHydrationWarning={true}
      >
        <Provider>
          {isLoginPathname ? (
            <div className="w-full h-full relative">
              {" "}
              {/* <button
                onClick={() => setDarkMode(!darkMode)}
                className="absolute top-[5%] left-1/2 -translate-x-1/2 z-50 flex flex-row  items-center justify-center p-2 w-fit hover:-bg--bg-ui-color rounded-md"
              >
                {darkMode === false ? (
                  <IonIcon
                    className={`" text-black text-3xl cursor-pointer justify-self-end self-end" `}
                    icon={sunnySharp}
                  />
                ) : (
                  <IonIcon
                    className={`" text-black text-3xl cursor-pointer justify-self-end self-end" `}
                    icon={sunnyOutline}
                  />
                )}
              </button> */}
              {children}
            </div>
          ) : (
            <div
              className={`flex flex-row w-full relative  custom-mobile:-bg--bg-primary-color dark:-bg--bg-dark-secondary-color  ${"justify-center min-h-screen"}`}
            >
              <Sidebar isSidebarOpen={isSidebarOpen} />
              <main
                className={`flex flex-col  gap-2  shadow-gray-600/50 z-0  transition-all ${"w-full flex-grow"}`}
              >
                <button
                  onClick={() => toggleSidebar()}
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
                <div
                  className={`hidden lg:flex flex-row items-center justify-between gap-4 py-2  pl-12 pr-12 2xl:pr-8 h-[80px] -bg--bg-primary-color  border-gray-300 ${"border-b-[1px]"}`}
                >
                  <TopbarContainer
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                </div>

                <section className="flex flex-col flex-grow relative px-0 xl:px-12 ">
                  {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
                  {children}
                </section>
              </main>
            </div>
          )}
        </Provider>
      </body>
    </html>
  );
}
