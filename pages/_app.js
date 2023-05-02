import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from 'next-themes';


function App({
  Component,
  pageProps: { session, ...pageProps }
}) {

  return (
    <SessionProvider session={session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeProvider>
    </SessionProvider>
  )
}
export default App;