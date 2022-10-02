import Script from "next/script";
import RightBar from "../Components/RightBar";
import {
  Sidebar,
  Menu,
  Icon,
  Segment,
  Header,
  Image,
  Checkbox,
} from "semantic-ui-react";
import { useState } from "react";
import Head from "next/head";

export default function Home() {
  let [visible, setVisible] = useState(false);
  return (
    <>
      <Head>
        <title>ISS - 3D</title>
      </Head>
      <div id="loading">
        <h1>Loading...</h1>
      </div>
      <Script
        type="module"
        strategy="afterInteractive"
        src="/scripts/initCesium.js"
      />
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          direction="right"
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width="very wide"
        >
          <RightBar />
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <div id="cesiumContainer" style={{ marginBottom: "1.5em" }}></div>
            <Checkbox
              label="Show Side bar"
              checked={visible}
              onClick={() => setVisible(!visible)}
            ></Checkbox>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      {/* <Script strategy="afterInteractive" src="/scripts/tle/stream.js" />
      <Script strategy="afterInteractive" src="/scripts/tle/tle.js" /> */}
    </>
  );
}
