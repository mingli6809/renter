
import Layout from '../components/Layout'
import '../styles/globals.css'
import 'material-icons/iconfont/material-icons.css';

function MyApp({ Component, pageProps }) {
  switch (Component.displayName) {
    case 'Showcase':
      return (
        <>
          <Component {...pageProps} />
        </>
      )
    default:
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )
  }

}

export default MyApp
