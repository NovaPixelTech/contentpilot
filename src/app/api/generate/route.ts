import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Du bist ContentPilot, ein Experte für SEO-Blogartikel für lokale Dienstleister in deutschsprachigen Ländern.

Deine Aufgabe: Erstelle einen hochwertigen, hilfreichen und suchmaschinenoptimierten Blogartikel.

Antworte AUSSCHLIESSLICH mit einem JSON-Objekt in genau dieser Struktur:
{
  "title": "Artikel-Titel (max. 60 Zeichen)",
  "slug": "url-freundlicher-slug (klein, mit Bindestrich, deutsch)",
  "metaTitle": "Meta-Titel (max. 60 Zeichen)",
  "metaDescription": "Meta-Beschreibung (max. 155 Zeichen)",
  "primaryKeyword": "Haupt-Keyword",
  "keywords": ["Keyword 1", "Keyword 2"],
  "sections": [
    { "heading": "Abschnittstitel", "body": "Text mit Absätzen, Absätze durch Leerzeile getrennt" }
  ]
}

Regeln:
- title: max. 60 Zeichen, enthält das Haupt-Keyword, klickwürdig und informativ.
- slug: klein, mit Bindestrich, ohne Sonderzeichen, deutsch/englisch gemischt.
- metaTitle: max. 60 Zeichen, mit Keyword, Titel-Klausel.
- metaDescription: max. 155 Zeichen, mit Call-to-Action, mit Keyword.
- sections: 3 bis 6 Abschnitte. Erst Abschnitt: Einleitung. Dann Hauptinhalte (2-4). Dann Fazit. Body-Texte in natürlicher, gut lesbarer deutscher Sprache. Absätze durch Leerzeile trennen. Keine Markdown-Sonderzeichen im Body, nur Klartext-Absätze.

Artikel sollten fachlich fundiert, aber verständlich für lokale Kunden sein und lokale Bezüge (Region, Stadt) enthalten.`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Die KI ist aktuell nicht konfiguriert. Bitte OPENAI_API_KEY setzen." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const niche = String(body.niche ?? "").trim();
  const businessName = String(body.businessName ?? "").trim();
  const location = String(body.location ?? "").trim();
  const services = String(body.services ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const tone = String(body.tone ?? "professionell");
  const keywords = Array.isArray(body.keywords)
    ? (body.keywords as string[]).map((k) => k.trim()).filter(Boolean)
    : typeof body.keywords === "string"
      ? (body.keywords as string)
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : [];

  if (!niche || !location || !services) {
    return NextResponse.json(
      { error: "Bitte Nische, Standort und Dienstleistungen angeben." },
      { status: 400 }
    );
  }

  const userPrompt = JSON.stringify({
    businessName: businessName || niche,
    niche,
    location,
    services,
    topic: topic || `${niche} für ${location}`,
    keywords,
    tone,
  });

  let aiResponse: Response;
  try {
    aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "KI-Anfrage fehlgeschlagen. Bitte später erneut versuchen." },
      { status: 502 }
    );
  }

  if (!aiResponse.ok) {
    return NextResponse.json(
      { error: "Die KI konnte den Artikel nicht erstellen. Bitte später erneut versuchen." },
      { status: 502 }
    );
  }

  const aiData = await aiResponse.json();
  const content: string = aiData?.choices?.[0]?.message?.content ?? "{}";
  let post: Record<string, unknown>;
  try {
    post = JSON.parse(content);
  } catch {
    return NextResponse.json(
      { error: "Die KI-Antwort war ungültig. Bitte erneut versuchen." },
      { status: 502 }
    );
  }

  return NextResponse.json({ post });
}
