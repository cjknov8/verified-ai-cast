# Deployment Checklist

## Local

Run from the project folder:

```bash
cd ~/Documents/CodexProject/verified-ai-cast
npm run lint
npm run build
npm run dev
```

Note: On this Mac, local `next build` may fail if macOS rejects the native
Next SWC binary signature or if Turbopack is blocked by the local sandbox.
This project uses `next dev --webpack` and `next build --webpack` for stable
local verification.

Open:

```text
http://localhost:3000
```

For mobile on the same Wi-Fi:

```bash
npm run dev -- -H 0.0.0.0
```

Then open:

```text
http://YOUR_MAC_LOCAL_IP:3000
```

## Vercel Preview

Preflight from the project folder:

```bash
npm run lint
npm run build
npm exec vercel -- --version
```

1. Create a GitHub repository.
2. Push this project to GitHub.
3. Import the repository in Vercel.
4. Use the default Next.js settings.
5. Confirm the build command:

```bash
npm run build
```

6. Confirm the install command:

```bash
npm install
```

7. Deploy and open the preview URL on iPhone.

If using the CLI instead of the Vercel dashboard:

```bash
npm exec vercel
```

## Future Environment Variables

No environment variables are required for the static MVP.

Expected Phase 2 variables:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=
```

## Commercial Release Gate

Before enabling real users or payments:

```text
https://YOUR_DOMAIN/api/release-readiness
```

must return HTTP `200` with:

```json
{ "launchReady": true }
```

HTTP `503` means the deployment must remain a demonstration. Do not override
individual gates merely to change the status response.
