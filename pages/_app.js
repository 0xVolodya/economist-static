import '../styles/globals.css'
import '../styles/reset.css'
import '../styles/pagination.css'
import Header from "../components/header";

function MyApp({Component, pageProps}) {
  return (<div>
    <Header />
    <Component {...pageProps} />
  </div>)
}

export default MyApp
