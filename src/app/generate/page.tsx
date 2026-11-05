"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

type Section = { heading: string; body: string };

type Post = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  keywords: string[];
  sections: Section[];
};

type FormState = {
  niche: string;
  businessName: string;
  location: string;
  services: string;
  topic: string;
  keywords: string;
  tone: string;
};

const INITIAL_FORM: FormState = {
  niche: "",
  businessName: "",
  location: "",
  services: "",
  topic: "",
  keywords: "",
  tone: "professionell",
};

type Status = "idle" | "loading" | "success" | "error";

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

export default function GeneratePage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [post, setPost] = useState<Post | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  function update(key: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleGenerate(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    setPost(null);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? ""}`,
        },
        body: JSON.stringify({
          model: process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-4o",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: JSON.stringify({
                businessName: form.businessName || form.niche,
                niche: form.niche,
                location: form.location,
                services: form.services,
                topic: form.topic || `${form.niche} für ${form.location}`,
                keywords: form.keywords
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean),
                tone: form.tone,
              }),
            },
          ],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message ?? "Artikel konnte nicht generiert werden.");
      }
      const content =
        typeof data.choices?.[0]?.message?.content === "string"
          ? JSON.parse(data.choices[0].message.content)
          : null;
      if (!content) {
        throw new Error("Artikel konnte nicht generiert werden.");
      }
      setPost(content as Post);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Artikel konnte nicht generiert werden.");
      setStatus("error");
    }
  }

  async function copyToClipboard(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a href="/" className="text-lg font-semibold tracking-tight text-zinc-900">
            Content<span className="text-indigo-600">Pilot</span>
          </a>
          <a href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Zur Startseite
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Dein SEO-Blogartikel in 5 Minuten
          </h1>
          <p className="mt-3 text-zinc-600">
            Beschreibe dein Business – ContentPilot generiert Titel, Meta,
            Outline und Draft.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          {status !== "success" ? (
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-900">
                  Dienstleistungs-Nische *
                </label>
                <input
                  required
                  value={form.niche}
                  onChange={(e) => update("niche", e.target.value)}
                  placeholder="z. B. Heizung / Lüftung / Sanitär"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-900">
                  Firmenname <span className="font-normal text-zinc-500">(optional)</span>
                </label>
                <input
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder="z. B. Muster Heizungstechnik"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-900">
                    Standort / Region *
                  </label>
                  <input
                    required
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="z. B. München, Deutschland"
                    className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-900">
                    Ton *
                  </label>
                  <select
                    value={form.tone}
                    onChange={(e) => update("tone", e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="professionell">Professionell</option>
                    <option value="freundlich">Freundlich</option>
                    <option value="fachlich">Fachlich & Experten</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-900">
                  Dienstleistungen *
                </label>
                <input
                  required
                  value={form.services}
                  onChange={(e) => update("services", e.target.value)}
                  placeholder="z. B. Heizungsinstallation, Wartung, Modernisierung"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-900">
                  Zielthema / Keyword-Fokus{" "}
                  <span className="font-normal text-zinc-500">(optional)</span>
                </label>
                <input
                  value={form.topic}
                  onChange={(e) => update("topic", e.target.value)}
                  placeholder="z. B. Energieeffizienz in Altbauten"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-900">
                  Weitere Keywords <span className="font-normal text-zinc-500">(optional, kommagetrennt)</span>
                </label>
                <input
                  value={form.keywords}
                  onChange={(e) => update("keywords", e.target.value)}
                  placeholder="z. B. Heizung sanieren, CO2-Rechner"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              {status === "error" && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 text-base font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    ContentPilot schreibt deinen Artikel…
                  </>
                ) : (
                  "Artikel generieren"
                )}
              </button>
            </form>
          ) : (
            post && (
              <div className="space-y-8">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                    {post.title}
                  </h2>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setPost(null);
                      setForm(INITIAL_FORM);
                    }}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    + Neuer Artikel
                  </button>
                </div>

                <div className="rounded-2xl bg-indigo-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                        Meta-Titel
                      </p>
                      <p className="mt-1 text-sm font-medium text-zinc-900">{post.metaTitle}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard("metaTitle", post.metaTitle)}
                      className="rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
                    >
                      {copiedKey === "metaTitle" ? "Kopiert!" : "Kopieren"}
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                        Meta-Beschreibung
                      </p>
                      <p className="mt-1 text-sm text-zinc-900">{post.metaDescription}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard("metaDescription", post.metaDescription)}
                      className="rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
                    >
                      {copiedKey === "metaDescription" ? "Kopiert!" : "Kopieren"}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                    Keywords
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800">
                      {post.primaryKeyword}
                    </span>
                    {post.keywords
                      .filter((k) => k !== post.primaryKeyword)
                      .map((k) => (
                        <span key={k} className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800">
                          {k}
                        </span>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                    Outline
                  </h3>
                  <ol className="mt-3 space-y-2">
                    {post.sections.map((s, i) => (
                      <li key={i} className="flex gap-3 text-sm text-zinc-800">
                        <span className="mt-0.5 text-indigo-600">{i + 1}.</span>
                        <span>{s.heading}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                    Volltext-Draft
                  </h3>
                  <div className="mt-3 space-y-6">
                    {post.sections.map((s, i) => (
                      <div key={i} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                        <h4 className="text-base font-semibold text-zinc-900">{s.heading}</h4>
                        <div className="mt-2">
                          <p className="text-sm leading-relaxed whitespace-pre-line text-zinc-700">
                            {s.body}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(`section-${i}`, `${s.heading}\n\n${s.body}`)}
                          className="mt-3 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                        >
                          {copiedKey === `section-${i}` ? "Kopiert!" : "Abschnitt kopieren"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
