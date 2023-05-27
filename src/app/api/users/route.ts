import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

export async function POST(request: Request) {

    const { name, plate } = await request.json()

    const generateRandomCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Caracteres permitidos
        let code = '';
        for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          code += chars[randomIndex];
        }
        return code;
      };

    const user = await prisma.user.create({
        data: {
            id: uuidv4(),
            name,
            code: generateRandomCode(),
            plate,
            status: 'waiting',
            createdAt: dayjs().toDate(),
            updatedAt: dayjs().toDate()
        }
    })

    return NextResponse.json(user,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,PATCH,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          }
    })

}

export async function GET() {


    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    })

    return NextResponse.json(users,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,PATCH,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          }
    })


}