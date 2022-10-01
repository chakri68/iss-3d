import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
// import "bulma/css/bulma.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://cesium.com/downloads/cesiumjs/releases/1.97/Build/Cesium/Widgets/widgets.css"
          rel="stylesheet"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
