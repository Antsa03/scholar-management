"use client";

import Link from "next/link";
import React, { Fragment } from "react";
import { NavbarTopUtilisateurDatas } from "@/constants/navbarTopUtilisateur";
import { usePathname } from "next/navigation";

function NavbarTopUtilisateur() {
  const pathname = usePathname();
  return (
    <nav className="navbartop-container">
      {NavbarTopUtilisateurDatas.map((item, index) => (
        <Fragment key={index}>
          <div className="mr-8 w-fit">
            <Link
              href={item.route}
              className={`block self-center hover:-text--text-blue-color cursor-pointer text-center text-sm custom-xl:text-base tracking-wider whitespace-nowrap ${
                pathname == item.route
                  ? "-text--text-blue-color font-medium"
                  : ""
              }`}
            >
              {item.label}
              <div
                className={`mt-1 rounded-t h-[4px] scale-x-110 ${
                  pathname == item.route
                    ? "w-full  -bg--bg-solid-blue blur-md"
                    : "bg-blue-500/10"
                }}`}
              ></div>
            </Link>
          </div>
        </Fragment>
      ))}
    </nav>
  );
}

export default NavbarTopUtilisateur;
