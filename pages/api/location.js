const OPENSTREET_API = "https://nominatim.openstreetmap.org/search";

export default async function handler(req, res) {
  const { method, query } = req;
  query.format = "json";
  switch (method) {
    case "GET":
      try {
        let r = await fetch(
          `${OPENSTREET_API}?${new URLSearchParams(query).toString()}`
        );
        let data = await r.json();
        res.status(200).json({ success: true, data });
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
