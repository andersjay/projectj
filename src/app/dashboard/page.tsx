"use client";
import { ChangeEvent } from 'react'
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
    const response = await fetch(`/api/users`, {
      method: 'GET',
    })

    setUsers(await response.json())
  }

  async function handleStatusChange(newStatus: string, code: string) {

    const response = await fetch(`/api/status/${code}`, {
      method: 'POST',
      body: JSON.stringify({ status: newStatus })
    })

    if (response.ok) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.code === code ? { ...user, status: newStatus } : user))
    }

  }

  function nextStatus(currentStatus: string) {
    switch (currentStatus) {
      case 'waiting':
        return 'inProgress'
      case 'inProgress':
        return 'finished'
      case 'finished':
        return 'waiting'
      default:
        return 'waiting'
    }
  }

  useEffect(() => {
    handleFetch()
  }, [])

  return (
    <div className='mx-auto py-10 md:w-9/12'>

      <div className="overflow-x-auto">
        {/* <table className="table-auto my-4 md:table-fixed">
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
        </table> */}


        <div className="bg-transparent p-8 rounded-md w-full">
          <div className=" flex items-center flex-col md:justify-between pb-6 md:flex-row">
            <div className='text-left'>
              <h2 className="text-zinc-100 font-semibold">Clientes</h2>
              <span className="text-xs">Listagem de clientes</span>
            </div>
            <div className="flex flex-col gap-5  justify-center mt-4 w-full md:w-auto ">
              <div className="flex bg-[#343352] items-center p-2 rounded-md border-b-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
                </svg>
                <input className="bg-transparent outline-none ml-1 block placeholder:text-zinc-300 " type="text" name="" id="" placeholder="pesquisar..." />
              </div>
              <div className="flex justify-center gap-10 w-full">
                <a href='#' className="bg-[#343352] hover:bg-[#46446e] px-4 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer">Histórico</a>
                <a href='/dashboard/create' className="bg-[#343352] hover:bg-[#46446e] px-4 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer">Cadastrar</a>
              </div>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">


                {users.map(user => {
                  return (

                    <div className="bg-zinc-800 rounded-md px-6 py-3 text-zinc-200 h-36 my-4 md:w-full" key={user.code}>
                      <div className='flex gap-2  items-center w-full'>
                        <span className='text-lg font-bold'>{user.name}</span>
                        |
                        <span className='text-sm'><span className='text-xs'>Cód. </span>{user.code}</span>


                      </div>

                      <div className='w-full flex justify-between'>
                        <span className='text-sm'><span className='text-xs text-green-300'>Entrada </span>{dayjs(user.createdAt).format("DD/MM HH:mm") + "h"}</span>
                        <span className='text-sm'><span className='text-xs text-red-300'>Saída </span>    {dayjs(user.updatedAt).format("DD/MM HH:mm") + "h"}</span>
                      </div>

                      <div className='w-full'>
                        <span className='text-sm'><span className='text-xs text-yellow-300'>Placa </span>{user.plate}</span>
                      </div>

                      <div className='w-full flex mt-4 md:justify-center'>
                        <span
                          className="w-full md:w-[300px] text-center font-semibold leading-tight cursor-pointer">
                          <span aria-hidden
                            className={`py-2 px-2 flex items-center justify-center font-bold inset-0 rounded-full first-letter ${user.status === 'finished' ? 'bg-green-500 text-green-100' : user.status === 'waiting' ? 'bg-[#ffa302] text-yellow-100' : user.status === 'inProgress' ? 'bg-blue-500 text-blue-200' : ''}`}>
                            <span className="relative text-sm" onClick={() => handleStatusChange(nextStatus(user.status), user.code)}>
                              {user.status === 'finished' ? 'Finalizado ->' : user.status === 'waiting' ? 'Aguardando ->' : user.status === 'inProgress' ? 'Em progresso ->' : ''}
                            </span>
                          </span>

                        </span>
                      </div>

                    </div>
                  )
                })}



                {/* <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-zinc-700 text-center text-xs font-semibold text-zinc-100 uppercase tracking-wider">
                        Código
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-zinc-700 text-center text-xs font-semibold text-zinc-100 uppercase tracking-wider">
                        Nome
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-zinc-700 text-center text-xs font-semibold text-zinc-100 uppercase tracking-wider">
                        Placa
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-zinc-700 text-center text-xs font-semibold text-zinc-100 uppercase tracking-wider">
                        Entrada
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-zinc-700 text-center text-xs font-semibold text-zinc-100 uppercase tracking-wider">
                        Saída
                      </th>

                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-zinc-700 text-center text-xs font-semibold text-zinc-100 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => {
                      return (
                        <tr key={user.code}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                            <div className="flex items-center justify-center">

                              <div className="ml-3">
                                <p className="text-zinc-200 whitespace-nowrap text-center">
                                  {user.code}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                            <p className="text-zinc-200 whitespace-nowrap text-center">{user.name}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                            <p className="text-zinc-200 whitespace-nowrap text-center">
                              {user.plate}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                            <p className="text-zinc-200 whitespace-nowrap text-center">
                              {dayjs(user.createdAt).format("DD/MM HH:mm") + "h"}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                            <p className='text-zinc-200 whitespace-nowrap text-center'>
                              {dayjs(user.updatedAt).format("DD/MM HH:mm") + "h"}
                            </p>

                          </td>

                          <td className='px-5 py-5 border-b text-center border-gray-200 bg-transparent text-sm'>
                            <span
                              className="w-full text-center font-semibold leading-tight cursor-pointer">
                              <span aria-hidden
                                className={`py-2 px-3 inset-0 rounded-full first-letter ${user.status === 'finished' ? 'bg-green-500 text-green-900' : user.status === 'waiting' ? 'bg-yellow-500 text-yellow-900' : user.status === 'inProgress' ? 'bg-blue-500 text-blue-800' : ''}`}>
                                <span className="relative" onClick={() => handleStatusChange(nextStatus(user.status), user.code)}>
                                  {user.status === 'finished' ? 'Finalizado ->' : user.status === 'waiting' ? 'Aguardando ->' : user.status === 'inProgress' ? 'Em progresso ->' : ''}
                                </span>
                              </span>

                            </span>
                          </td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table> */}
                <div
                  className="px-5 py-5 bg-transparent border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span className="text-xs xs:text-sm text-zinc-200">
                    Showing 1 to 4 of 50 Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                      className="text-sm text-indigo-50 transition duration-150 hover:bg-[#46446e] bg-[#343352] font-semibold py-2 px-4 rounded-l" disabled>
                      Anterior
                    </button>
                    &nbsp; &nbsp;
                    <button
                      className="text-sm text-indigo-50 transition duration-150 hover:bg-[#46446e] bg-[#343352] font-semibold py-2 px-4 rounded-r" disabled>
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

    </div>
  )
}