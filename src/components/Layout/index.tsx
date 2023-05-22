import { Sidebar } from "../Sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 min-h-screen">
      <Sidebar />
      <div className="md:mx-auto md:w-2/4 py-4 pr-4 w-full">
        {children}
      </div>
    </div>
  )
}