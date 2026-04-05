let scripts = {};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  let { code } = req.body;

  let id = Date.now();

  scripts[id] = code;

  let link = `https://${req.headers.host}/api/raw?id=${id}`;

  res.json({
    loadstring: `loadstring(game:HttpGet("${link}"))()`
  });
}
