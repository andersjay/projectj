"use client";
import { useRouter } from 'next/router'
import { useState } from "react";
import { TbHourglassHigh } from "react-icons/tb";
import { AiOutlineClear, AiOutlineCheck } from "react-icons/ai";
import classNames from "classnames";

interface StatusProps {
  status: 'default' | 'waiting' | 'inProgress' | 'finished';
}

export default function Search() {
  const [status, setStatus] = useState<StatusProps>({ status: 'waiting' });
  const router = useRouter();
  const { query } = router;

  console.log(query)


  // Função para atualizar o status para 'em andamento'
  const waiting = () => {
    setStatus({ status: 'waiting' });
  };

  // Função para atualizar o status para 'em andamento'
  const startProgress = () => {
    setStatus({ status: 'inProgress' });


  };

  // Função para atualizar o status para 'finalizado'
  const finishProgress = () => {
    setStatus({ status: 'finished' });
  };

  // Função para mostrar o status atual
  const showStatus = (status: StatusProps) => {

    if (status.status === 'waiting') return 'Aguardando'
    if (status.status === 'inProgress') return 'Em andamento'
    if (status.status === 'finished') return 'Finalizado'

    return status.status;
  }

  console.log(status.status)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="font-bold text-2xl">Anderson Leite</h2>
      <span className="text-lg mb-2">Placa: AEA2-111</span>
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
        <h2 className="mt-3 text-lg">Status: {showStatus(status)} </h2>
      </span>

    </main>
  );
}

