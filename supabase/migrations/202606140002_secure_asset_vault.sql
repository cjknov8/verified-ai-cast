-- Private object metadata for seller-owned assets stored in Cloudflare R2.
-- R2 objects remain private. This table is the authorization and audit index.

create type public.asset_object_status as enum ('pending', 'available', 'quarantined', 'deleted');

create table public.asset_vault_objects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete restrict,
  asset_id text not null,
  object_key text not null unique,
  file_name text not null,
  content_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  sha256 text not null check (sha256 ~ '^[a-f0-9]{64}$'),
  status public.asset_object_status not null default 'pending',
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index asset_vault_owner_created_idx
on public.asset_vault_objects(owner_id, created_at desc);

create index asset_vault_asset_idx
on public.asset_vault_objects(asset_id, created_at desc);

alter table public.asset_vault_objects enable row level security;

create policy "owners read own vault objects"
on public.asset_vault_objects for select
to authenticated
using (owner_id = auth.uid() or public.is_operator());

create policy "owners register own vault objects"
on public.asset_vault_objects for insert
to authenticated
with check (owner_id = auth.uid());

-- Updates and deletion are service operations. Do not grant direct client policies.
