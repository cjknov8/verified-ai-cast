# Trust Verification Framework

## Objective

The product must let a viewer distinguish an official AI appearance approval from an unapproved reuse of an approval link.

## Trust Questions

The public verification flow answers:

1. Who approved the appearance?
2. Which project and result were approved?
3. Is the certificate currently active?
4. Where may the certificate be displayed?
5. Has the approval been revoked or expired?
6. Which audit events support the current state?

## Verification Layers

### Layer 1: Certificate state

The certificate must be `active`. Revoked and expired certificates remain visible but cannot be represented as active approvals.

### Layer 2: Approved URL allowlist

The public page compares the claimed source URL with `approvedUrls`. A copied certificate link used on another domain or path must display an unapproved-source warning.

### Layer 3: Audit trail

Each workflow transition is append-only:

- submission
- review started
- approval
- rejection
- revision request
- revocation

### Layer 4: Media integrity

Phase 2 should hash uploaded review files. Later phases may bind approved files to signed manifests and C2PA Content Credentials.

## URL Comparison Policy

Current MVP behavior:

- require an absolute URL
- remove fragments
- normalize using the platform URL parser
- remove a trailing slash
- compare exact normalized values

Before production, decide:

- whether query parameters are significant
- whether HTTP redirects are allowed
- whether subdomains require separate approval
- whether a creator must prove domain ownership
- whether embedded players require parent-page and media URL checks

## Threat Model

| Threat | MVP response | Future response |
| --- | --- | --- |
| Certificate link copied to unrelated page | URL mismatch warning | signed embeds, domain ownership checks |
| Approved media replaced at same URL | Not fully detected | media hash and manifest checks |
| Approval withdrawn after publication | status display | notifications, webhook, cache purge |
| Audit history edited | mock only | append-only DB policy and operator controls |
| AI disclosure removed from creative | review policy | required disclosure checks and manifest assertions |

## Standards Direction

C2PA Content Credentials can carry signed provenance assertions and support validation of asset bindings and signer credentials. Use C2PA as a complementary provenance layer. Verified AI Cast remains the rights-holder approval and revocation authority for its own certificates.

