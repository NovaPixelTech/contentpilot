import { NextResponse } from "next/server";

const PLANS: Record<string, { name: string; cents: number }> = {
  starter: { name: "ContentPilot – Starter", cents: 2900 },
  growth: { name: "ContentPilot – Growth", cents: 7900 },
  scale: { name: "ContentPilot – Scale", cents: 19900 },
};

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!secretKey) {
    return NextResponse.json(
      { error: "Zahlungssystem ist nicht konfiguriert." },
      { status: 503 }
    );
  }

  let body: { plan?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const planKey = PLANS[body.plan ?? ""] ? body.plan! : "starter";
  const plan = PLANS[planKey];

  const params = new URLSearchParams();
  params.append("mode", "subscription");
  params.append("success_url", `${siteUrl}/?checkout=success`);
  params.append("cancel_url", `${siteUrl}/?checkout=cancelled`);
  params.append("line_items[0][price_data][currency]", "eur");
  params.append("line_items[0][price_data][unit_amount]", String(plan.cents));
  params.append(
    "line_items[0][price_data][product_data][name]",
    plan.name
  );
  params.append("line_items[0][quantity]", "1");

  let stripeResponse: Response;
  try {
    stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
  } catch {
    return NextResponse.json(
      { error: "Zahlungsdienst fehlgeschlagen." },
      { status: 502 }
    );
  }

  const stripeData = await stripeResponse.json();
  if (!stripeResponse.ok) {
    return NextResponse.json(
      { error: stripeData?.error?.message ?? "Checkout-Session konnte nicht erstellt werden." },
      { status: stripeResponse.status }
    );
  }

  return NextResponse.json({ url: stripeData.url });
}
