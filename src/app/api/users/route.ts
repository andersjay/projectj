import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

export async function POST(request: Request) {


    const { name, plate } = await request.json()

    console.log(name, plate)

    const user = await prisma.user.create({
        data: {
            id: uuidv4(),
            name,
            plate,
            status: 'waiting',
            createdAt: dayjs().toDate(),
            updatedAt: dayjs().toDate()
        }
    })

    return NextResponse.json(user)

}

export async function GET() {


    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    })

    return NextResponse.json(users)


}