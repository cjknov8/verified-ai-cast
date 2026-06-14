-- Commercial registry foundation.
-- Apply after 202606020001_initial_schema.sql.

create type public.assurance_state as enum ('self_asserted', 'pending', 'verified', 'expired', 'rejected');
create type public.transaction_status as enum (
  'draft',
  'evidence_review',
  'terms_pending',
  'payment_authorized',
  'approval_pending',
  'certified',
  'blocked',
  'cancelled',
  'refunded'
);
create type public.dispute_status as enum ('opened', 'investigating', 'actioned', 'appealed', 'resolved', 'dismissed');

create table public.rights_holders (
  id uuid primary key default gen_random_uuid(),
  holder_type text not null check (holder_type in ('person', 'company', 'estate', 'brand', 'property_owner')),
  legal_name text not null,
  public_name text not null,
  country_code text not null,
  identity_assurance public.assurance_state not null default 'pending',
  identity_level text not null default 'I0',
  verified_domain text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.authority_grants (
  id uuid primary key default gen_random_uuid(),
  rights_holder_id uuid not null references public.rights_holders(id),
  grantee_profile_id uuid references public.profiles(id),
  grantee_agency_id uuid references public.agencies(id),
  authority_type text not null,
  rights_scope text[] not null default '{}',
  territories text[] not null default '{}',
  can_sublicense boolean not null default false,
  assurance public.assurance_state not null default 'pending',
  assurance_level text not null default 'A0',
  valid_from timestamptz not null,
  valid_until timestamptz,
  evidence_reference text not null,
  reviewed_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  check ((grantee_profile_id is not null) <> (grantee_agency_id is not null))
);

create table public.rights_assets (
  id uuid primary key default gen_random_uuid(),
  rights_holder_id uuid not null references public.rights_holders(id),
  asset_type text not null,
  public_name text not null,
  description text,
  collection_name text,
  authenticity_profile text not null default 'standard',
  public_status text not null default 'private' check (public_status in ('private', 'listed', 'suspended', 'retired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.asset_versions (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.rights_assets(id),
  parent_version_id uuid references public.asset_versions(id),
  version_label text not null,
  storage_path text not null,
  sha256 text not null,
  manifest_reference text,
  content_assurance_level text not null default 'C1',
  frozen_at timestamptz not null default now(),
  created_by uuid references public.profiles(id),
  unique (asset_id, version_label),
  unique (sha256)
);

create table public.commercial_transactions (
  id uuid primary key default gen_random_uuid(),
  public_code text not null unique,
  asset_version_id uuid not null references public.asset_versions(id),
  seller_profile_id uuid references public.profiles(id),
  seller_agency_id uuid references public.agencies(id),
  buyer_profile_id uuid not null references public.profiles(id),
  authority_grant_id uuid not null references public.authority_grants(id),
  status public.transaction_status not null default 'draft',
  requested_scope jsonb not null,
  agreed_scope jsonb,
  currency text not null,
  gross_amount numeric(14,2),
  platform_fee numeric(14,2),
  seller_payout numeric(14,2),
  payment_provider_reference text,
  terms_version text,
  terms_sha256 text,
  signed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((seller_profile_id is not null) <> (seller_agency_id is not null))
);

create table public.approval_decisions (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.commercial_transactions(id),
  submission_id uuid references public.submissions(id),
  decision text not null check (decision in ('approved', 'conditionally_approved', 'changes_requested', 'rejected', 'revoked')),
  conditions jsonb not null default '{}'::jsonb,
  reason text,
  signer_profile_id uuid not null references public.profiles(id),
  authority_grant_id uuid not null references public.authority_grants(id),
  terms_sha256 text,
  created_at timestamptz not null default now()
);

create table public.evidence_items (
  id uuid primary key default gen_random_uuid(),
  evidence_type text not null,
  storage_path text,
  external_reference text,
  sha256 text,
  classification text not null check (classification in ('public', 'confidential', 'restricted')),
  retention_until date,
  created_at timestamptz not null default now(),
  check (storage_path is not null or external_reference is not null)
);

create table public.transaction_evidence (
  transaction_id uuid not null references public.commercial_transactions(id) on delete cascade,
  evidence_id uuid not null references public.evidence_items(id) on delete restrict,
  purpose text not null,
  primary key (transaction_id, evidence_id)
);

create table public.dispute_cases (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  transaction_id uuid references public.commercial_transactions(id),
  certificate_id uuid references public.certificates(id),
  opened_by uuid references public.profiles(id),
  complaint_type text not null,
  status public.dispute_status not null default 'opened',
  priority text not null check (priority in ('standard', 'urgent', 'emergency')),
  summary text not null,
  resolution text,
  opened_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index authority_holder_status_idx on public.authority_grants(rights_holder_id, assurance, valid_until);
create index asset_holder_status_idx on public.rights_assets(rights_holder_id, public_status);
create index transaction_status_created_idx on public.commercial_transactions(status, created_at desc);
create index dispute_status_priority_idx on public.dispute_cases(status, priority, opened_at);

alter table public.rights_holders enable row level security;
alter table public.authority_grants enable row level security;
alter table public.rights_assets enable row level security;
alter table public.asset_versions enable row level security;
alter table public.commercial_transactions enable row level security;
alter table public.approval_decisions enable row level security;
alter table public.evidence_items enable row level security;
alter table public.transaction_evidence enable row level security;
alter table public.dispute_cases enable row level security;

create policy "public reads listed rights holders"
on public.rights_holders for select
using (identity_assurance = 'verified');

create policy "public reads listed assets"
on public.rights_assets for select
using (public_status = 'listed');

create policy "operators manage commercial registry"
on public.rights_holders for all using (public.is_operator()) with check (public.is_operator());
create policy "operators manage authority grants"
on public.authority_grants for all using (public.is_operator()) with check (public.is_operator());
create policy "operators manage rights assets"
on public.rights_assets for all using (public.is_operator()) with check (public.is_operator());
create policy "operators manage asset versions"
on public.asset_versions for all using (public.is_operator()) with check (public.is_operator());
create policy "operators manage transactions"
on public.commercial_transactions for all using (public.is_operator()) with check (public.is_operator());
create policy "operators manage decisions"
on public.approval_decisions for all using (public.is_operator()) with check (public.is_operator());
create policy "operators manage evidence"
on public.evidence_items for all using (public.is_operator()) with check (public.is_operator());
create policy "operators manage transaction evidence"
on public.transaction_evidence for all using (public.is_operator()) with check (public.is_operator());
create policy "operators manage disputes"
on public.dispute_cases for all using (public.is_operator()) with check (public.is_operator());

-- Production writes should be performed through reviewed server-side functions.
-- Do not expose service-role credentials to browser clients.
