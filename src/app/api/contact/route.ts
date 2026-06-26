import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json(
      { error: "Contact form is not configured. Please set GOOGLE_SCRIPT_URL." },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const name = formData.get("Name");
    const email = formData.get("Email");
    const message = formData.get("Message");

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const response = await fetch(scriptUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upstream submission failed");
    }

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
