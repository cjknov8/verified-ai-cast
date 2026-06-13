# Verified AI Cast

Actor-first AI appearance approval and certification platform MVP.

The product is based on a simple premise: AI asset use cannot be perfectly controlled, but official actor approval can be made scarce, visible, revocable, and commercially valuable.

## What This MVP Shows

- Premium operating dashboard
- Actor and agency safety policy controls
- Creator result submission flow
- Submitted AI video review workspace
- Approval, rejection, and revision-request action surface
- Public certificate page
- Revenue and license ledger summary
- Product spec and deployment checklist

## Routes

- `/` operations dashboard
- `/agency` actor and agency dashboard
- `/talents/talent-01/policy` AI appearance policy editor
- `/projects/new` creator project submission
- `/reviews/project-01` submitted AI video review
- `/certificates/cert-2026-0007` public certificate page
- `/settlements` settlement and license ledger

## Local Development

```bash
cd ~/Documents/CodexProject/verified-ai-cast
npm run dev
```

Open:

```text
http://localhost:3000
```

## Verification

```bash
npm run lint
npm run build
npm exec vercel -- --version
```

## Collaboration

GitHub `main` is the source of truth for Mac, Tailscale, and Codex Cloud work.
See `docs/collaboration-and-release-workflow.md` for the required start, finish,
CI, and deployment checks.

## Docs

- `docs/product-spec.md`
- `docs/deployment-checklist.md`
- `docs/product_architecture.md`
- `docs/certificate_model.md`
- `docs/trust_verification_framework.md`
- `docs/roadmap_phase2.md`
- `docs/frontend_ux_roadmap.md`
- `docs/setup_guide_no_billing.md`
- `legal/` counsel-review product policy outlines

## Next Phases

1. Add Supabase Auth and PostgreSQL.
2. Add role-based actor, agency, creator, and admin permissions.
3. Connect submission forms to persistent storage and signed media URLs.
4. Add immutable certificate audit logs and revocation history.
5. Add payment and payout flows.
6. Build the actor review experience as an iPhone app with Expo or React Native.
