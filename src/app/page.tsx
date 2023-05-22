import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form>
        <div className='w-[300px]'>
          <input type="text" placeholder='Digite sua placa' className='p-2 bg-zinc-400 placeholder:text-zinc-700 text-zinc-900 rounded-md w-full outline-none focus:outline-primary outline-offset-0' />
        </div>

        <div className='w-[300px]'>
          <a href="/status" className='bg-slate-900 mt-4 w-full p-2 rounded-md transition-colors hover:bg-slate-800'>Verificar Status</a>
        </div>
      </form>
    </main>
  )
}
