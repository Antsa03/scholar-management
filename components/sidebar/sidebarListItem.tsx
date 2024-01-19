import { SidebarItemLinks } from "@/constants/sidebarData";
import React, { useState } from "react";
import SidebarItem from "./sidebarItem";

export default function SidebarListItem() {
  const [selectedDiv, setSelectedDiv] = useState(0);

  return (
    <ul className="w-full flex flex-col list-none tracking-wide border-none">
      {SidebarItemLinks.map((item, key) => (
        <li key={key}>
          <SidebarItem
            item={item}
            selected={selectedDiv}
            setSelected={setSelectedDiv}
          />
        </li>
      ))}
    </ul>
  );
}
