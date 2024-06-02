import React from "react";

const SidebarItems = [
  {
    _tabName: "🗂️ All Files",
    href: "all",
  },
  {
    _tabName: "🍒 NFTs",
    href: "nft",
  },
  {
    _tabName: "📊 Analytics",
    href: "analytics",
  },
];
export default function DashboardSidebar({ activetab, setActiveTab }) {
  const handleChangeTab = (d) => {
    setActiveTab(d);
    localStorage.setItem("rose_active_dashboard_tab", d);
  };
  return (
    <ul>
      {SidebarItems.map((d, i) => {
        return (
          <li key={i}>
            <button
              onClick={() => handleChangeTab(d.href)}
              className={`${
                activetab === d.href &&
                "bg-blue-100 rounded-md"
              } py-2 px-3 w-[97%] text-left cursor-pointer transition-all ease-in-out hover:bg-gray-100`}
            >
              {d._tabName}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
