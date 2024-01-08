import { Sublink as SublinkType } from "@/constants/sidebarData";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarContext } from "@/views/divers/sidebar";
import { useWindowSize } from "react-use";

type SublinkProps = {
  sublinks: SublinkType[];
  dropdownOpen: boolean;
  setdropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Sublink({ sublinks, dropdownOpen, setdropdownOpen }: SublinkProps) {
  const { width } = useWindowSize();
  const pathname = usePathname();
  const { expanded } = useContext(SidebarContext);

  const toggleDropdown = () => {
    if (expanded === false) setdropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (width < 1536) {
    }
  }, [width]); // False

  return (
    <ul className="mt-3 list-none h-auto relative w-fit">
      {sublinks.map((sublink, key) => (
        <li
          key={key}
          className={`block text-sm tracking-wide mb-2  ${
            pathname === sublink.route ? "text-blue-500" : "font-normal"
          }`}
        >
          <Link href={sublink.route} onClick={toggleDropdown}>
            <div className=" block relative h-auto z-[1500] -text--text-secondary-color hover:text-blue-500 transition-all ease-in-out">
              {sublink.label}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Sublink;
