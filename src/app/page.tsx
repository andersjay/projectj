'use client'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners';
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

const schemaHome = z.object({
  code: z.string().min(1, 'O código deve conter pelo menos 1 caracter').max(20)
})

type SchemaHome = z.infer<typeof schemaHome>

export default function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const {register, handleSubmit, formState: {errors}} = useForm<SchemaHome>({
    resolver: zodResolver(schemaHome)
  })
  const { push } = useRouter()

  console.log(errors)

  async function handleSearch(data: SchemaHome) {
    
    const code = data.code

    try {
      setIsLoading(true)
      //Verificar se a placa existe no banco de dados
      const response = await fetch(`api/status/${code}`)
      const data = await response.json()

      if (!data) {
        alert('Usuário não encontrado :/')
        return
      }


      //Redirecionar para a página de status usando next router
      push(`/status/${code}`)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <h2 className='font-mono text-3xl'>Project J.</h2>
      </div>
      <form onSubmit={handleSubmit(handleSearch)} className='p-4 rounded-md'>
        {/* <Image src='/logo.jpg' width={150} height={150} alt="Logo Ao Chavilha" className='mb-4'/> */}
        <div className='w-[300px]'>

          <input type="text" placeholder='Digite seu código' className='p-2 bg-zinc-200 placeholder:text-zinc-700 text-zinc-900 rounded-md w-full outline-none focus:outline-primary outline-offset-0'  {...register('code')}/>
          <span className="text-sm text-red-500">{errors?.code?.message}</span>

        </div>

        <div className='w-[300px]'>
          <button type='submit' className='bg-zinc-700 mt-4 w-full p-2 rounded-md transition-colors hover:bg-zinc-600 text-center'>
            {
              isLoading ? <ClipLoader color='white' size={15} /> : 'Verificar status'
            }
          </button>
        </div>
      </form>
    </main>
  )
}
