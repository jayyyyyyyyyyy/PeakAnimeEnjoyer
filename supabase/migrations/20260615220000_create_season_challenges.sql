create table if not exists public.season_challenges (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons(id) on delete cascade,
  giver_user_id uuid not null references public.profiles(id) on delete cascade,
  receiver_user_id uuid not null references public.profiles(id) on delete cascade,
  anime_id uuid not null references public.anime(id) on delete cascade,
  created_at timestamptz not null default now(),

  constraint season_challenges_no_self_assignment
    check (giver_user_id <> receiver_user_id),
  constraint season_challenges_one_receiver_per_season
    unique (season_id, receiver_user_id),
  constraint season_challenges_one_anime_per_season
    unique (season_id, anime_id)
);

alter table public.season_challenges enable row level security;

create policy "Members can read their own challenge"
on public.season_challenges
for select
to authenticated
using (receiver_user_id = auth.uid());

create policy "Club owners can read season challenges"
on public.season_challenges
for select
to authenticated
using (
  exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = season_challenges.season_id
      and cm.user_id = auth.uid()
      and cm.role = 'OWNER'
  )
);

create policy "Club owners can create season challenges"
on public.season_challenges
for insert
to authenticated
with check (
  exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = season_challenges.season_id
      and cm.user_id = auth.uid()
      and cm.role = 'OWNER'
  )
  and exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = season_challenges.season_id
      and cm.user_id = season_challenges.giver_user_id
  )
  and exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = season_challenges.season_id
      and cm.user_id = season_challenges.receiver_user_id
  )
  and exists (
    select 1
    from public.anime_proposals ap
    where ap.season_id = season_challenges.season_id
      and ap.user_id = season_challenges.giver_user_id
      and ap.anime_id = season_challenges.anime_id
  )
);
