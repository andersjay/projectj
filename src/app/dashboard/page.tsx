"use client";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface User {
  name: string;
  plate: string;
  createdAt: string;
  updatedAt: string;
  status: string;
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

  useEffect(() => {
    handleFetch()
  }, [])

  console.log(users)
  return (
    <Layout>
      <h1 className="text-2xl">Clientes</h1>

      <table className="table-auto my-4 ">
        <thead>
          <tr className="">
            <th className="text-lg">Nome</th>
            <th className="text-lg">Placa</th>
            <th className="text-lg">Entrada</th>
            <th className="text-lg">Saída</th>
            <th className="text-lg">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr className="border-b-2" key={user.createdAt}>
              <td className="text-lg">{user.name}</td>
              <td className="text-lg">{user.plate}</td>
              <td className="text-lg">{user.createdAt}</td>
              <td className="text-lg">{user.updatedAt}</td>
              <td className="text-lg">{user.status}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http:localhost:3000/api/users');
  const data = await res.json();

  console.log(data)
  return { props: { data } };
};