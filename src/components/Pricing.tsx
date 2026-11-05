import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    price: "29€",
    period: "/Monat",
    description: "Für den ersten Schritt in die lokale SEO.",
    features: [
      "1 Blogartikel / Monat",
      "1 Haupt-Keyword",
      "Outline + Volltext-Draft",
      "E-Mail-Support",
    ],
    cta: "Starter wählen",
    featured: false,
  },
  {
    name: "Growth",
    price: "79€",
    period: "/Monat",
    description: "Unsere beliebteste Wahl für wachsende Dienstleister.",
    features: [
      "4 Blogartikel / Monat",
      "3 Haupt-Keywords",
      "Outline + Volltext-Draft",
      "Themen-Vorschläge nach Saison",
      "Priority-Support",
    ],
    cta: "Growth wählen",
    featured: true,
  },
  {
    name: "Scale",
    price: "199€",
    period: "/Monat",
    description: "Für Agenturen und wachsende lokale Websites.",
    features: [
      "12 Blogartikel / Monat",
      "5 Haupt-Keywords",
      "Outline + Volltext-Draft",
      "Content-Calendar",
      "Dedicated-Support",
    ],
    cta: "Scale wählen",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Einfache Preise, sofort loslegbar
          </h2>
          <p className="mt-4 text-zinc-600">
            Ein Artikel = werbe- und ranking-Wert für deine lokale Website.
            Jeder Monat ohne Content ist ein Monat ohne neue Kunden.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-8 shadow-sm ${
                plan.featured
                  ? "border-indigo-600 bg-white shadow-xl ring-2 ring-indigo-600"
                  : "border-zinc-200 bg-white"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 w-fit -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Beliebt
                </span>
              )}
              <h3 className="text-lg font-semibold text-zinc-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">{plan.description}</p>
              <p className="mt-6">
                <span className="text-5xl font-bold tracking-tight text-zinc-900">
                  {plan.price}
                </span>
                <span className="ml-1 text-sm text-zinc-500">{plan.period}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-700">
                    <span className="mt-0.5 text-indigo-600">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/generate?plan=starter"
                className={`mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all ${
                  plan.featured
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
