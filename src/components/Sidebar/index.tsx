"use client";
import { MenuIsOpen } from "@/contexts/MenuIsOpen"
import { List, X } from "@phosphor-icons/react";
import { useContext } from "react"

export function Sidebar() {

  const { menuIsOpen, setMenuIsOpen, handleOpenSidebar } = useContext(MenuIsOpen)
  return (
    <>

      {menuIsOpen ? (
        <div className="fixed top-0 left-0">
          <div className="w-[250px] h-full bg-slate-950 fixed top-0 left-0">
            <div className="flex items-center justify-between p-4">
              <h1 className="font-bold text-2xl">LOGO</h1>
              <button onClick={handleOpenSidebar} className="text-2xl"><X size={32} /></button>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <a href="/dashboard" className="text-2xl font-bold">Inicio</a>
              <a href="/dashboard/create" className="text-2xl font-bold">Cadastrar</a>
            </div>
          </div>
        </div>

      ) : (
        <div className="p-2">
          <button onClick={handleOpenSidebar}><List size={32} /></button>
        </div>
      )}

    </>
  )
}