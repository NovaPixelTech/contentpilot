import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 30rem at 70% -10%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(40rem 20rem at 0% 0%, rgba(14,165,233,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 text-center sm:pt-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          Neu: ContentPilot 2.0 mit GPT-4o
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
          Blogartikel, die lokale
          <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            {" "}
            Dienstleister gewinnen
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
          ContentPilot schreibt SEO-optimierte Blogartikel für Handwerker,
          Hausärzte, Dachdecker und andere lokale Dienstleister – automatisch,
          in professioneller deutscher Sprache und mit Fokus auf deine Keywords.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/generate"
            className="inline-flex h-12 items-center justify-center rounded-full bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
          >
            Jetzt kostenlos-artikel generieren
          </Link>
          <Link
            href="#pricing"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white px-8 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            Preise ansehen
          </Link>
        </div>
        <p className="mt-5 text-sm text-zinc-500">
          Kein Fachwissen nötig. In 5 Minuten zu deinem ersten Artikel.
        </p>
      </div>
    </section>
  );
}

export function SocialProof() {
  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 py-8">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">
          Für lokale Dienstleister in DACH
        </p>
        {["Handwerker", "Hausärzte", "Dachdecker", "Sanitär", "Elektro", "Fahrrad"].map(
          (niche) => (
            <span key={niche} className="text-lg font-semibold text-zinc-400">
              {niche}
            </span>
          )
        )}
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "SEO-optimierte Titel & Meta-Beschreibungen",
    text: "Jeder Artikel startet mit einer strategischen Keyword- und Suchintensität-Planung.",
  },
  {
    title: "Strukturiertes Outline",
    text: "Klare Hierarchie mit Einleitung, Hauptabschnitten, FAQ und Fazit – fertig zum Strukturieren.",
  },
  {
    title: "Vollständiger Artikeldraft",
    text: "Ausformulierte, fachsprachlich passende Texte, die sich nahtlos in bestehende Websites einfügen lassen.",
  },
  {
    title: "Lokale Relevanz",
    text: "Bezug auf Region, Stadt und typische Kundenanliegen deiner Dienstleistung.",
  },
  {
    title: "Themen-Vorschläge",
    text: "Kontinuierliche Vorschläge passend zu saisonen und Kundenbedürfnissen deiner Branche.",
  },
  {
    title: "Schnelle Iteration",
    text: "Regenerieren oder anpassen – du behältst jederzeit die Kontrolle über den finalen Text.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Alles, was ein lokales
          <span className="text-indigo-600"> Blog-Team</span> normalerweise braucht
        </h2>
        <p className="mt-4 text-zinc-600">
          ContentPilot übernimmt Recherche, Struktur und Schreibauftrag – du
          bekommst drauf los, was zählt: Kunden finden dich online.
        </p>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-lg">
              ✍️
            </div>
            <h3 className="mt-4 text-base font-semibold text-zinc-900">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Beschreibe dein Business",
      text: "Nische, Standort, Dienstleistungen und Zielthema – oder lass die KI passende Themen vorschlagen.",
    },
    {
      step: "02",
      title: "AI generiert deinen Artikel",
      text: "Keyword-Strategie, Outline und fertiger Draft werden in einem Durchlauf erstellt.",
    },
    {
      step: "03",
      title: "Veröffentlichen & ranken",
      text: "Direkt auf deiner Website einfügen, teilen und warten, bis Google dich findet.",
    },
  ];
  return (
    <section id="how-it-works" className="border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          So einfach funktioniert&apos;s
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
              <span className="text-4xl font-bold text-indigo-200">{s.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-zinc-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Wie schnell bekomme ich einen fertigen Artikel?",
    a: "In der Regel innerhalb eines Tages. Starter-Abonnenten erhalten ihren Artikel monatlich; bei Growth und Scale werden Themen priorisiert und Drafts schneller erstellt.",
  },
  {
    q: "Wer darf ContentPilot nutzen?",
    a: "Lokale Dienstleister mit eigener Website und eigener Kundenbasis – Handwerker, Hausärzte, Dachdecker, Sanitär, Elektro und ähnliche Nischen.",
  },
  {
    q: "Muss ich mich um SEO auskennen?",
    a: "Nein. ContentPilot erstellt Keyword-Konzepte und optimierte Titel und Texte – du musst nur entscheiden, ob der Artikel so auf deiner Website veröffentlicht wird.",
  },
  {
    q: "Kann ich eigene Themen oder Keywords vorschlagen?",
    a: "Ja. Bei den höheren Plänen kannst du pro Monat bis zu fünf Hauptschlüsselwörter oder konkrete Themenvorschläge angeben.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Häufige Fragen
        </h2>
        <div className="mt-12 space-y-4">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-zinc-900">
                {f.q}
                <span className="text-indigo-600 transition-transform group-open:rotate-180">
                  ⌄
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-16 text-center sm:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(40rem 20rem at 50% -40%, rgba(99,102,241,0.5), transparent 70%)",
          }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Dein erster SEO-Artikel wartet auf dich
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Beschreibe dein Business – ContentPilot macht den Rest. Dein
            erster Artikel in unter 10 Minuten.
          </p>
          <div className="mt-8">
            <Link
              href="/generate"
              className="inline-flex h-12 items-center justify-center rounded-full bg-indigo-600 px-8 text-base font-semibold text-white transition-all hover:bg-indigo-700"
            >
              Jetzt Artikel generieren
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
