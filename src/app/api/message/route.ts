import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import Twilio from 'twilio'

const accountSid = process.env.NEXT_PUBLIC_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const client = Twilio(accountSid, authToken);

export async function POST(request: Request) {

  const { phone, message } = await request.json()

  try {

    const response = client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886',
      to: phone
    })

    return NextResponse.json((await response).accountSid, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      }
    })

  } catch (error) {

  }

}
