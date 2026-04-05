let scripts = {};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  let { code } = req.body;

  let id = Date.now();

  // mini ofuscação
  let encoded = Buffer.from(code).toString("base64");

  scripts[id] = encoded;

  let link = `https://${req.headers.host}/api/raw?id=${id}`;

  res.json({
    loadstring: `loadstring(game:HttpGet("${link}"))()`
  });
}
