create table if not exists public.final_reviews (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,

  story integer not null check (story between 1 and 10),
  characters integer not null check (characters between 1 and 10),
  animation integer not null check (animation between 1 and 10),
  soundtrack integer not null check (soundtrack between 1 and 10),
  world_building integer not null check (world_building between 1 and 10),
  pacing integer not null check (pacing between 1 and 10),
  emotional_impact integer not null check (emotional_impact between 1 and 10),
  overall numeric(4, 2) not null check (overall between 1 and 10),

  review text,
  locked boolean not null default true,
  revealed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint final_reviews_one_review_per_user_per_season
    unique (season_id, user_id),
  constraint final_reviews_review_max_length
    check (char_length(coalesce(review, '')) <= 1000)
);

alter table public.final_reviews enable row level security;

create policy "Members can read their own final review"
on public.final_reviews
for select
to authenticated
using (user_id = auth.uid());

create policy "Members can read revealed final reviews"
on public.final_reviews
for select
to authenticated
using (
  revealed = true
  and exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = final_reviews.season_id
      and cm.user_id = auth.uid()
  )
);

create policy "Club owners can read season final reviews"
on public.final_reviews
for select
to authenticated
using (
  exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = final_reviews.season_id
      and cm.user_id = auth.uid()
      and cm.role = 'OWNER'
  )
);

create policy "Members can submit their own final review"
on public.final_reviews
for insert
to authenticated
with check (
  user_id = auth.uid()
  and locked = true
  and revealed = false
  and exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = final_reviews.season_id
      and cm.user_id = auth.uid()
      and s.status = 'REVIEW'
  )
);

create policy "Club owners can reveal final reviews"
on public.final_reviews
for update
to authenticated
using (
  exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = final_reviews.season_id
      and cm.user_id = auth.uid()
      and cm.role = 'OWNER'
  )
)
with check (
  revealed = true
  and exists (
    select 1
    from public.seasons s
    join public.club_members cm
      on cm.club_id = s.club_id
    where s.id = final_reviews.season_id
      and cm.user_id = auth.uid()
      and cm.role = 'OWNER'
  )
);
