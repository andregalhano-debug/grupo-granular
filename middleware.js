// Preview de links (WhatsApp/Facebook/LinkedIn/Slack) para /pitch e /apresentacao.
// Arquitetura: bots recebem HTML ultra-minimo com OG DAQUI (mesma origem www),
// sem proxy externo. Imagens em public/pitch|apresentacao/og-share.* (filesystem
// vence rewrite). Humanos passam → vercel.json rewrite para apps com senha.
// Defense-in-depth: os apps pitch/sistema tambem tem middleware isPreviewBot.
export const config = {
  matcher: [
    "/pitch",
    "/pitch/",
    "/apresentacao",
    "/apresentacao/",
  ],
};

// Variantes reais WhatsApp/Meta + scrapers de preview.
const BOT_RE = /(?:^|[^a-z])(?:whatsapp(?:bot)?|facebookexternalhit|facebot|facebookbot|meta-externalagent|meta-externalfetcher|twitterbot|linkedinbot|slackbot|slack-imgproxy|discordbot|telegrambot|skypeuripreview|googlebot|google-inspectiontool|storebot-google|bingbot|applebot|embedly|quora link preview|pinterest(?:bot)?|redditbot|vkshare|w3c_validator|iframely|bitlybot|nuzzel|duckduckbot|baiduspider|yandex(?:bot)?|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider|opengraph|preview)(?:[^a-z]|$)|(?:\b|_)(?:bot|crawler|spider)(?:\b|_)/i;

function isBot(req) {
  const ua = req.headers.get("user-agent") || "";
  if (!ua) return false;
  return BOT_RE.test(ua);
}

function ogPage({ title, desc, url, image, alt }, method) {
  const headers = {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=300, must-revalidate",
    "Vary": "User-Agent",
    "X-Robots-Tag": "noindex, nofollow, max-image-preview:large",
  };
  if (method === "HEAD") {
    return new Response(null, { status: 200, headers });
  }
  // Ultra-minimo: so meta OG + title + 1 img (scrapers confusos com markup extra).
  const html = `<!DOCTYPE html><html lang="pt-BR"><head>
<meta charset="utf-8">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Granular">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:secure_url" content="${image}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${alt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${image}">
<link rel="canonical" href="${url}">
<link rel="image_src" href="${image}">
</head><body>
<img src="${image}" width="1200" height="630" alt="${alt}">
</body></html>`;
  return new Response(html, { status: 200, headers });
}

export default function middleware(req) {
  if (req.method !== "GET" && req.method !== "HEAD") return;
  if (!isBot(req)) return; // humano → rewrite externo (apps com senha)

  const path = new URL(req.url).pathname.replace(/\/+$/, "") || "/";

  if (path === "/pitch") {
    return ogPage({
      title: "Granular — Pitch de investimento · Seed 2026",
      desc: "Rodada Seed 2026. Plataforma de operação e lucro para delivery, do food ao pet — já em escala com dados reais.",
      url: "https://www.grupogranular.com.br/pitch/",
      image: "https://www.grupogranular.com.br/pitch/og-share.jpg",
      alt: "Granular — pitch de investimento",
    }, req.method);
  }

  if (path === "/apresentacao") {
    return ogPage({
      title: "Granular — Sistema · a Granu",
      desc: "A Granu — IA do sistema inteiro. Um grão, quatro frentes, operação e lucro em tempo real.",
      url: "https://www.grupogranular.com.br/apresentacao/",
      image: "https://www.grupogranular.com.br/apresentacao/og-share.jpg",
      alt: "Granular — apresentação do sistema",
    }, req.method);
  }
}
