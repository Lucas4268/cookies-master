import '../styles/globals.css'
import { useEffect, useState } from 'react'
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { customTheme, darkTheme, lightTheme } from '../themes'
import Cookies from 'js-cookie'

interface Props extends AppProps {
  theme: string
}

function MyApp({ Component, pageProps, theme }: Props) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookiesTheme = Cookies.get('theme') || 'light' // se hace dentro deel efecto para que no se ejecute en el server
    const selectedTheme = cookiesTheme === 'dark'
        ? darkTheme
        : cookiesTheme === 'light'
            ? lightTheme
            : customTheme

    setCurrentTheme(selectedTheme)
  }, [])


  return (
    <ThemeProvider theme={ currentTheme }>
      <CssBaseline /> 
      <Component {...pageProps} />
    </ThemeProvider>
  )
}


// MyApp.getInitialProps = async (appContext: AppContext) => { // no usar porque hace que todas las paginas sean server side render y se pierde el staticssr

//   const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }

//   const validThemes = ['light', 'dark', 'custom']


//   return {
//     theme: validThemes.includes(theme) ? theme : 'light',
//   }
// }

export default MyApp
