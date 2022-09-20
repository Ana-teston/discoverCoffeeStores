import '../styles/globals.css'
import FooterComponent from "../components/footer";


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <FooterComponent />
    </div>)
}

export default MyApp
