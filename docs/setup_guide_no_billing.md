# Setup Guide: Backend Foundation Without Billing

This guide is designed to be followed step by step. It stops before any live payment or paid infrastructure activation.

## What Is Already Implemented

- Public landing page
- Console navigation
- Four-step creator submission form
- Browser-local draft saving
- Real local file selection with filename preview
- Browser-local demo review reservation with no card collection
- Browser-local review decision events
- Public certificate lookup
- Active, revoked, expired certificate examples
- Supabase schema, RLS policies, private storage bucket SQL, and seed SQL
- Public readiness endpoint

Open:

```text
https://verified-ai-cast.vercel.app/api/readiness
```

Before backend connection it should report:

```json
{
  "mode": "frontend-demo",
  "billing": { "enabled": false }
}
```

## Your Part: Create the Supabase Project

Supabase currently offers a free-plan option. As of 2026-06-02, the official billing documentation states that the Free Plan supports two active free projects. The pricing page lists 500 MB database size per project, 1 GB storage, and a 50 MB maximum file upload size. Confirm the current limits in the dashboard before creating resources.

Official references:

- https://supabase.com/docs/guides/platform/billing-on-supabase
- https://supabase.com/pricing

Use the free plan for schema work, authentication, metadata, and small test clips. Do not treat it as the production storage plan for full-resolution review videos.

1. Open https://supabase.com/dashboard
2. Sign in.
3. Click **New project**.
4. Choose your organization.
5. Enter:

```text
Project name: verified-ai-cast
Database password: generate and save a strong password
Region: choose the closest region to the primary launch audience
```

6. Confirm the selected plan before creation. Use the free plan while prototyping.
7. Wait until the project is ready.

## Your Part: Apply the Database Schema

1. In the Supabase dashboard, open **SQL Editor**.
2. Click **New query**.
3. Open this local file:

```text
supabase/migrations/202606020001_initial_schema.sql
```

4. Paste the full file into the SQL editor.
5. Click **Run**.
6. Confirm that the query completes without errors.
7. Create another SQL query.
8. Open and paste:

```text
supabase/seed.sql
```

9. Click **Run**.

## Your Part: Collect Supabase Keys

In Supabase:

1. Open **Project Settings**.
2. Open **API**.
3. Copy:

```text
Project URL
anon public key
service_role key
```

Treat `service_role` as a password. Never paste it into chat, client-side code, or `NEXT_PUBLIC_*` variables.

## Your Part: Configure Vercel

1. Open https://vercel.com
2. Open the `verified-ai-cast` project.
3. Open **Settings**.
4. Open **Environment Variables**.
5. Add:

```text
NEXT_PUBLIC_SUPABASE_URL=<Project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key>
NEXT_PUBLIC_APP_URL=https://verified-ai-cast.vercel.app
```

6. Apply each variable to Production, Preview, and Development.
7. Redeploy the latest production deployment.
8. Open:

```text
https://verified-ai-cast.vercel.app/api/readiness
```

Expected:

```json
{
  "mode": "backend-configuration-detected",
  "integrations": {
    "supabaseBrowser": true,
    "supabaseServer": true
  }
}
```

This only confirms configuration. The application still needs the Supabase client layer and route handlers connected in the next coding pass.

## Do Not Configure Stripe Yet

Leave these blank until you explicitly want test-mode payment integration:

```text
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

The current checkout demo does not collect card details and cannot charge money.

## Next Coding Pass After You Finish the Steps

Once the readiness endpoint reports Supabase configuration, the next implementation can connect:

1. Supabase browser and server clients
2. Persisted creator drafts
3. Storage upload progress
4. Auth and role checks
5. Review action route handlers
6. Append-only audit log inserts
7. Public certificate DB lookup

## Security Review Before Real Users

- Verify RLS with actor, reviewer, creator, and operator test accounts.
- Restrict private review media paths by project membership.
- Use signed URLs for playback.
- Rotate any key that was exposed accidentally.
- Keep Stripe in test mode until contracts, refund policy, and settlement rules are approved.
