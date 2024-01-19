import { SidebarItemLink, iconMapping } from "@/constants/sidebarData";
import { IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
import Sublink from "./sublink";
import Link from "next/link";
import { SidebarContext } from "@/views/divers/sidebar";
import { useContext, useRef, useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

type SidebarItemProps = {
  item: SidebarItemLink;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

export default function SidebarItem({
  item,
  selected,
  setSelected,
}: SidebarItemProps) {
  const handleClick = (id: number) => {
    if (selected === item.id) {
      setSelected(0);
    } else {
      setSelected(id);
    }
  };
  const isActive = selected === item.id;

  // Define Tailwind CSS classes based on isActive
  const iconClasses = isActive
    ? "-text--text-secondary-color"
    : "-text--text-secondary-color ";
  const { expanded } = useContext(SidebarContext);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const closeOpenMenus = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        dropdownOpen &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    if (!dropdownOpen) {
      const otherDropdowns = document.querySelectorAll(
        "[data-dropdown].active"
      );
      otherDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  };

  if (item.sublink && item.sublink.length > 0) {
    return (
      <div
        className={`"text-md block  relative border-l-[3px] "  
        ${isActive ? " -border--border-third-color" : ""}`}
      >
        <div
          onClick={() => handleClick(item.id)}
          className={`flex flex-row items-center  h-12  mb-1 transition-all ease-in-out delay-75   ${
            isActive ? " -bg--bg-ui-color-press" : ""
          }  ${
            expanded
              ? "pr-0 hover:-bg--bg-ui-color-hover hover:rounded-md"
              : "w-fit"
          }`}
        >
          <div
            className={`flex flex-row items-center  h-[40px] px-4 rounded-md  ${
              expanded
                ? "gap-4 w-full"
                : "w-fit ml-4 hover:-bg--bg-ui-color-hover hover:rounded-md"
            } `}
          >
            {expanded ? (
              <IonIcon
                icon={
                  isActive
                    ? iconMapping[item.icon].sharp
                    : iconMapping[item.icon].outline
                }
                className={`${iconClasses} ${expanded ? "" : "text-[28px]"}`}
              />
            ) : (
              <div className="relative" data-dropdown ref={dropdownRef}>
                <button
                  className="w-fit"
                  data-dropdown-button
                  onClick={toggleDropdown}
                >
                  <Tippy
                    content={<span className="text-white">{item.label}</span>}
                    placement="top"
                  >
                    <IonIcon
                      icon={
                        isActive
                          ? iconMapping[item.icon].sharp
                          : iconMapping[item.icon].outline
                      }
                      className={`${iconClasses} ${
                        expanded ? "" : "text-[28px]"
                      }`}
                    />
                  </Tippy>
                </button>
                {dropdownOpen && (
                  <div className="absolute w-[200px] p-2 z-50 shadow-md shadow-black-50 bg-white overflow-visible left-10 -top-2">
                    <span
                      className={`tracking-wider uppercase font-bold text-base overflow-visible  ${
                        isActive ? "" : " font-light"
                      }`}
                    >
                      {item.label}
                    </span>
                    <Sublink
                      sublinks={item.sublink}
                      dropdownOpen={dropdownOpen}
                      setdropdownOpen={setDropdownOpen}
                    ></Sublink>
                  </div>
                )}
              </div>
            )}

            {expanded && (
              <span
                className={`tracking-wider text-base overflow-hidden transition-all w-fit -text--text-secondary-color  ${
                  isActive ? "" : "font-light"
                }`}
              >
                {item.label}
              </span>
            )}
          </div>
          <IonIcon
            className={`text-lg text-gray-600 cursor-pointer justify-self-end self-center p-2 mr-1 transition-all ease-in-out delay-75 hover:bg-green-100 rounded-md
            }`}
            icon={isActive ? chevronUp : chevronDown}
            style={{ display: expanded ? "block" : "none" }}
          />
        </div>

        <div
          className={`"sidebar-content -text--text-primary-gray-color z-20" ${
            isActive === false
              ? "h-0 overflow-hidden absolute"
              : "h-fit -translate-y-1 pl-[56px]"
          }`}
        >
          {expanded && (
            <Sublink
              sublinks={item.sublink}
              dropdownOpen={dropdownOpen}
              setdropdownOpen={setDropdownOpen}
            ></Sublink>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`"text-md block  relative border-l-[3px] "  
      ${
        isActive
          ? " -border--border-third-color -bg--bg-ui-color-press z-10"
          : ""
      }`}
      >
        <div
          onClick={() => handleClick(item.id)}
          className={`flex flex-row items-center h-12  mb-1 transition-all ease-in-out delay-75  ${
            expanded
              ? "pr-4 hover:-bg--bg-ui-color-hover hover:rounded-md"
              : "w-fit"
          }`}
        >
          <Link
            href={`${item.label === "Accueil" ? "/accueil" : "/statistique"} `}
            className={`flex flex-row items-center gap-4 w-full h-[40px] pl-4 ${
              expanded
                ? "gap-4 w-full pr-4"
                : "w-fit ml-4 hover:-bg--bg-ui-color-hover hover:rounded-sm"
            }`}
          >
            {item.icon && (
              <Tippy
                content={<span className="text-white ">{item.label}</span>}
                placement="top"
              >
                <IonIcon
                  icon={
                    isActive
                      ? iconMapping[item.icon].sharp
                      : iconMapping[item.icon].outline
                  }
                  className={`${iconClasses} ${expanded ? "" : "text-[28px]"}`}
                ></IonIcon>
              </Tippy>
            )}
            <span
              className={`tracking-wider text-base overflow-hidden transition-all -text--text-secondary-color  ${
                isActive ? "  " : " font-light "
              } ${expanded ? "w-fit" : "w-0"}   `}
            >
              {item.label}
            </span>
          </Link>
        </div>
      </div>
    );
  }
}
