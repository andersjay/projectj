"use client";
import { Layout } from "@/components/Layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'

const userSchemaForm = z.object({
  name: z.string().min(3, 'O nome precisa ter no mínimo 3 caracters').max(255),
  plate: z.string().min(7, 'A placa precisa ter no mínimo 7 caracters')
})

type UserSchemaForm = z.infer<typeof userSchemaForm>


export default function Create() {

  const { register, handleSubmit, formState: { errors } } = useForm<UserSchemaForm>({
    resolver: zodResolver(userSchemaForm)
  })

  async function handleCreateUser(data: UserSchemaForm) {
    const user = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    
    if(!user){
      return alert('Erro ao cadastrar usuário')
    }

    redirect('/dashboard')

  }

  return (
    <Layout>
      <div className="flex flex-col md:items-center">
        <h2 className="mt-2 text-2xl">Cadastrar</h2>

        <form className="mt-4 flex flex-col gap-4 md:w-[600px]" onSubmit={handleSubmit(handleCreateUser)}>
          <div className="w-full">
            <label
              htmlFor="name"
              className="text-lg">Nome</label>
            <input
              type="text"
              id="name"
              className="p-2 bg-zinc-400 placeholder:text-zinc-700 text-zinc-900 rounded-md w-full outline-none focus:outline-primary outline-offset-0"
              {...register('name')}
            />
            <span className="text-sm text-red-500">{errors?.name?.message}</span>
          </div>

          <div className="w-full">
            <label
              htmlFor="name"
              className="text-lg">Placa</label>
            <input
              type="text"
              id="name"
              className="p-2 bg-zinc-400 placeholder:text-zinc-700 text-zinc-900 rounded-md w-full outline-none focus:outline-primary outline-offset-0"
              {...register('plate')}

            />
            <span className="text-sm text-red-500">{errors?.plate?.message}</span>

          </div>


          <div className="w-full">
            <button
              type="submit"
              className="bg-slate-900 mt-4 w-full p-2 rounded-md transition-colors hover:bg-slate-800">Cadastrar</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}