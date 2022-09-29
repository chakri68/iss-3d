import Script from "next/script";

export default function Home() {
  return (
    <>
      <div id="loading">
        <h1>Loading...</h1>
      </div>
      <div id="cesiumContainer"></div>
      <Script
        type="module"
        strategy="afterInteractive"
        src="/scripts/initCesium.js"
      />
      {/* <Script strategy="afterInteractive" src="/scripts/tle/stream.js" />
      <Script strategy="afterInteractive" src="/scripts/tle/tle.js" /> */}
    </>
  );
}
