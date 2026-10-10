export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  if (!name || name.length > 60) {
    return res.status(400).json({ error: "Digite um nome com até 60 caracteres." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "A geração de imagens ainda não foi configurada. Adicione OPENAI_API_KEY nas variáveis de ambiente da hospedagem."
    });
  }

  const prompt = [
    "Create a photorealistic premium product photograph of one professional business review plaque displayed on an elegant reception counter.",
    "The plaque is a tasteful black acrylic rectangular sign with a subtle thin polished edge, realistic reflections, premium craftsmanship, and a stable discreet stand.",
    "The plaque is photographed from a slightly front-facing three-quarter angle in a sophisticated modern reception area, soft natural window lighting, shallow depth of field, realistic materials, high-end commercial product photography.",
    "The only readable wording on the plaque must be exactly: \"" + name.replace(/["\\]/g, "") + "\".",
    "Keep the requested name centered, spelled exactly as provided, clear and legible, in refined white lettering. Do not add any other words, letters, logos, QR codes, watermarks, or decorative text.",
    "Portrait composition, plaque fully visible and centered, realistic size and proportions, clean professional scene, no people, no hands."
  ].join(" ");

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "1024x1536",
        quality: "high",
        output_format: "png"
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("OpenAI image generation failed:", data?.error?.message || response.status);
      return res.status(502).json({
        error: data?.error?.message || "A IA não conseguiu gerar a imagem agora. Tente novamente."
      });
    }

    const image = data?.data?.[0]?.b64_json;
    if (!image) {
      return res.status(502).json({ error: "A IA não retornou uma imagem. Tente novamente." });
    }

    return res.status(200).json({ image });
  } catch (error) {
    console.error("Image generation error:", error);
    return res.status(500).json({ error: "Falha de conexão ao gerar a imagem. Tente novamente." });
  }
}
