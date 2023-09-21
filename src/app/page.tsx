'use client'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {

  const [code, setCode] = useState('')
  const { push } = useRouter()

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //Verificar se a placa existe no banco de dados
    const response = await fetch(`api/status/${code}`)
    const data = await response.json()

    if (!data) {
      alert('Usuário não encontrado :/')
      return
    }


    //Redirecionar para a página de status usando next router
    push(`/status/${code}`)

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <h2 className='font-mono text-3xl'>Project J.</h2>
      </div>
      <form onSubmit={handleSearch} className='p-4 rounded-md'>
      {/* <Image src='/logo.jpg' width={150} height={150} alt="Logo Ao Chavilha" className='mb-4'/> */}
        <div className='w-[300px]'>

          <input type="text" placeholder='Digite seu código' className='p-2 bg-zinc-200 placeholder:text-zinc-700 text-zinc-900 rounded-md w-full outline-none focus:outline-primary outline-offset-0' value={code} onChange={(e) => setCode(e.currentTarget.value)} />
        </div>

        <div className='w-[300px]'>
          <button className='bg-zinc-700 mt-4 w-full p-2 rounded-md transition-colors hover:bg-zinc-600 text-center'>Verificar Status</button>
        </div>
      </form>
    </main>
  )
}
