-- Verified AI Cast Phase 2 foundation.
-- Apply in a Supabase project before connecting the frontend.

create extension if not exists pgcrypto;

create type public.app_role as enum ('actor', 'agency_reviewer', 'creator', 'platform_operator');
create type public.review_status as enum ('submitted', 'reviewing', 'changes_requested', 'approved', 'rejected', 'revoked');
create type public.certificate_status as enum ('active', 'revoked', 'expired');
create type public.audit_action as enum ('submitted', 'review_started', 'approved', 'rejected', 'changes_requested', 'revoked');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role public.app_role not null,
  created_at timestamptz not null default now()
);

create table public.agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  verification_status text not null default 'pending',
  legal_contact_email text,
  created_at timestamptz not null default now()
);

create table public.agency_members (
  agency_id uuid not null references public.agencies(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  primary key (agency_id, profile_id)
);

create table public.talents (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id),
  display_name text not null,
  category text not null default 'Actor',
  territory text not null,
  reputation_score integer not null default 0 check (reputation_score between 0 and 100),
  created_at timestamptz not null default now()
);

create table public.talent_policies (
  id uuid primary key default gen_random_uuid(),
  talent_id uuid not null references public.talents(id) on delete cascade,
  version integer not null,
  allowed_uses text[] not null default '{}',
  restricted_uses text[] not null default '{}',
  likeness_boundaries text[] not null default '{}',
  required_disclosures text[] not null default '{}',
  review_sla_hours integer not null,
  minimum_license_fee numeric(12,2) not null,
  created_at timestamptz not null default now(),
  unique (talent_id, version)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id),
  talent_id uuid not null references public.talents(id),
  policy_id uuid not null references public.talent_policies(id),
  title text not null,
  producer text not null,
  intended_use text not null,
  territory text not null,
  duration text not null,
  budget numeric(12,2) not null default 0,
  status public.review_status not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  version integer not null,
  script_text text,
  prompt_log text,
  publishing_channels text[] not null default '{}',
  requested_rights text,
  approved_url_candidates text[] not null default '{}',
  submitted_at timestamptz not null default now(),
  unique (project_id, version)
);

create table public.submission_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  file_type text not null,
  storage_path text not null,
  sha256 text,
  created_at timestamptz not null default now()
);

create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  public_code text not null unique,
  project_id uuid not null references public.projects(id),
  submission_id uuid not null references public.submissions(id),
  status public.certificate_status not null default 'active',
  license_scope text not null,
  verification_hash text not null,
  issued_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  revocation_reason text
);

create table public.certificate_approved_urls (
  id uuid primary key default gen_random_uuid(),
  certificate_id uuid not null references public.certificates(id) on delete cascade,
  url text not null,
  normalized_url text not null,
  verified_at timestamptz,
  verification_method text,
  unique (certificate_id, normalized_url)
);

create table public.audit_log_entries (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id),
  certificate_id uuid references public.certificates(id),
  actor_profile_id uuid references public.profiles(id),
  action public.audit_action not null,
  note text not null,
  created_at timestamptz not null default now()
);

create table public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id),
  talent_id uuid not null references public.talents(id),
  entry_type text not null check (entry_type in ('license', 'review_fee', 'royalty')),
  amount numeric(12,2) not null,
  status text not null check (status in ('scheduled', 'paid', 'held')),
  entry_date date not null
);

create index audit_log_project_created_idx on public.audit_log_entries(project_id, created_at desc);
create index certificate_public_code_idx on public.certificates(public_code);
create index project_creator_idx on public.projects(creator_id);

alter table public.profiles enable row level security;
alter table public.agencies enable row level security;
alter table public.agency_members enable row level security;
alter table public.talents enable row level security;
alter table public.talent_policies enable row level security;
alter table public.projects enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_files enable row level security;
alter table public.certificates enable row level security;
alter table public.certificate_approved_urls enable row level security;
alter table public.audit_log_entries enable row level security;
alter table public.ledger_entries enable row level security;

create or replace function public.current_role()
returns public.app_role language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;

create or replace function public.is_operator()
returns boolean language sql stable security definer set search_path = public
as $$ select coalesce(public.current_role() = 'platform_operator', false) $$;

create or replace function public.is_agency_member(target_agency_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.agency_members where agency_id = target_agency_id and profile_id = auth.uid()) $$;

create policy "public reads talents" on public.talents for select using (true);
create policy "public reads policies" on public.talent_policies for select using (true);
create policy "public reads certificates" on public.certificates for select using (true);
create policy "public reads approved urls" on public.certificate_approved_urls for select using (true);

create policy "creators read own projects" on public.projects for select using (creator_id = auth.uid() or public.is_operator());
create policy "creators create own projects" on public.projects for insert with check (creator_id = auth.uid());
create policy "agency reads represented projects" on public.projects for select using (
  exists(select 1 from public.talents t where t.id = talent_id and public.is_agency_member(t.agency_id))
);
create policy "agency updates represented projects" on public.projects for update using (
  exists(select 1 from public.talents t where t.id = talent_id and public.is_agency_member(t.agency_id))
);

create policy "project members read submissions" on public.submissions for select using (
  exists(select 1 from public.projects p where p.id = project_id and (
    p.creator_id = auth.uid() or public.is_operator() or
    exists(select 1 from public.talents t where t.id = p.talent_id and public.is_agency_member(t.agency_id))
  ))
);
create policy "creators add submissions" on public.submissions for insert with check (
  exists(select 1 from public.projects p where p.id = project_id and p.creator_id = auth.uid())
);

create policy "project members read audit" on public.audit_log_entries for select using (
  exists(select 1 from public.projects p where p.id = project_id and (
    p.creator_id = auth.uid() or public.is_operator() or
    exists(select 1 from public.talents t where t.id = p.talent_id and public.is_agency_member(t.agency_id))
  ))
);

-- Audit rows are append-only. Use server-side functions with service role for inserts.
-- Do not create update or delete policies for audit_log_entries.

insert into storage.buckets (id, name, public)
values ('review-media', 'review-media', false)
on conflict (id) do nothing;

create policy "authenticated uploads review media"
on storage.objects for insert to authenticated
with check (bucket_id = 'review-media');

create policy "authenticated reads review media"
on storage.objects for select to authenticated
using (bucket_id = 'review-media');
