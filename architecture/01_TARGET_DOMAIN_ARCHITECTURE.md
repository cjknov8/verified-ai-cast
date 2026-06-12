# Target Domain and Registry Architecture

## Architectural Principle

Preserve the Phase 1 workflow but place it on generalized, evidence-backed entities. The system should be an append-oriented registry with mutable projections, not a collection of editable certificate pages.

## Core Domains

### Identity

- `Party`
- `IndividualIdentity`
- `OrganizationIdentity`
- `IdentityVerification`
- `ContactPoint`
- `Account`

### Rights and Authority

- `RightsHolder`
- `RightsAsset`
- `RightsClaim`
- `Representation`
- `AuthorityGrant`
- `AuthorityEvidence`
- `RightsPolicy`
- `PolicyVersion`

### Production and Submission

- `Production`
- `Project`
- `RequestedUse`
- `Submission`
- `SubmissionVersion`
- `SubmissionAsset`
- `DistributionTarget`

### Agreements and Decisions

- `Agreement`
- `AgreementVersion`
- `SignatureEnvelope`
- `ApprovalProceeding`
- `ReviewAssignment`
- `Decision`
- `Condition`

### Certificate and Registry

- `Certificate`
- `CertificateVersion`
- `CertificateBinding`
- `RegistryEntry`
- `StatusEvent`
- `Revocation`
- `Correction`
- `Supersession`

### Integrity and Observation

- `ContentDigest`
- `ContentFingerprint`
- `ProvenanceManifest`
- `DomainVerification`
- `AccountVerification`
- `PublicationObservation`
- `MonitoringAlert`

### Governance

- `AuditEvent`
- `EvidenceBundle`
- `DisputeCase`
- `Appeal`
- `LegalHold`
- `Issuer`
- `SigningKey`
- `TrustPolicy`

## Key Relationships

```text
Party
  -> IdentityVerification
  -> RightsHolder
      -> RightsAsset
      -> AuthorityGrant <- Representative Party
      -> RightsPolicy / PolicyVersion

Production
  -> Project
      -> RequestedUse
      -> SubmissionVersion
          -> SubmissionAsset
          -> ContentDigest / Manifest
      -> ApprovalProceeding
          -> Decision
          -> SignatureEnvelope
      -> Certificate
          -> CertificateVersion
          -> CertificateBinding
          -> StatusEvent
          -> RegistryEntry
```

## Rules

- A party may have multiple roles.
- A rights asset may have multiple claims and competing claimants.
- An authority grant must be scoped by rights, territory, term, and delegation.
- Every policy, agreement, submission, decision, and certificate is versioned.
- Public records reference immutable versions.
- Corrections append; they do not rewrite history.
- Current state is a projection derived from events and active versions.
- Certificate status is evaluated at verification time.

## Certificate Profiles

- Performer Appearance Certificate
- Voice Usage Certificate
- Production Certificate
- Brand Placement Certificate
- Character or IP Usage Certificate
- Product Design Usage Certificate
- Composite Production Rights Certificate

Each profile defines mandatory identity, authority, content, and distribution assurance.

## Multi-Party Approval

A project may require several decisions:

- performer
- agency
- brand owner
- character owner
- studio
- labor or guild process
- platform operator safety review

The certificate issues only when its policy expression is satisfied, for example:

```text
(performer OR delegated_agency)
AND brand_owner
AND platform_policy_pass
```

The system should store each decision independently and make the issuance rule inspectable.

## Public and Private Data

### Public

- registry identifiers
- verified display names
- certificate profile, scope, status, dates
- assurance summaries
- approved public distribution bindings
- content identifiers safe for disclosure
- event history summaries

### Confidential

- identity documents
- authority contracts
- private policies
- unreleased content
- signatures and authentication detail
- payment and tax records
- dispute evidence
- security and fraud signals

Public records should contain hashes or evidence references, not confidential evidence itself.

## Service Boundaries

- Identity and Organization Service
- Rights and Authority Service
- Policy Service
- Production and Submission Service
- Agreement and Signature Service
- Review and Decision Service
- Certificate Issuance Service
- Registry and Verification Service
- Integrity and Provenance Service
- Monitoring and Incident Service
- Billing and Settlement Service
- Notification Service
- Audit and Evidence Service

Begin as a modular monolith with clear database ownership. Split services only when operational scale or isolation requires it.

## Migration from Phase 1

1. Map `talents` to `rights_holders` plus performer profile.
2. Map agency membership to parties, representations, and authority grants.
3. Map `talent_policies` to versioned rights policies.
4. Keep projects and submissions, adding explicit requested uses.
5. Add immutable decisions instead of relying on project status.
6. Convert certificates to profile-based, versioned records.
7. Expand approved URLs into generalized distribution bindings.
8. Convert audit logs to a common append-only event envelope.
9. Preserve existing public certificate IDs through aliases.

## API Resources

- `/parties`
- `/rights-holders`
- `/rights-assets`
- `/authority-grants`
- `/productions`
- `/projects`
- `/submissions`
- `/decisions`
- `/certificates`
- `/registry`
- `/verification`
- `/disputes`
- `/webhooks`

Public verification responses should be stable, cache-aware, signed where appropriate, and explicit about status timestamp.
