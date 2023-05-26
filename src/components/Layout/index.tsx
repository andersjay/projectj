import { useContext } from "react";
import { Sidebar } from "../Sidebar";
import { MenuIsOpen } from "@/contexts/MenuIsOpen";

export function Layout({ children }: { children: React.ReactNode }) {
  const { menuIsOpen, setMenuIsOpen, handleOpenSidebar } = useContext(MenuIsOpen)

  return (
    <div className="flex gap-4 min-h-screen">
      <Sidebar />
      <div className={`md:mx-auto ${menuIsOpen ? "md:w-2/4" : "md:w-[1440px]"} py-4 pr-4 w-full`}>
        {children}
      </div>
    </div>
  )
}