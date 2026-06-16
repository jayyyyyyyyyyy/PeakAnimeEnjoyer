create table if not exists public.interest_votes (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  anime_id uuid not null references public.anime(id) on delete cascade,
  score integer not null check (score between 1 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint interest_votes_one_vote_per_user_per_season
    unique (season_id, user_id)
);

alter table public.interest_votes enable row level security;

create policy "Members can read their own interest vote"
on public.interest_votes
for select
to authenticated
using (user_id = auth.uid());

create policy "Club owners can read season interest votes"
on public.interest_votes
for select
to authenticated
using (
  exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = interest_votes.season_id
      and cm.user_id = auth.uid()
      and cm.role = 'OWNER'
  )
);

create policy "Members can create their own interest vote"
on public.interest_votes
for insert
to authenticated
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = interest_votes.season_id
      and cm.user_id = auth.uid()
      and s.status = 'INTEREST_VOTING'
  )
  and exists (
    select 1
    from public.season_challenges sc
    where sc.season_id = interest_votes.season_id
      and sc.receiver_user_id = auth.uid()
      and sc.anime_id = interest_votes.anime_id
  )
);

create policy "Members can update their own interest vote"
on public.interest_votes
for update
to authenticated
using (user_id = auth.uid())
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.seasons s
    where s.id = interest_votes.season_id
      and s.status = 'INTEREST_VOTING'
  )
  and exists (
    select 1
    from public.season_challenges sc
    where sc.season_id = interest_votes.season_id
      and sc.receiver_user_id = auth.uid()
      and sc.anime_id = interest_votes.anime_id
  )
);
