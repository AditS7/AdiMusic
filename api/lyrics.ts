export default async function handler(req: any, res: any) {
  try {
    const url = req.query.url;
    if (!url || typeof url !== 'string') {
      res.status(400).send('No url provided');
      return;
    }
    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status).send('Fetch failed');
      return;
    }
    const text = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(text);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
}
