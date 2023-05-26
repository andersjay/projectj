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

interface Users {
  data: User[];
}

export default function Dashboard({ data }: Users) {

  const [users, setUsers] = useState<User[]>([])

  async function handleFetch() {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'GET',
    })

    setUsers(await response.json())
  }

  async function handleStatusChange(event: ChangeEvent<HTMLSelectElement>, code: string) {
    const response = await fetch(`http://localhost:3000/api/users/${code}`, {
      method: 'POST',
      body: JSON.stringify({
        status: event.target.value
      })
    })

    handleFetch()
    
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
                  <select value={user.status} onChange={handleStatusChange}>
                    <option value="waiting">Aguardando</option>
                    <option value="inProgress">Em progresso</option>
                    <option value="finished">Finalizado</option>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http:localhost:3000/api/users');
  const data = await res.json();

  console.log(data)
  return { props: { data } };
};