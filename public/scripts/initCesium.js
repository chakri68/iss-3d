const ISS_ID = "1998-067A";

// Initialize the Cesium viewer.
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYjliNWU5ZS1iYjA1LTRkZGEtYWQwMi0xZDg3NzZlZGRjOTYiLCJpZCI6MTA3NjkxLCJpYXQiOjE2NjI5NTIyODF9.eocbtP_o4-J7GNjEROssPqEKxrhsFaXqZf20ZdxjrFo";
const viewer = new Cesium.Viewer("cesiumContainer", {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
  }),
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  infoBox: false,
  navigationHelpButton: false,
  sceneModePicker: false,
});
// This causes a bug on android, see: https://github.com/CesiumGS/cesium/issues/7871
// viewer.scene.globe.enableLighting = true;
// These 2 lines are published by NORAD and allow us to predict where
// the ISS is at any given moment. They are regularly updated.
// Get the latest from: https://celestrak.com/satcat/tle.php?CATNR=25544.

let r = await fetch("/api/issdata");
let data = await r.json();
console.log(data.data);
// let matcher = /ISS \(ZARYA\)(.*)\\n[A-Z]/;
let matcher = /ISS \(ZARYA\).*\r\n(.*\r\n.*)/;
let results = data.data.match(matcher);
let reqText = results[1];
console.log(reqText);

const ISS_TLE = reqText;
const satrec = satellite.twoline2satrec(
  ISS_TLE.split("\n")[0].trim(),
  ISS_TLE.split("\n")[1].trim()
);
let positions = [];
// Give SatelliteJS the TLE's and a specific time.
// Get back a longitude, latitude, height (km).
// We're going to generate a position every 1 second from now until 6 seconds from now.
const totalSeconds = 60 * 60 * 6;
const timestepInSeconds = 1;
const start = Cesium.JulianDate.fromDate(new Date());
const stop = Cesium.JulianDate.addSeconds(
  start,
  totalSeconds,
  new Cesium.JulianDate()
);
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.timeline.zoomTo(start, stop);
viewer.clock.multiplier = 40;
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

const positionsOverTime = new Cesium.SampledPositionProperty();
for (let i = 0; i < totalSeconds; i += timestepInSeconds) {
  const time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
  const jsDate = Cesium.JulianDate.toDate(time);

  const positionAndVelocity = satellite.propagate(satrec, jsDate);
  const gmst = satellite.gstime(jsDate);
  const p = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

  const position = Cesium.Cartesian3.fromRadians(
    p.longitude,
    p.latitude,
    p.height * 1000
  );
  positionsOverTime.addSample(time, position);
  positions.push(position)
}

// const resource = await Cesium.IonResource.fromAssetId(1337140);
// const entity = viewer.entities.add({
//   model: { uri: resource },
// });

// ISS trajectory
let approachPathEntity = viewer.entities.add({
  polyline: {
    positions: positions,
    material: Cesium.Color.WHITE,
    width: 2,
  }
});

async function loadModel() {
  // Load the glTF model from Cesium ion.
  const airplaneUri = await Cesium.IonResource.fromAssetId(1337140);
  const airplaneEntity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({ start: start, stop: stop }),
    ]),
    position: positionsOverTime,
    // Attach the 3D model instead of the green point.
    model: { uri: airplaneUri },
    // Automatically compute the orientation from the position.
    orientation: new Cesium.VelocityOrientationProperty(positionsOverTime),
  });
  window.airplaneEntity = airplaneEntity;
  viewer.trackedEntity = airplaneEntity;
}

loadModel();

// Visualize the satellite with a red dot.
const satellitePoint = viewer.entities.add({
  position: positionsOverTime,
  point: { pixelSize: 5, color: Cesium.Color.RED },
});


// Set the camera to follow the satellite
// viewer.trackedEntity = satellitePoint;
// Wait for globe to load then zoom out
let initialized = false;
viewer.scene.globe.tileLoadProgressEvent.addEventListener(() => {
  if (!initialized && viewer.scene.globe.tilesLoaded === true) {
    viewer.clock.shouldAnimate = true;
    initialized = true;
    viewer.scene.camera.zoomOut(7000000);
    document.querySelector("#loading").classList.toggle("disappear", true);
  }
});

// viewer.scene.preUpdate.addEventListener(function (scene, time) {
//   console.log(viewer.clock.currentTime)
//   const jsDate = viewer.clock.currentTime;

//   const positionAndVelocity = satellite.propagate(satrec, jsDate);
//   const gmst = satellite.gstime(jsDate);
//   const p = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

//   const position = Cesium.Cartesian3.fromRadians(
//     p.longitude,
//     p.latitude,
//     p.height * 1000
//   );
//   positions.push(position);
// });
window.Cesium = Cesium;
window.viewer = viewer;
window.approachPathEntity = approachPathEntity;