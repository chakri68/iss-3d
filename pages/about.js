import { Header, Segment, Card, List, Label, Icon } from "semantic-ui-react";
import styles from "../styles/About.module.css"

export default function About() {
  return (
    <Segment padded>
      <Header size="huge" color="red">
        ISS - 3D
      </Header>
      <Header size="large">HIGH-LEVEL PROJECT SUMMARY</Header>
      <Card fluid>
        <Card.Content>
          This page tracks ISS using TLE (Two Line Element Set) data obtained
          from NORAD and displays a 3D model of ISS. Also enables users to see
          when the ISS passes over their location
        </Card.Content>
      </Card>
      <Header size="large">LINK TO FINAL PROJECT</Header>
      <a href="https://github.com/chakri68/iss-3d">
        https://github.com/chakri68/iss-3d
      </a>
      <Header size="large">LINK TO PROJECT &quot;DEMO&quot;</Header>
      <a href="https://iss-3d.vercel.app/">https://iss-3d.vercel.app/</a>
      <Header size="large">DETAILED PROJECT DESCRIPTION</Header>
      <Header size="large" color="grey">
        <em>ISS in 3D</em>
      </Header>
      <Header size="large">WHAT IT DOES</Header>
      <List bulleted className={styles.greyList}>
        <List.Item>
          Visualizes the orbit of ISS around the earth using 3d models of them
        </List.Item>
        <List.Item>
          Get details on when ISS could pass over their location
        </List.Item>
        <List.Item>Change the speed of the timeline</List.Item>
      </List>
      <Header size="large">BENEFITS</Header>
      <List bulleted className={styles.greyList}>
        <List.Item>
          Helps users visualize ISS orbit and explore the 3d model of ISS
        </List.Item>
      </List>
      <Header size="large">TOOLS, LANGUAGES USED</Header>
      <List bulleted className={styles.greyList}>
        <List.Item>NextJS for frontend UI and backend</List.Item>
        <List.Item>semantic-UI react library for UI elements</List.Item>
        <List.Item>CesiumJS library for the 3d models and 3d modeling API</List.Item>
        <List.Item>
          satelliteJS library for conversion of TLE to orbit objects cesiumJS
          can use
        </List.Item>
        <List.Item>openstreet API for geocoding</List.Item>
        <List.Item>SPACE AGENCY DATA</List.Item>
        <List.Item>3d model of ISS from NASA</List.Item>
        <List.Item>TLE data from CelesTrak</List.Item>
      </List>
      <Header size="large">REFERENCES</Header>
      <List bulleted className={styles.greyList}>
        <List.Item>NextJS - The react framework for production</List.Item>
        <List.Item> ReactJS - A JavaScript library for building user interfaces</List.Item>
        <List.Item>
          Semantic UI React - The official Semantic-UI-React integration.
        </List.Item>
        <List.Item> cesiumJS - 3D geospatial visualization for the web</List.Item>
        <List.Item> satellite.js - SGP4/SDP4 calculation library</List.Item>
        <List.Item> openstreet API - Geocoding</List.Item>
        <List.Item> CelesTrak API - To track ISS</List.Item>
        <List.Item> ISS SVG from SVG Repo</List.Item>
        <List.Item> medium article on building a satellite tracker</List.Item>
      </List>
      <Header size="large">
        TAGS
      </Header>
      <Label as="a">
        <Icon name="hashtag"></Icon> cesiumjs
      </Label>
      <Label as="a">
        <Icon name="hashtag"></Icon> celestrak
      </Label>
      <Label as="a">
        <Icon name="hashtag"></Icon> satellitejs
      </Label>
    </Segment>
  );
}
