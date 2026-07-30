import { NextResponse } from 'next/server';

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(url && serviceKey);

const headers = () => ({
  apikey: serviceKey ?? '',
  Authorization: `Bearer ${serviceKey ?? ''}`,
});

export async function GET() {
  try {
    if (!configured) {
      return NextResponse.json({
        messages: [],
        configured: false,
      });
    }

    const response = await fetch(
      `${url}/rest/v1/birthday_messages?select=id,name,message,memory,image_url,link,card_style,created_at&order=created_at.desc`,
      {
        headers: headers(),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const error = await response.text();

      console.error('GET Error:', error);

      return NextResponse.json(
        {
          error: 'Could not load messages.',
        },
        {
          status: 500,
        }
      );
    }

    const messages = await response.json();

    return NextResponse.json({
      messages,
      configured: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: 'Unexpected server error.',
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!configured) {
      return NextResponse.json(
        {
          error:
            'The message database is not connected yet. Ask the site owner to finish the Supabase setup.',
        },
        {
          status: 503,
        }
      );
    }

    const form = await request.formData();

    const name = String(form.get('name') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const memory = String(form.get('memory') ?? '').trim();
    const link = String(form.get('link') ?? '').trim();

    if (!name || !message) {
      return NextResponse.json(
        {
          error: 'Please enter your name and message.',
        },
        {
          status: 400,
        }
      );
    }

    let imageUrl: string | null = null;

    const media = form.get('media');

    if (media instanceof File && media.size > 0) {
      if (
        !media.type.startsWith('image/') ||
        media.size > 5 * 1024 * 1024
      ) {
        return NextResponse.json(
          {
            error:
              'Please upload an image/GIF smaller than 5 MB.',
          },
          {
            status: 400,
          }
        );
      }

      const extension =
        media.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') ??
        'jpg';

      const path = `${crypto.randomUUID()}.${extension}`;

      const upload = await fetch(
        `${url}/storage/v1/object/rizz-media/${path}`,
        {
          method: 'POST',
          headers: {
            ...headers(),
            'Content-Type': media.type,
            'x-upsert': 'false',
          },
          body: await media.arrayBuffer(),
        }
      );

      if (!upload.ok) {
        const uploadError = await upload.text();

        console.error('Upload Error:', uploadError);

        return NextResponse.json(
          {
            error: 'Image upload failed.',
            details: uploadError,
          },
          {
            status: 500,
          }
        );
      }

      imageUrl = `${url}/storage/v1/object/public/rizz-media/${path}`;
    }

    const insert = await fetch(
      `${url}/rest/v1/birthday_messages`,
      {
        method: 'POST',
        headers: {
          ...headers(),
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          name,
          message,
          memory: memory || null,
          image_url: imageUrl,
          link: link || null,

          // Force every message to use the leather envelope
          card_style: 'envelope',
        }),
      }
    );

    if (!insert.ok) {
      const insertError = await insert.text();

      console.error('Insert Error:', insertError);

      return NextResponse.json(
        {
          error: 'Your message could not be saved.',
          details: insertError,
        },
        {
          status: 500,
        }
      );
    }

    const inserted = await insert.json();

    return NextResponse.json(
      {
        message: inserted?.[0] ?? null,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error('POST Error:', err);

    return NextResponse.json(
      {
        error: 'Unexpected server error.',
      },
      {
        status: 500,
      }
    );
  }
}