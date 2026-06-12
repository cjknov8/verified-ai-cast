# Product and Registry Strategy

## Product Definition

The product is a system of record for rights-related approvals in digital entertainment.

It records:

- who the relevant parties are
- what rights asset is implicated
- who had authority to approve
- what exact content version was reviewed
- what use was authorized
- where and for how long it may appear
- what obligations apply
- whether the authorization is active, suspended, revoked, expired, or superseded
- what evidence supports the record

## Product Hierarchy

### Public Registry

The public source of truth for certificate lookup, rights-holder profiles, project records, status, scope, and history.

### Professional Workspaces

Private tools for rights holders, representatives, creators, studios, brands, and platform operators.

### Trust Services

Identity verification, authority verification, agreement execution, certificate issuance, content binding, monitoring, revocation, disputes, and audit exports.

### Integration Layer

API, webhooks, embeddable verification, platform checks, bulk issuance, and interoperable credentials.

## Generalized Domain Language

Replace actor-specific core nouns with neutral entities while keeping performer-friendly labels in Phase 1.

| Phase 1 term | Registry term |
| --- | --- |
| Actor / Talent | Rights Holder or Rights Subject |
| Agency | Representative |
| AI appearance policy | Rights Policy |
| Creator | Requesting Party / Producer |
| Project | Authorized Use Project |
| Review | Approval Proceeding |
| Certificate | Rights Usage Certificate |
| Public certificate page | Registry Entry |

## Rights Asset Types

- Name, image, likeness, and voice
- Recorded performance and digital replica permission
- Brand name, logo, product, packaging, and trade dress
- Character identity and fictional universe
- Game IP and in-game assets
- Entertainment property and franchise elements
- Product design and controlled digital representation
- Production identity and verified credits

An asset record must not imply ownership merely because it exists. It must identify the claimed legal basis and assurance level.

## Registry Entry Types

### Identity Entry

Confirms a person or entity identity at a stated assurance level.

### Authority Entry

Records representation, delegation, estate authority, employment authority, or another legal basis. Includes scope and expiration.

### Rights Asset Entry

Describes a rights subject or asset and the party asserting control.

### Approval Entry

Records a decision over a specific submission version and scope.

### Certificate Entry

Publishes the current relying-party representation of an approved use.

### Revocation or Correction Entry

Preserves state changes and reasons without erasing history.

## Certificate Scope Model

Every certificate should include:

- public certificate ID
- certificate type
- issuer and issuer key ID
- rights holder and relevant asset
- approving authority and assurance level
- requesting party and production
- approved content identifiers
- approved use categories
- media and channels
- territory
- term
- approved URLs, domains, accounts, or platform asset IDs
- required disclosures
- commercial limitations
- issue, effective, and expiration timestamps
- current status
- superseding or related certificates
- evidence summary
- machine-readable verification endpoint

Status vocabulary:

- `pending`: not issued and never publicly valid
- `active`: currently valid within scope
- `suspended`: temporarily not reliable pending investigation
- `revoked`: withdrawn before scheduled expiration
- `expired`: term ended
- `superseded`: replaced by a newer certificate
- `corrected`: retained but replaced because of a factual correction

The public interface may lead with Active, Revoked, and Expired, but the underlying registry needs the complete lifecycle.

## Approval Workflow

1. Requesting party creates a project.
2. Rights assets and intended uses are declared.
3. Relevant rights holders and representatives are identified.
4. Authority is verified.
5. Agreements and disclosures are prepared.
6. Submission version and evidence are frozen.
7. Automated policy checks flag conflicts.
8. Authorized human reviewers decide.
9. Any conditions are countersigned or accepted.
10. Certificate is issued and signed.
11. Publication locations and content are verified.
12. Registry status is monitored until expiration.
13. Corrections, disputes, revocations, or renewals append new events.

## Rights Holder Profile

Public:

- verified display name
- rights-holder category
- representative if public
- assurance level
- official registry identifier
- active certificate count
- public policies or restricted categories if voluntarily disclosed
- revocation and correction statistics with context

Private:

- legal identity and verification evidence
- authority documents
- contact and notice details
- payment and tax data
- confidential policies
- estate or succession instructions
- reviewer delegation
- dispute history

## Registry Search and Lookup

Search should support:

- certificate ID
- rights holder
- production
- creator or studio
- brand
- character or property
- domain or URL
- platform account or content ID
- content fingerprint

Public results must distinguish:

- no record found
- record found but not a universal authorization
- active and matching
- active but location mismatch
- active but content mismatch
- expired, revoked, suspended, or superseded

## Product Guardrails

- Do not rank rights holders by willingness to license.
- Do not expose private pricing, restrictions, or disputes by default.
- Do not create a browsing experience that resembles shopping for faces.
- Do not label every registered claim "verified" without assurance detail.
- Do not permit self-issued certificates to appear equivalent to platform-verified certificates.
- Do not erase revoked or corrected records.
- Do not let payment completion trigger certificate issuance without authorization.

## Roadmap by Capability

### Registry Foundation

Generalized entities, persistent decisions, public status, evidence bundles, and machine-readable records.

### Assurance

Identity levels, authority levels, electronic signature, reviewer delegation, and key management.

### Integrity

Hashes, C2PA, fingerprints, watermark references, domain verification, and observation history.

### Adoption

Agency programs, production profiles, platform verification, brand pilots, and standards publication.

### Infrastructure

APIs, webhooks, bulk issuance, transparency logs, independent audits, and ecosystem trust lists.
