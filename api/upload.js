export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  let { code } = req.body;

  let fileName = `script_${Date.now()}.lua`;

  // ⚠️ COLOCA SEU USER AQUI
  let user = "SEUUSER";

  // ⚠️ COLOCA SEU TOKEN AQUI
  let token = "SEU_TOKEN";

  await fetch(`https://api.github.com/repos/${user}/script-protector/contents/${fileName}`, {
    method: "PUT",
    headers: {
      "Authorization": `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "novo script",
      content: Buffer.from(code).toString("base64")
    })
  });

  let raw = `https://raw.githubusercontent.com/${user}/script-protector/main/${fileName}`;

  res.json({
    loadstring: `loadstring(game:HttpGet("${raw}"))()`
  });
}
