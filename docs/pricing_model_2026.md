# 2026 Pricing Model for Official AI Appearance Licensing

This is a product and business-model draft, not legal or financial advice. Final rates should be reviewed with entertainment counsel, talent representatives, tax/accounting advisors, and market data from live transactions.

## Pricing principle

Verified AI Cast should not price actor assets like generic AI generation minutes. The buyer is paying for:

- official consent from the actor or agency,
- review labor and reputational control,
- a project-specific license scope,
- URL-bound public certification,
- monitoring, revocation, and audit infrastructure.

The seller is not merely selling a file. The seller is granting controlled commercial use of name, image, likeness, voice, and approved AI output.

## Current market signals checked

- SAG-AFTRA AI resources emphasize consent, disclosure, control, and compensation for digital replica use.
- SAG-AFTRA's 2025 Commercials Contract materials state that use of a digital replica can trigger a 1.5x session fee plus applicable holding and use fees.
- SAG-AFTRA's 2026 TV/Theatrical materials continue to expand digital replica, biometric data, and AI protection language.
- HeyGen and ElevenLabs show that raw AI generation cost is becoming relatively low and tool-like.
- Cameo for Business shows that celebrity-driven commercial use is priced by recognizability, business use, and licensing scope rather than production cost alone.

Reference URLs:

- https://www.sagaftra.org/contracts-industry-resources/member-resources/artificial-intelligence
- https://www.sagaftra.org/2026-tvtheatrical-contracts
- https://www.sagaftra.org/commercials2025
- https://developers.heygen.com/docs/pricing
- https://elevenlabs.io/docs/overview/administration/billing
- https://www.cameo.com/business

## Talent tier model

The initial product should use four commercial tiers. Tiers are not only popularity bands; they estimate buyer value and seller risk.

| Tier | Score | Base license | Review fee | Controlled rental | Seller payout floor |
| --- | ---: | ---: | ---: | ---: | ---: |
| Emerging | 0-54 | KRW 800k-2.5m | KRW 300k-700k | KRW 500k-1.5m / month | 75% |
| Select | 55-74 | KRW 2.5m-8m | KRW 700k-2m | KRW 1.5m-5m / month | 76% |
| Signature | 75-89 | KRW 8m-30m | KRW 2m-7m | KRW 5m-20m / month | 78% |
| Icon | 90-100 | KRW 30m-150m+ | KRW 7m-20m+ | KRW 20m-80m / month | 82% |

Base license means one approved project, limited term, approved URL list, and no raw model download.

## Tier scoring inputs

Recommended weighted score:

| Input | Weight | What to inspect |
| --- | ---: | --- |
| Filmography and credits | 25% | Lead/supporting roles, recency, genre authority, awards, press recognition |
| Audience awareness | 20% | Search demand, social reach quality, international recognition |
| Brand trust | 15% | Reputation, brand safety, audience sentiment, endorsement sensitivity |
| Commercial conflict value | 15% | Category exclusivity pressure and lost opportunity cost |
| Likeness sensitivity | 10% | Face/voice distinctiveness, risk of misleading endorsement |
| Territory and distribution | 10% | Local, regional, global, paid media, OOH, TV/OTT |
| Review workload | 5% | Asset volume, revision count, SLA, compliance complexity |

## Usage multipliers

| Usage factor | Multiplier |
| --- | ---: |
| Owned social only | 1.0x-1.5x |
| Paid digital advertising | 2.0x-3.0x |
| All digital channels | 2.0x |
| Global territory | 1.5x-2.5x |
| Six-month term | 3.0x |
| Twelve-month term | 4.0x-5.0x |
| Voice clone included | 1.25x-2.0x |
| Category exclusivity | 2.0x-5.0x |
| TV, OTT, theatrical, OOH | Custom quote |

## Product packaging

1. Preview catalog
   - Buyer sees watermarked, low-resolution, non-downloadable sample output.
   - Seller controls which likeness modes are visible.
   - No commercial rights are granted.

2. Controlled rental
   - Buyer rents access to generate or request bounded preview variants.
   - Output remains watermarked until agency approval.
   - Good for pitch decks, internal concept work, and previsualization.

3. Project license
   - Buyer submits final output, URLs, campaign term, territory, and usage category.
   - Agency approves, rejects, requests changes, or revokes later.
   - Public certificate is issued only after approval.

4. Enterprise trust plan
   - API verification, bulk certificate creation, monitoring, takedown support, private audit exports.
   - Sold to studios, platforms, agencies, and large advertisers.

## Platform business model

The platform should earn from trust infrastructure, not from encouraging unlimited unapproved generation.

Recommended revenue lines:

| Revenue line | Rate | Charged to | Notes |
| --- | ---: | --- | --- |
| License marketplace service fee | 12%-18% | Seller | Deduct only after approval and certificate issuance |
| Buyer trust and verification fee | 3%-5% | Buyer | Covers certificate hosting, URL checks, audit logs, monitoring |
| Paid review workflow fee | KRW 300k-20m | Buyer | Paid for agency/talent review labor; can be non-refundable |
| Agency operating seat | SaaS subscription | Seller | For policy management, roster controls, settlements, reports |
| Enterprise trust infrastructure | Custom annual | Enterprise | API, SSO, custom compliance exports, takedown operations |

## Recommended payout rule

- Seller payout should remain at least 75% for lower tiers and rise for higher tiers.
- Review fees can be split separately because they compensate review labor, not licensing.
- Platform fees should decrease as talent tier rises because higher-tier sellers have negotiating power.
- Buyers should see a line-item explanation before checkout: license fee, review fee, verification fee, taxes if applicable, and refundable/non-refundable status.

## No-download default

The default should be: buyers do not download raw actor assets, face embeddings, voice models, or reusable model weights.

Allowed downloads after approval:

- final approved rendered output,
- public certificate bundle,
- license summary,
- disclosure badge or end-card asset.

## Next implementation steps

1. Add seller asset catalog pages: `/agency/assets`, `/agency/assets/new`, `/agency/assets/[id]`, `/agency/assets/[id]/pricing`.
2. Add buyer marketplace pages: `/marketplace`, `/marketplace/assets/[id]`, `/licenses/new`, `/orders/[id]`.
3. Add quote calculator using tier base price and usage multipliers.
4. Add preview workspace with watermarking, audit events, and no raw downloads.
5. Move pricing tables to Supabase tables when backend integration starts.
