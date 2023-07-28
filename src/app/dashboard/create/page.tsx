"use client";
import { Layout } from "@/components/Layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const userSchemaForm = z.object({
  name: z.string().min(3, 'O nome precisa ter no mínimo 3 caracters').max(255),
  plate: z.string().min(7, 'A placa precisa ter no mínimo 7 caracters')
})

type UserSchemaForm = z.infer<typeof userSchemaForm>

const api = process.env.NEXT_PUBLIC_API_URL

export default function Create() {

  const { register, handleSubmit, formState: { errors } } = useForm<UserSchemaForm>({
    resolver: zodResolver(userSchemaForm)
  })

  async function handleCreateUser(data: UserSchemaForm) {
    const user = await fetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify(data)
    })

    if (!user) {
      return alert('Erro ao cadastrar usuário')
    }

    window.location.href = '/dashboard'
  }

  return (
    <div className="mx-auto flex justify-center h-screen md:w-[1440px] py-10">
      <div className="flex flex-col md:items-center">

        <form className="mt-4 flex flex-col gap-4 md:w-[600px]" onSubmit={handleSubmit(handleCreateUser)}>
          <div className="flex items-center  justify-between gap-2 w-full">
            <h2 className="text-zinc-100 font-semibold">Cadastrar cliente</h2>
            <a href='/dashboard' className="bg-[#343352] hover:bg-[#46446e] px-4 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer">Voltar</a>
          </div>
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
              className="bg-[#343352] hover:bg-[#46446e] mt-4 w-full p-2 rounded-md transition-colors">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}