import { NextResponse } from 'next/server';

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const configured = Boolean(url && serviceKey);
const headers = () => ({ apikey: serviceKey ?? '', Authorization: `Bearer ${serviceKey ?? ''}` });

export async function GET() {
  if (!configured) return NextResponse.json({ messages: [], configured: false });
  const response = await fetch(`${url}/rest/v1/birthday_messages?select=id,name,message,memory,image_url,link,card_style,created_at&order=created_at.desc`, { headers: headers(), cache: 'no-store' });
  if (!response.ok) return NextResponse.json({ error: 'Could not load messages.' }, { status: 500 });
  return NextResponse.json({ messages: await response.json(), configured: true });
}

export async function POST(request: Request) {
  if (!configured) return NextResponse.json({ error: 'The message database is not connected yet. Ask the site owner to finish the Supabase setup.' }, { status: 503 });
  const form = await request.formData();
  const name = String(form.get('name') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();
  const memory = String(form.get('memory') ?? '').trim();
  const link = String(form.get('link') ?? '').trim();
  const cardStyle = String(form.get('style') ?? 'envelope');
  if (!name || !message) return NextResponse.json({ error: 'Please add your name and message.' }, { status: 400 });
  if (!['envelope', 'tarot', 'zine', 'achievement'].includes(cardStyle)) return NextResponse.json({ error: 'Invalid card style.' }, { status: 400 });
  let imageUrl: string | null = null;
  const media = form.get('media');
  if (media instanceof File && media.size > 0) {
    if (!media.type.startsWith('image/') || media.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'Please upload an image or GIF smaller than 5 MB.' }, { status: 400 });
    const extension = media.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '') || 'jpg';
    const path = `${crypto.randomUUID()}.${extension}`;
    const upload = await fetch(`${url}/storage/v1/object/rizz-media/${path}`, { method: 'POST', headers: { ...headers(), 'Content-Type': media.type, 'x-upsert': 'false' }, body: Buffer.from(await media.arrayBuffer()) });
    if (!upload.ok) return NextResponse.json({ error: 'Your image could not be uploaded.' }, { status: 500 });
    imageUrl = `${url}/storage/v1/object/public/rizz-media/${path}`;
  }
  const insert = await fetch(`${url}/rest/v1/birthday_messages`, { method: 'POST', headers: { ...headers(), 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify({ name, message, memory: memory || null, image_url: imageUrl, link: link || null, card_style: cardStyle }) });
  if (!insert.ok) return NextResponse.json({ error: 'Your message could not be saved.' }, { status: 500 });
  return NextResponse.json({ message: (await insert.json())[0] }, { status: 201 });
}
