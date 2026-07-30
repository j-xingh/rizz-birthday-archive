# Rizz's Birthday Archive

## The only two links

- `https://YOUR-VERCEL-URL.vercel.app/` — send only to Rizz.
- `https://YOUR-VERCEL-URL.vercel.app/write` — send to friends.

Friends submit a note, an optional image/GIF, and an optional link. Their submission is saved immediately and appears automatically on Rizz's page within 15 seconds.

## One-time Supabase setup

1. Create a Supabase project.
2. In **SQL Editor**, run `supabase/setup.sql`.
3. In **Project Settings → API**, copy the project URL and the `service_role` key.
4. Copy `.env.example` to `.env.local` and add those values locally.
5. In Vercel, add the same three environment variables under **Project → Settings → Environment Variables**:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_FINAL_SURPRISE_URL` — a playlist, gift, video, or final surprise URL.

Never share the service-role key. It is only used by the server-side `/api/letters` route.

## Local run

```powershell
npm.cmd run dev
```

Open `http://localhost:3000/` for Rizz's page or `http://localhost:3000/write` for the friend form.
