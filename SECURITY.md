# Security Policy

## Reporting

Report suspected vulnerabilities to:

- security@verified-ai-cast.com
- trust@verified-ai-cast.com for certificate or rights-record abuse

Do not include identity documents, private media, signing keys, or other sensitive
evidence in an initial email.

## Supported Version

Only the latest production deployment from GitHub `main` is supported.

## Dependency Policy

CI blocks high and critical production dependency advisories.

As of 2026-06-14, `npm audit --omit=dev` reports two moderate advisories for the
PostCSS version bundled inside Next.js. The proposed automated fix incorrectly
downgrades the application to Next 9 and is not accepted. This exception must be
reviewed whenever Next.js is upgraded. User-controlled CSS is not accepted or
serialized by the current application, which limits exposure to the reported
stringification issue.

## Production Requirements

- No service-role, signing, payment, or webhook secrets in browser code or Git.
- Certificate signing keys must be isolated from the web deployment.
- Private evidence must use least-privilege access and short-lived URLs.
- High-value issuance and revocation require dual control.
- Security and certificate-status incidents require documented response and
  notification procedures.
