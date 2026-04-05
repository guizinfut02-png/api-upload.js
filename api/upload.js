export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  globalThis.scripts = globalThis.scripts || {};

  let { code } = req.body;

  let id = Date.now().toString();

  let encoded = Buffer.from(code).toString("base64");

  globalThis.scripts[id] = encoded;

  let link = `https://${req.headers.host}/api/raw?id=${id}`;

  res.json({
    loadstring: `loadstring(game:HttpGet("${link}"))()`
  });
}
