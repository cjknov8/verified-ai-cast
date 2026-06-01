# Product Architecture

## Purpose

Verified AI Cast is an official AI appearance approval and certification layer. It is not a marketplace for downloadable face, voice, or model assets.

The platform records whether a specific AI-generated result has been reviewed, approved for a defined scope, and published at approved URLs. An approval is revocable and auditable.

## Current MVP

The current application is a static Next.js mock-data MVP:

- Operations dashboard
- Agency dashboard
- Talent policy editor
- Creator submission screen
- Review workspace
- Public certificate page
- Settlement ledger

All records are currently held in `src/lib/mock-data.ts`.

## Core Domains

### Identity and rights

- `Talent`: actor identity and public representation metadata
- `TalentPolicy`: safety, commercial, and disclosure boundaries
- `Agency`: future normalized record for representation and reviewer permissions
- `UserRole`: future actor, agency, creator, operator, and public viewer roles

### Submission and decision

- `Project`: commercial usage request
- `Submission`: future immutable version of a submitted output and supporting materials
- `ReviewDecision`: future normalized decision record
- `AuditLogEntry`: append-only event record for submission, review, approval, rejection, revision request, and revocation

### Certificate and verification

- `Certificate`: official approval record for a specific project
- `approvedUrls`: exact publishing URLs covered by the certificate
- `status`: `active`, `revoked`, or `expired`
- `verificationHash`: mock identifier today; future signed integrity reference

## Trust Boundary

A certificate answers a narrow question:

> Did the actor or agency approve this project result for this publishing scope and URL?

It does not claim that every copy of the media is authentic, that all AI generation was controlled by the platform, or that a certificate URL may be reused on unrelated pages.

## Phase 2 Service Boundaries

| Service | Responsibility |
| --- | --- |
| Auth | Supabase Auth, user identity, role claims |
| Database | PostgreSQL records and append-only audit events |
| Storage | Signed upload URLs for review media and supporting files |
| Review | Policy comparison, reviewer decisions, revision cycles |
| Certificate | Issuance, approved URL allowlist, revocation, expiration |
| Verification | Public certificate lookup and claimed source URL check |
| Notifications | Submission, decision, revocation, and expiration notices |

## Suggested PostgreSQL Tables

- `users`
- `agencies`
- `talents`
- `talent_policies`
- `projects`
- `submissions`
- `submission_files`
- `review_decisions`
- `certificates`
- `certificate_approved_urls`
- `audit_log_entries`
- `ledger_entries`

Use foreign keys and immutable IDs. Store URL allowlist entries in `certificate_approved_urls`, not as a PostgreSQL array, when Phase 2 begins.

## Security Notes

- Treat the public certificate page as read-only.
- Normalize URLs before comparison.
- Preserve historical certificates after revocation.
- Make audit events append-only at the application and database layers.
- Restrict review media with short-lived signed URLs.
- Consider C2PA Content Credentials as an interoperability layer, not as the only source of truth.

