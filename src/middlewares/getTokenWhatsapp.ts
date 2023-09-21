export async function getTokenWhatsapp(){
  try {
    
    const url = process.env.NEXT_PUBLIC_URL_WPP + '/login'
    const data = {
      "email": process.env.NEXT_PUBLIC_LOGIN_WPP,
      "password": process.env.NEXT_PUBLIC_PASSWORD_WPP
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const { token }  = await response.json()

    return token


  } catch (error) {
    console.log(error)
  }
}