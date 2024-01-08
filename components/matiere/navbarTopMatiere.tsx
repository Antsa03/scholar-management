"use client";
import { usePathname } from "next/navigation";
import { NavbarTopMatiereDatas } from "@/constants/navbarTopMatiere";
import { Fragment } from "react";
import Link from "next/link";

function NavbarTopMatiere() {
  const pathname = usePathname();
  return (
    <nav className="navbartop-container">
      {NavbarTopMatiereDatas.map((item, index) => (
        <Fragment key={index}>
          <div className="mr-8 w-fit">
            <Link
              href={item.route}
              className={`block self-center hover:-text--text-blue-color cursor-pointer text-center text-sm lg:text-base tracking-wider whitespace-nowrap ${
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

export default NavbarTopMatiere;
