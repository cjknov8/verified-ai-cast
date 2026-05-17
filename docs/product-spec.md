# Verified AI Cast MVP Spec

## Product Position

Verified AI Cast is not an open marketplace for actor face files, voice files, or downloadable AI assets.

It is an actor-first approval and certification layer for AI-generated screen appearances. Creators can build with any AI tool, but only actor-approved results receive official status, actor-name usage rights, and a public verification page.

## Core Thesis

The platform should not promise perfect technical control over all AI asset usage. Local models, face swaps, voice clones, and copied references make that unrealistic.

The platform should instead make official approval valuable:

- Official AI appearances are reviewed, approved, certified, and revocable.
- Unapproved AI videos may exist, but they cannot claim actor approval.
- Actors and agencies retain control over reputation, usage scope, and public endorsement.
- Creators pay for legitimacy, promotion rights, and reduced legal/reputation risk.

## Primary Users

### Actor or Agency

Needs:

- Protect reputation and prevent unsafe official usage.
- Set clear AI appearance policies.
- Review final results before public release.
- Approve, reject, request revision, or revoke certification.
- See revenue, license scope, and usage history.

### Creator or Studio

Needs:

- Submit a final AI video for official actor approval.
- Prove to platforms, brands, investors, and audiences that the work is authorized.
- Use actor names and official certification in promotion.
- Understand what usage is permitted before paying for broad distribution.

### Platform Operator

Needs:

- Run first-pass safety and policy checks.
- Maintain audit logs.
- Manage disputes and takedowns.
- Monitor certificates, payouts, and abuse patterns.

## MVP Screens

1. Home and operating dashboard
2. Actor or agency dashboard
3. Persona Safety Policy editor
4. Creator project submission
5. Review queue
6. Approval, rejection, revision request, and revocation states
7. Public certificate page
8. Revenue and license ledger

## Approval Flow

1. Creator creates project and uploads final video.
2. Creator submits script, prompt log, publishing channels, revenue model, and requested actor-name usage.
3. Platform performs first-pass review for safety, policy, and brand risk.
4. Actor or agency reviews the final result.
5. Actor or agency chooses one of four actions:
   - Approve
   - Request revision
   - Reject
   - Approve with limited scope
6. Approved work receives an Official AI Appearance certificate.
7. Public verification page lists approved scope, certificate ID, actor representative, expiration, and revocation status.
8. Revenue ledger tracks payouts and approved usage.

## Safety Policies

Initial actor policy controls:

- Adult, nude, sexual, fetish, or suggestive content
- Political, religious, medical, gambling, or financial endorsements
- Violence, criminality, substance abuse, or hate contexts
- Romance, kissing, family, or private relationship simulation
- Use of real private biography, residence, family, or minors
- Country, platform, or brand category restrictions
- Requirement for manual review on all public releases

## Certificate States

- Draft: submitted but not reviewed
- Platform review: internal checks in progress
- Actor review: waiting on actor or agency
- Revision requested: creator must update and resubmit
- Approved: public certificate active
- Rejected: no official status granted
- Revoked: previously approved but no longer valid
- Expired: approval window ended

## Data Model Draft

### Actor

- id
- displayName
- agencyId
- verificationStatus
- publicProfileStatus
- defaultPolicyId
- payoutAccountStatus

### Agency

- id
- name
- verificationStatus
- legalContactEmail
- reviewerUsers

### Creator

- id
- name
- verificationStatus
- billingStatus
- riskScore

### Project

- id
- creatorId
- title
- description
- intendedUse
- publishingChannels
- revenueModel
- campaignStart
- campaignEnd

### Submission

- id
- projectId
- actorId
- videoUrl
- scriptText
- promptLog
- requestedRights
- status
- platformRiskRating
- actorDecision

### Policy

- id
- actorId
- blockedCategories
- allowedChannels
- approvalRequired
- geographyRules
- brandRestrictions
- notes

### Certificate

- id
- submissionId
- certificateCode
- status
- approvedScope
- publicUrl
- expiresAt
- revokedAt
- revocationReason

### RevenueLedgerEntry

- id
- certificateId
- grossAmount
- actorShareAmount
- platformFeeAmount
- payoutStatus
- periodStart
- periodEnd

## Build Roadmap

### Phase 1

- Static mock-data MVP
- Responsive dashboard
- Review queue
- Certificate preview
- Product documentation

### Phase 2

- Supabase Auth and PostgreSQL
- Role-based access for actor, agency, creator, admin
- Real submission forms
- File upload storage
- Public certificate routes

### Phase 3

- Stripe or Toss Payments
- Payout ledger
- Webhooks
- Certificate revocation flow
- Email notifications

### Phase 4

- iPhone app using React Native or Expo
- Actor review push notifications
- Mobile approval workflow
- Secure review playback

