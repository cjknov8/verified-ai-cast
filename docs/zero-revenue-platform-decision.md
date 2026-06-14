# Zero-Revenue Platform Decision

Date: 2026-06-14  
Decision status: Adopted for pilot implementation

## Executive decision

Verified AI Cast should not build identity, object storage, or card processing from scratch.
The product-specific work is authorization, ownership evidence, provenance, review, certificate
issuance, revocation, and auditable transaction state.

| Capability | Pilot choice | What we own |
| --- | --- | --- |
| Authentication | Supabase Auth with Google-only OAuth | Invite policy, roles, organization membership, access reviews |
| Database | Supabase Postgres | RLS policies, provenance, asset metadata, audit records |
| Large private assets | Cloudflare R2 private bucket | Object naming, short-lived signing, hashes, ownership index, retention |
| Korea payments | PortOne V2 with contracted Toss Payments channel | Order state, webhook reconciliation, refund and dispute policy |
| Global payments | Stripe Checkout only through a supported entity | Order state, webhook reconciliation, tax/legal decisions |
| Hosting | Vercel | Application security, deployment controls, environment separation |

## Build versus buy

### Identity

Building password storage, OAuth, token rotation, account recovery, and session revocation creates
security liability without product differentiation. Supabase is selected because authentication and
Postgres RLS share the same user identity. Google-only login reduces pilot support paths.

Google login does **not** prove that a user owns a business, controls a brand, or has authority to
sell an asset. Seller onboarding still needs KYB/KYC and rights review.

### Asset storage

Application servers and Vercel deployments must never hold master media files. Cloudflare R2 is
selected for the pilot because it offers an S3-compatible API and signed URLs with a simpler
early-stage cost profile. The bucket stays private.

Supabase stores object metadata and authorization records, not large masters. Each object is indexed
by owner, logical asset ID, content type, byte size, and SHA-256.

AWS S3 becomes preferable when a contract requires a specific AWS region, customer-managed KMS keys,
Object Lock/WORM retention, or an AWS-native audit boundary. That is a migration trigger, not a
pilot prerequisite.

### Payments

Korea and global checkout are separate provider configurations.

- Korea: PortOne V2 is the integration layer; Toss Payments is the initial PG channel. A PortOne
  integration does not replace the merchant/PG contract.
- Global: Stripe Checkout is enabled only if the operating company is established in a country
  supported by Stripe. Do not use a false address or informal workaround.
- Before approval: use test mode or manual invoices. Do not collect live card details in the app.

Marketplace seller payout, escrow, tax withholding, and reserve/hold rules are not solved by a basic
checkout. Keep buyer collection and seller settlement as separately reconciled ledger events until
legal and provider contracts explicitly support the intended flow.

## Security controls implemented

1. Google OAuth callback and managed session cookie support.
2. Optional server-side protection for internal routes through Next.js `proxy.ts`.
3. Private R2 upload URL with a ten-minute expiry.
4. File allowlist, size ceiling, owner-prefixed object key, and SHA-256 metadata validation.
5. Post-upload `HeadObject` validation before the object is registered in Supabase.
6. RLS policy allowing owners to read and register only their own asset metadata.
7. No public object URL and no download endpoint until project-level access rules exist.
8. Launch readiness gates verify provider credentials rather than trusting a single feature flag.

## Migration triggers

Review this decision when any of these become true:

- A regulated enterprise contract requires AWS-native controls.
- Monthly storage or egress makes a different provider materially cheaper.
- Enterprise customers require SAML/SCIM.
- Passwordless non-Google access is required for buyers or reviewers.
- A second Korean PG materially improves approval rates or pricing.
- A supported global entity and bank account are operational.
- Seller payouts require licensed marketplace or escrow functionality.

## Official references

- [Supabase pricing](https://supabase.com/pricing)
- [Supabase Google login](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/)
- [Cloudflare R2 presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)
- [AWS S3 pricing](https://aws.amazon.com/s3/pricing/)
- [PortOne V2 integration](https://developers.portone.io/opi/ko/integration/start/v2/readme)
- [Toss Payments payment flow](https://docs.tosspayments.com/guides/v2/get-started/payment-flow)
- [Stripe global availability](https://stripe.com/global)
