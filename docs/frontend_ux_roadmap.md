# Frontend UX Roadmap

## Positioning

The public experience should feel closer to a premium film-rights studio than a generic SaaS dashboard. The product sells legitimacy, review discipline, and visible trust rather than downloadable AI assets.

## Completed in the Current Frontend Pass

- Replaced the dashboard-first homepage with a cinematic public landing page.
- Preserved the original operations dashboard at `/operations`.
- Added an original film-studio hero image under `public/images/`.
- Added a scroll-led narrative: premise, approval framework, certificate trust, pricing, checkout call to action.
- Added `/checkout` as an honest payment-preparation screen.
- Added a checkout entry point from `/projects/new`.
- Updated the internal console palette and navigation to match the public brand.
- Reworked the internal console into grouped workspace navigation with active states.
- Added a four-step project submission workspace with real form controls.
- Added `/verify` as a public certificate lookup entry point.

## User Journey

```text
Public landing
  -> Understand the approval model
  -> Inspect a public certificate
  -> Review pricing
  -> Reserve a review
  -> Checkout preparation
  -> Stripe Checkout Session (Phase 2)
  -> Project submission
  -> Agency review
  -> Certificate issuance
```

## Design Principles

- Use cinematic imagery only where it carries product meaning.
- Keep operational screens quiet, dense, and scan-friendly.
- Explain trust through inspectable certificate details, not decorative claims.
- Introduce payment after the approval model is clear.
- Do not simulate working payment processing before the backend exists.

## Next Frontend Work

### P0: Backend-dependent conversion work

- Create a Stripe Checkout Session server endpoint.
- Redirect `/checkout` to Stripe-hosted Checkout.
- Handle `checkout.session.completed` webhook fulfillment.
- Return paid users to a persisted project submission draft.
- Add payment status and receipt display.

Stripe reference:

- https://docs.stripe.com/payments/checkout
- https://docs.stripe.com/payments/checkout/how-checkout-works

### P1: Submission UX

- Connect the current stepper inputs to persistent drafts.
- Connect the upload surfaces to real file selection and storage progress.
- Add save-and-resume behavior.
- Add inline validation and upload progress.

### P1: Public trust UX

- Add certificate search by ID.
- Add domain ownership and redirect policy indicators.
- Add media hash and approved version display.
- Add revocation reason and timestamp blocks where applicable.

### P2: Responsive QA and accessibility

- Run visual QA on small mobile, tablet, desktop, and wide desktop.
- Add automated Playwright screenshots.
- Confirm keyboard navigation and focus states.
- Review contrast, reduced-motion behavior, and semantic landmarks.
