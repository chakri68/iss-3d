export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        let r = await fetch(
          "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations"
        );
        let data = await r.text();
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
