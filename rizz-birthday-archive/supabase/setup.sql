create table if not exists public.birthday_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 45),
  message text not null check (char_length(message) <= 1000),
  memory text check (char_length(memory) <= 500),
  image_url text,
  link text,
  card_style text not null check (card_style in ('envelope', 'tarot', 'zine', 'achievement')),
  created_at timestamptz not null default now()
);
alter table public.birthday_messages enable row level security;
insert into storage.buckets (id, name, public) values ('rizz-media', 'rizz-media', true) on conflict (id) do update set public = true;
