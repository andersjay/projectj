import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_WPP,
  headers: {
    'Content-Type': 'application/json',
  }
})