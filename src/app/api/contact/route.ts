import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const LIMITS = { name: 100, email: 254, message: 5000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort in-memory rate limit (per server instance): 5 messages / 10 min per IP.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound.
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function field(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json(
      { error: "Contact form is not configured. Please set GOOGLE_SCRIPT_URL." },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  // Honeypot filled in → almost certainly a bot. Pretend success so it doesn't retry.
  if (field(formData, "website")) {
    return NextResponse.json({ message: "Message sent successfully!" });
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const name = field(formData, "Name");
  const email = field(formData, "Email");
  const message = field(formData, "Message");

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json(
      { error: `Message is too long (max ${LIMITS.message} characters).` },
      { status: 400 },
    );
  }

  // Forward only the expected fields.
  const payload = new FormData();
  payload.set("Name", name);
  payload.set("Email", email);
  payload.set("Message", message);

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: payload,
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Upstream submission failed with ${response.status}`);
    }

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("[contact] submission failed:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 502 },
    );
  }
}
