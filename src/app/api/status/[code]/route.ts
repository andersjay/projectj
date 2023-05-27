import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { code: string } }) {

  const code = params.code

  console.log(code)

  const user = await prisma.user.findUnique({
    where: {
      code
    }
  })

  return NextResponse.json(user)
}

export async function POST(request: Request, { params }: { params: { code: string } }){

  const code = params.code
  const { status } = await request.json()

  const user = await prisma.user.update({
    where: {
      code
    },
    data: {
      status
    }
  })

  return NextResponse.json(user)
}