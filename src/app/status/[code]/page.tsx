"use client";
import { useEffect, useState } from "react";
import { TbHourglassHigh } from "react-icons/tb";
import { AiOutlineClear, AiOutlineCheck } from "react-icons/ai";
import classNames from "classnames";
import { get } from "http";

interface StatusProps {
  status?: 'default' | 'waiting' | 'inProgress' | 'finished';
}

interface Props {
  searchParams?:{
    code: string; 
  },
  params?:{
    code: string;
  }
}

interface UserProps{
  name?: string;
  plate?: string;
  status?: "default" | "waiting" | "inProgress" | "finished";
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  code?: string;
}



export default function Search(params: Props) {
  const [status, setStatus] = useState<StatusProps>({ status: 'waiting' });
  const [user, setUser] = useState<UserProps | null>(null)

  const code = params?.params?.code

  async function getUser(){
    const response = await fetch(`http://localhost:3000/api/status/${code}`)
    const data = await response.json()

    if (!data) {
      alert('Usuário não encontrado')
      return
    }
    setUser(data)
  }

  function changeStatus(status: StatusProps) {
    setStatus(status)
  }


  useEffect(() => {
    getUser()
    changeStatus({ status: user?.status})
  }, [])

  console.log(user?.status)

  

  // Função para mostrar o status atual
  const showStatus = (status: StatusProps) => {

    if (status.status === 'waiting') return 'Aguardando'
    if (status.status === 'inProgress') return 'Em andamento'
    if (status.status === 'finished') return 'Finalizado'

    return status.status;
  }

  console.log(user)



  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="font-bold text-2xl">{user?.name}</h2>
      <span className="text-lg mb-2">Placa: {user?.plate}</span>
      <div className="w-[400px] bg-zinc-300 p-4 rounded">
        <div className="w-full flex items-center justify-center gap-2">
          <div className={classNames(`rounded-full w-[40px] h-[40px] flex items-center justify-center bg-green-500  `)}>
            <TbHourglassHigh size={24} color="white" />
          </div>
          <div className={classNames(`w-1/4 h-2 rounded ${status.status == 'waiting' ? 'bg-slate-500' : 'bg-green-500'}`)}></div>

          <div className={classNames(`rounded-full w-[40px] h-[40px] flex items-center justify-center ${status.status === 'inProgress' || status.status === 'finished' ? 'bg-green-500' : 'border-2 border-slate-700 bg-slate-500'}`)}>
            <AiOutlineClear size={24} color="white" />
          </div>
          <div className={classNames(`w-1/4 h-2 rounded ${status.status == 'finished' ? 'bg-green-500' : 'bg-slate-500'}`)}></div>

          <div className={classNames(`rounded-full w-[40px] h-[40px] flex items-center justify-center ${status.status === 'finished' ? 'bg-green-500' : 'border-2 border-slate-700 bg-slate-500'}`)}>
            <AiOutlineCheck size={24} color="white" />
          </div>
        </div>
      </div>

      <span>
        <h2 className="mt-3 text-lg">Status: {showStatus({status: user?.status})} </h2>
      </span>

    </main>
  );
}

export const dynamic = 'force-dynamic'