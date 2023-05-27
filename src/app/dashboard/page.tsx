"use client";
import {ChangeEvent } from 'react'
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface User {
  name: string;
  plate: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  code: string;
}

export default function Dashboard() {

  const [users, setUsers] = useState<User[]>([])


  async function handleFetch() {
    const response = await fetch(`api/users`, {
      method: 'GET',
    })

    setUsers(await response.json())
  }

  async function handleStatusChange(event: ChangeEvent<HTMLSelectElement>, code: string) {

    const response = await fetch(`api/status/${code}`, {
      method: 'POST',
      body: JSON.stringify({
        status: event.target.value
        
      })
    })


    return response.json()
    
  }

  useEffect(() => {
    handleFetch()
  }, [])



  console.log(users)
  return (
    <Layout>

      <h1 className="text-2xl">Clientes</h1>

      <div className="overflow-x-auto">
        <table className="table-auto my-4 md:table-fixed">
          <thead>
            <tr className="">
              <th className="text-lg p-2">Código</th>
              <th className="text-lg p-2">Nome</th>
              <th className="text-lg p-2">Placa</th>
              <th className="text-lg p-2">Entrada</th>
              <th className="text-lg p-2">Saída</th>
              <th className="text-lg p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr className="border-b-2" key={user.createdAt}>
                <td className="text-lg p-2">{user.code}</td>
                <td className="text-lg p-2">{user.name}</td>
                <td className="text-lg p-2">{user.plate}</td>
                <td className="text-lg p-2">{dayjs(user.createdAt).format("DD/MM HH:mm") + "h"}</td>
                <td className="text-lg p-2">{dayjs(user.updatedAt).format("DD/MM HH:mm") + "h"}</td>
                <td className="text-lg p-2">
                  <select onChange={(e)=>{handleStatusChange(e, user.code)}} className='bg-transparent'>
                    <option className='bg-primary' selected={user.status == 'waiting' ? true : false } value="waiting">Aguardando</option>
                    <option className='bg-primary' selected={user.status == 'inProgress' ? true : false } value="inProgress">Em progresso</option>
                    <option className='bg-primary' selected={user.status == 'finished' ? true : false } value="finished">Finalizado</option>
                  </select>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </Layout>
  )
}