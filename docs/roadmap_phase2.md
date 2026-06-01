# Phase 2 Roadmap

## Goal

Move the static MVP to a small, operable approval and certificate service without changing the core product thesis.

## Workstream 1: Database

- Create PostgreSQL schema in Supabase.
- Normalize agencies, talents, projects, submissions, certificates, approved URLs, and audit logs.
- Add row-level security policies.
- Add migrations and seed data equivalent to the current mocks.

## Workstream 2: Authentication and roles

- Add Supabase Auth.
- Support actor, agency reviewer, creator, platform operator, and public viewer access.
- Require reviewer authorization for approval, rejection, revision request, and revocation.

## Workstream 3: Submission storage

- Replace placeholder inputs with real forms.
- Store video, transcript, prompt log, publishing channels, and requested rights.
- Use private storage and short-lived signed review URLs.
- Version every resubmission.

## Workstream 4: Review decisions

- Persist approve, reject, request changes, and revoke actions.
- Require a reason for reject, request changes, and revoke.
- Append an audit log record for every state transition.
- Keep previous submissions and decisions immutable.

## Workstream 5: Public certificates

- Issue public certificate codes.
- Store URL allowlist records.
- Add claimed source URL verification.
- Add active, revoked, and expired public states.
- Add rate limiting and certificate lookup monitoring.

## Workstream 6: Integrity

- Hash approved media.
- Record hash algorithm and approved file version.
- Evaluate C2PA manifest support for media provenance interoperability.
- Add cache invalidation after revocation.

## Delivery Order

1. Schema and seed data
2. Auth and role policies
3. Project submission persistence
4. Review decision persistence
5. Certificate issuance and URL verification
6. Revocation and audit log hardening
7. Storage and signed URLs
8. Integrity metadata and C2PA proof of concept

## Exit Criteria

- A creator can submit a project.
- An authorized reviewer can approve, reject, request changes, or revoke.
- An approval issues a public certificate.
- A public viewer can detect an unapproved source URL.
- Every transition has an append-only audit event.
- Revoked and expired certificates remain publicly inspectable.

