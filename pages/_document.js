import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          strategy="beforeInteractive"
          src="https://cesium.com/downloads/cesiumjs/releases/1.97/Build/Cesium/Cesium.js"
        />
        <Script
          strategy="beforeInteractive"
          src="https://cdnjs.cloudflare.com/ajax/libs/satellite.js/4.0.0/satellite.min.js"
        ></Script>
      </body>
    </Html>
  );
}
