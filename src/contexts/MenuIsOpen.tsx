"use client";

import React, { createContext, useState } from 'react'

interface MenuIsOpenContextData {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenSidebar: () => void;
}

export const MenuIsOpen = createContext({} as MenuIsOpenContextData)

export function MenuIsOpenProvider({children}:{ children: React.ReactNode}){

  const [ menuIsOpen, setMenuIsOpen ]  = useState(false)

  function handleOpenSidebar() {
    setMenuIsOpen(!menuIsOpen);
  }
  

  return(
    <MenuIsOpen.Provider value={{menuIsOpen, setMenuIsOpen, handleOpenSidebar}}>
      {children}
    </MenuIsOpen.Provider>
  )
}

export const useMenuIsOpen = () => {
  
}