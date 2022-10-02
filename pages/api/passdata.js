const OPENSTREET_API = "https://nominatim.openstreetmap.org/search";
const SATELLITE_API = "https://api.g7vrd.co.uk/v1/satellite-passes";
const ISS_NORAD_ID = "25544";
// https://api.g7vrd.co.uk/v1/satellite-passes/[norad_id]/[lat]/[lon].json

export default async function handler(req, res) {
  let { method, body } = req;
  body = JSON.parse(body);
  switch (method) {
    case "POST":
      let data;
      try {
        if (body.hasOwnProperty("lon") && body.hasOwnProperty("lat")) {
          // From coordinates
          let r = await fetch(
            `${SATELLITE_API}/${ISS_NORAD_ID}/${body.lat}/${body.lon}.json`
          );
          data = await r.json();
        } else if (body.hasOwnProperty("query")) {
          body.query.format = "json";
          // From query string
          let r = await fetch(
            `${OPENSTREET_API}?${new URLSearchParams(body.query).toString()}`
          );
          let d = await r.json();
          let r2 = await fetch(
            `${SATELLITE_API}/${ISS_NORAD_ID}/${d[0].lat}/${d[0].lon}.json`
          );
          data = await r2.json();
          data = { data, location: d[0] };
        }
        res.status(200).json({ success: true, ...data });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
