# Certificate Model

## Product Meaning

A Verified AI Cast certificate is an official approval record for a specific project result, usage scope, validity window, and publishing URL allowlist.

It is not a transferable blanket license and not proof that every copy of a video is approved.

## MVP Shape

```ts
type Certificate = {
  id: string;
  projectId: string;
  status: "active" | "revoked" | "expired";
  issuedAt: string;
  expiresAt: string;
  approvedUrls: string[];
  verificationHash: string;
  licenseScope: string;
  revokedAt?: string;
  revocationReason?: string;
};
```

## Status Rules

| Status | Meaning | Public display |
| --- | --- | --- |
| `active` | Certificate is inside its validity window and has not been revoked | Approval may be displayed only on approved URLs |
| `revoked` | Approval was withdrawn | Display revocation notice and do not present active approval |
| `expired` | Validity window ended | Display expiration notice and do not present active approval |

Production code should derive expiration from `expires_at` and persist revocation separately.

## URL Verification

The public page accepts a claimed source URL:

```text
/certificates/cert-2026-0007?source=https://campaigns.example/work
```

Verification steps:

1. Load certificate by public ID.
2. Reject active approval if status is `revoked` or `expired`.
3. Normalize the claimed URL.
4. Compare it with normalized allowlist entries.
5. Display one of:
   - approved source URL
   - unapproved source URL
   - source URL not supplied

The current MVP performs exact normalized URL matching. Production should define query-string rules, redirect handling, wildcard policy, and ownership verification explicitly.

## Database Migration Shape

Use:

```text
certificates
certificate_approved_urls
audit_log_entries
```

Recommended certificate fields:

```text
id
public_code
project_id
submission_id
status
license_scope
issued_at
expires_at
revoked_at
revocation_reason
verification_hash
created_by_user_id
```

Recommended approved URL fields:

```text
id
certificate_id
url
normalized_url
verified_at
verification_method
```

## Future Integrity Layer

Add:

- media file hashes
- signed manifest references
- C2PA manifest validation result
- issuer signing key ID
- timestamp evidence
- revocation event linkage

These improve integrity but do not replace actor or agency approval.

