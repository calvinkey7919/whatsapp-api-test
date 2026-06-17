import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { recipient, message } = await request.json();

    // Vercel എൻവയൺമെന്റ് വേരിയബിളുകളിൽ നിന്നുമുള്ള സുരക്ഷിത ഡാറ്റ
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const token = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneId || !token) {
      return NextResponse.json(
        { error: 'Server configuration missing: API credentials not found.' },
        { status: 500 }
      );
    }

    const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: recipient,
        type: "text",
        text: { body: message }
      })
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
