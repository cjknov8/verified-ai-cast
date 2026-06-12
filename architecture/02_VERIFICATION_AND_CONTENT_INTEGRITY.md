# Verification, URL, and Content Integrity Architecture

## Verification Question

A verification response should answer four independent questions:

1. Is the certificate authentic and current?
2. Did an adequately verified authority approve the use?
3. Does the presented content correspond to the approved content?
4. Is it appearing at an approved distribution location?

## Verification Result Model

```text
certificate: valid | invalid | unknown
status: active | suspended | revoked | expired | superseded
authority: verified | limited | unresolved
content_match: exact | derived_match | possible_match | mismatch | not_checked
location_match: verified | listed | mismatch | not_checked
checked_at: timestamp
```

Never collapse this into a single green check without details.

## URL Verification

### Level U0: Listed URL

The URL is present in the certificate. This is the current MVP behavior after basic normalization.

### Level U1: Domain Control

The creator proves control through one or more:

- DNS TXT challenge
- `/.well-known/verified-rights-registry.json`
- HTML meta tag
- verified platform account connection
- signed API callback

### Level U2: Publication Observation

The platform observes:

- certificate link or ID
- expected content identifier
- required disclosure
- response timestamp
- redirect chain

### Level U3: Continuous Monitoring

Scheduled checks detect:

- content replacement
- certificate removal
- disclosure removal
- redirect changes
- domain ownership change
- status mismatch

## URL Canonicalization Policy

Define explicitly:

- HTTPS requirement
- hostname case and internationalized domains
- default ports
- trailing slash
- query parameter allowlist or significance
- fragments
- redirects
- canonical tags
- mobile and regional subdomains
- URL shorteners
- embed parent page versus media URL
- platform content IDs

Exact URLs are safest. Wildcards should be limited to verified domains and explicit path policies.

## Creator and Platform Account Verification

For YouTube, social platforms, marketplaces, and streaming services, bind certificates to:

- verified account ID
- channel or organization ID
- platform content ID
- API-observed publication
- account authorization timestamp

Display-name matching is insufficient.

## Content Hashes

Use cryptographic digests for exact-file identity:

- SHA-256 or a current approved algorithm
- file size and media type
- canonical manifest hash
- hash timestamp
- storage object version

Benefits:

- strong exact-match evidence
- simple audit and deduplication
- reliable evidence export

Limitations:

- transcoding, cropping, subtitles, and metadata changes alter the hash
- a hash does not prove who owns rights
- a hash does not survive all platform processing

## Media Fingerprints

Use perceptual fingerprints to detect near duplicates and platform renditions:

- video frame and temporal fingerprint
- audio fingerprint
- image perceptual hash
- transcript or subtitle signature as supporting evidence

Fingerprint results should be probabilistic and expose confidence. They should not automatically revoke a certificate.

## Watermarking

### Visible

Useful for required disclosures and public certificate references. Easy to understand but can be cropped.

### Invisible

Useful as a durable lookup hint. It may be removed or degraded and must not be the sole proof.

Watermarks should point to a registry record; they should not contain sensitive rights data.

## C2PA

C2PA Content Credentials provide signed assertions, content bindings, provenance manifests, trust lists, timestamps, and credential revocation checks.

Recommended use:

- bind the approved source asset to a manifest
- add a platform approval assertion or reference
- preserve production provenance
- validate the signer and manifest
- recover records through durable credentials where supported

Important limitation:

C2PA validates provenance assertions and tamper evidence under its trust model. It does not independently prove legal authorization. The registry approval remains a separate assertion supported by authority evidence.

## Signed Certificate Format

Publish:

- human-readable HTML
- canonical JSON
- detached or embedded digital signature
- issuer certificate or public key reference
- status endpoint
- evidence and related-record links

Consider W3C Verifiable Credentials for portable presentations, while keeping the public registry authoritative for current status.

## Revocation and Transparency

Use:

- append-only status events
- signed status lists or online status endpoint
- webhook propagation
- cache-control with short status freshness
- transparency log for issuance and status changes
- key compromise revocation procedure

Certificate Transparency concepts are useful: independently auditable append-only logs can make hidden or backdated issuance harder.

## Threat Model

| Threat | Control |
| --- | --- |
| Certificate page copied | location verification |
| Content replaced at same URL | observation plus hash/fingerprint |
| Approved file slightly edited | derivative policy plus fingerprint |
| Fake registry screenshot | live lookup and signed data |
| Issuer key stolen | HSM/KMS, rotation, revocation, transparency log |
| Reviewer account takeover | MFA, device/risk checks, dual control |
| False agency authority | scoped authority verification and expiration |
| Backdated approval | trusted timestamp and append-only log |
| Metadata stripped | external manifest repository, fingerprint, watermark |
| Platform cache shows stale active state | short TTL, webhook, visible check time |

## Implementation Sequence

1. Exact hashes and immutable submission versions
2. Domain and account verification
3. Publication observations
4. Signed canonical certificate JSON
5. Key management and status API
6. C2PA proof of concept
7. Perceptual fingerprint service
8. Monitoring and mismatch alerts
9. Transparency log
10. Interoperable credential export

## Primary Technical References

- C2PA Technical Specification: https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html
- W3C Verifiable Credentials Data Model 2.0: https://www.w3.org/TR/vc-data-model-2.0/
- RFC 5280, X.509 PKI and revocation: https://www.rfc-editor.org/rfc/rfc5280
- RFC 6962, Certificate Transparency: https://www.rfc-editor.org/rfc/rfc6962
