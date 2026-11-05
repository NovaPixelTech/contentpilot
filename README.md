# ContentPilot

AI-Blogartikel-Generator für lokale Dienstleister (Handwerker, Hausärzte, Dachdecker, Sanitär, Elektro …).

## Features

- Landing Page mit Preise (Starter 29€ / Growth 79€ / Scale 199€/Monat)
- Generator: Business-Beschreibung → SEO-Titel, Meta, Keyword-Outline, Volltext-Draft
- AI: OpenAI Chat Completions (`response_format: json_object`) → strukturierter Post
- Checkout: Stripe Checkout Sessions (Subscription)

## Setup

```bash
cp .env.example .env.local
# OPENAI_API_KEY = sk-...
# STRIPE_SECRET_KEY = sk_...
# NEXT_PUBLIC_SITE_URL = https://your-domain.com

npm run dev
```

## Deploy

Vercel:

```bash
npm i -g vercel
vercel login
vercel
```

## Monetarisierung (Ziel: ~500€/Monat)

- Growth Plan: 79€/Monat → Ziel: 7 Abonnenten
- Scale Plan: 199€/Monat → Ziel: 2 Abonnenten
- Stripe Checkout ist via `/api/checkout` mit `STRIPE_SECRET_KEY` aktivierbar.
