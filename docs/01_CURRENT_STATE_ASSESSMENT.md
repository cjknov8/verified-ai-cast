# Current State Assessment

## Executive Summary

The current repository is a coherent Phase 1 static MVP, not an empty prototype. It already expresses the central company thesis: creators can generate content elsewhere, while Verified AI Cast records performer-side policy, review, approval, certificate status, approved URLs, and settlement context.

The correct next step is to preserve this performer approval workflow and generalize its domain model into rights-holder infrastructure.

## Technology and Architecture

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4 through PostCSS
- Server-rendered pages with several client-side demo components
- Static mock records in `src/lib/mock-data.ts`
- Local browser persistence for submission drafts, demo reservations, and review decisions
- Supabase migration and seed files prepared but not connected
- Readiness endpoint that reports Supabase and Stripe environment configuration
- No live authentication, database persistence, uploads, billing, notifications, or external verification integrations

The current frontend is intentionally honest about demo behavior. It labels browser-only persistence and does not simulate a completed payment.

## Current Routes

| Route | Current purpose |
| --- | --- |
| `/` | English public landing page |
| `/ko` | Korean public landing page |
| `/operations` | Internal review queue and operating metrics |
| `/agency` | Talent roster and agency-level metrics |
| `/pricing-model` | Talent tiers, usage multipliers, and platform revenue concepts |
| `/projects/new` | Four-step creator submission workspace |
| `/reviews/[id]` | Review facts, risk flags, decision actions, and audit history |
| `/talents/[id]/policy` | Performer policy and commercial guardrails |
| `/certificates/[id]` | Public certificate, status, scope, URLs, and URL check |
| `/verify` | Certificate ID lookup |
| `/settlements` | Review fee, license, and royalty ledger |
| `/checkout` | Clearly labeled demo review reservation |
| `/ko/[...slug]` | Korean versions of major application routes |
| `/api/readiness` | Integration configuration and billing readiness |

## Mock Domain Model

The mock layer defines:

- `Talent` and `TalentPolicy`
- `Project`
- `Certificate`
- `AuditLogEntry`
- `LedgerEntry`
- Commercial tiers, license multipliers, and platform revenue lines

Current representative data includes two fictional actors, five projects, three certificates, eight audit events, and three ledger entries. Certificate examples cover all intended public states: `active`, `revoked`, and `expired`.

## Existing User Workflows

### Creator

1. Understand the actor-first approval premise.
2. Reserve a demo review slot.
3. Complete project, file, rights, and confirmation steps.
4. Save a browser-local draft.
5. Submit a browser-local demo review.

### Agency or Reviewer

1. View represented talent and pending demand.
2. Open a talent policy.
3. Review a project against scope and policy.
4. Record approve, request changes, reject, or revoke in browser-local state.
5. Inspect project audit events and any issued certificate.

### Public Verifier

1. Look up a certificate ID.
2. Inspect performer, agency, project, scope, dates, and status.
3. Submit a claimed source URL.
4. Receive active-and-matched, active-but-unapproved-URL, revoked, or expired messaging.

### Operator

1. View queue, active certificate, talent, and held-funds summaries.
2. Inspect projects and workflow stages.
3. Review readiness for future Supabase and Stripe integration.

## Existing Trust Capabilities

The MVP already demonstrates:

- Narrow, project-specific approval
- Performer policy boundaries
- Approval, revision, rejection, and revocation concepts
- Public certificate status
- Exact normalized URL allowlisting
- Persistent visibility of revoked and expired records
- Append-only audit intent
- Media hash and C2PA direction in documentation
- Role and row-level-security foundations in the Supabase migration
- Private review-media storage intent

These are the correct primitives for a future registry.

## Existing UI and Brand Language

The public experience is cinematic and premium, with dark green-black surfaces, cream editorial sections, serif display typography, and muted gold accents. Internal screens use a restrained institutional console.

Strengths:

- Avoids neon, crypto, and generic purple AI styling
- Makes certificates visible rather than treating trust as a marketing claim
- Separates public pages from operating workspaces
- Supports English and Korean entry points

Risks:

- Hero imagery and repeated "AI appearance" language still position the company close to production and talent licensing.
- `VA` is not a durable institutional mark for a broader registry.
- The fixed `$2,500` English review deposit can make the product appear transactional before trust is established.
- The console is agency-branded rather than rights-holder-neutral.

## Backend Foundation

The Supabase migration includes profiles, agencies, agency membership, talent, versioned policies, projects, submissions, files, certificates, approved URLs, audit logs, and ledger entries.

Important strengths:

- Separate approved URL records
- File hash field
- Public certificate read policies
- Append-only audit intent
- Private media bucket
- Role checks for creators, agency members, and operators

Strategic gaps before it can become registry infrastructure:

- No generalized `rights_holders`, `rights_assets`, `authority_grants`, or `representations`
- No legal entity, beneficial owner, estate, or successor model
- No approval-decision table separate from project status
- No certificate version, suspension, supersession, or correction model
- No evidence bundle, signature envelope, timestamp authority, or key registry
- No domain ownership challenge or publication observation history
- No disputes, appeals, sanctions, or trust-and-safety case model
- No public API, webhook, transparency log, or relying-party policy

## Current Limitations to Preserve Honestly

- Unknown dynamic IDs fall back to the first mock record instead of returning not found.
- URL verification proves exact string membership after basic normalization; it does not prove domain ownership or that the media at the URL matches the approved file.
- The displayed verification hash is a mock identifier, not a cryptographic signature.
- Review decisions and submissions are browser-local demonstrations.
- No signer identity is cryptographically bound to an approval.
- No live legal agreement or electronic signature is executed.
- No payment is processed.
- No certificate authority governance or independent audit exists.

## Strategic Conclusion

The Phase 1 MVP should remain the performer-specific product surface. The next architecture should place it on top of generalized primitives:

`Rights Holder -> Authority -> Rights Asset -> Project -> Submission Version -> Approval Record -> Certificate -> Registry Entry -> Audit Event`

That evolution preserves the current experience while allowing brands, characters, productions, game IP, product designs, and estates to join later.
