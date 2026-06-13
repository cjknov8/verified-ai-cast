export type ScenarioStatus = "certified" | "conditional" | "blocked";
export type ScenarioRole = "buyer" | "seller" | "platform";

export type TransactionStep = {
  title: string;
  actor: ScenarioRole;
  gives: string;
  receives: string;
  proof: string;
};

export type TransactionScenario = {
  id: string;
  name: string;
  summary: string;
  status: ScenarioStatus;
  asset: {
    name: string;
    category: string;
    edition: string;
    fingerprint: string;
    assurance: string;
  };
  seller: {
    name: string;
    type: string;
    verification: string;
  };
  buyer: {
    name: string;
    type: string;
    verification: string;
  };
  commercial: {
    licenseFee: string;
    platformFee: string;
    payout: string;
    scope: string;
  };
  checks: Array<{ label: string; status: "passed" | "warning" | "failed"; detail: string }>;
  steps: TransactionStep[];
  friction: string[];
  outcome: string;
};

export const transactionScenarios: TransactionScenario[] = [
  {
    id: "signature-campaign",
    name: "Signature campaign license",
    summary: "A verified agency licenses an approved performer asset to a premium beauty production.",
    status: "certified",
    asset: {
      name: "Mina Park / Nocturne Portrait 01",
      category: "Digital appearance",
      edition: "Campaign-specific master v3",
      fingerprint: "sha256:8f9124c777a0...d082",
      assurance: "I2 / A2 / C2 / T2",
    },
    seller: {
      name: "Aster Rights Studio",
      type: "Exclusive talent agency",
      verification: "Business, domain, signer, and representation verified",
    },
    buyer: {
      name: "Maison Luma Productions",
      type: "Brand production company",
      verification: "Business and payment authority verified",
    },
    commercial: {
      licenseFee: "$48,000",
      platformFee: "$5,760",
      payout: "$42,240",
      scope: "KR/JP, 6 months, owned social and campaign microsite",
    },
    checks: [
      { label: "Seller identity", status: "passed", detail: "Business registry and official domain matched." },
      { label: "Authority", status: "passed", detail: "Representation grant covers digital replica approvals." },
      { label: "Asset integrity", status: "passed", detail: "Master file hash and signed manifest match." },
      { label: "Buyer identity", status: "passed", detail: "Production entity and authorized payer verified." },
      { label: "License scope", status: "passed", detail: "Channels, territory, term, and disclosures are complete." },
      { label: "Payment", status: "passed", detail: "Funds authorized and released after certificate issuance." },
    ],
    steps: [
      { title: "Create verified listing", actor: "seller", gives: "Asset preview, provenance, policy, price range", receives: "Qualified buyer request", proof: "Seller I2 + authority A2" },
      { title: "Submit intended use", actor: "buyer", gives: "Campaign brief, channels, territory, budget", receives: "Policy fit and exact quote", proof: "Buyer business verification" },
      { title: "Freeze transaction version", actor: "platform", gives: "Version ID, evidence checklist, escrow request", receives: "Signed terms and final files", proof: "Append-only transaction event" },
      { title: "Approve final use", actor: "seller", gives: "Explicit approval and disclosure conditions", receives: "Payment commitment", proof: "Authenticated signer + timestamp" },
      { title: "Issue certificate", actor: "platform", gives: "Public certificate, file hash, URL allowlist", receives: "Fees and ongoing status duty", proof: "Certificate VAC-2026-SIG-001" },
      { title: "Publish and monitor", actor: "buyer", gives: "Live URLs and required disclosure", receives: "Active official-use status", proof: "URL and content match" },
    ],
    friction: [
      "The buyer needs a plain-language preview of what is not included before paying.",
      "The seller needs a single place to compare the final master against the approved preview.",
      "Both parties need an explicit handoff showing when escrow becomes non-refundable.",
    ],
    outcome: "Certified and active. Buyer may publish only the frozen master on the two approved locations.",
  },
  {
    id: "limited-editorial",
    name: "Conditional editorial license",
    summary: "A creator requests a broader use than the rights holder policy allows and must revise the package.",
    status: "conditional",
    asset: {
      name: "Joon Lee / Archive Voice Study",
      category: "Synthetic voice performance",
      edition: "Editorial excerpt v2",
      fingerprint: "sha256:6a205e2b4f19...9ad1",
      assurance: "I2 / A1 / C1 / T1",
    },
    seller: {
      name: "Northline Artist Office",
      type: "Artist management office",
      verification: "Business verified; voice sublicensing authority under review",
    },
    buyer: {
      name: "Field Notes Studio",
      type: "Independent documentary producer",
      verification: "Creator identity verified; organization review pending",
    },
    commercial: {
      licenseFee: "$8,500",
      platformFee: "$1,530",
      payout: "$6,970",
      scope: "Festival trailer only; paid ads and voice model reuse excluded",
    },
    checks: [
      { label: "Seller identity", status: "passed", detail: "Management office and signer verified." },
      { label: "Authority", status: "warning", detail: "Document does not clearly permit reusable voice-model rights." },
      { label: "Asset integrity", status: "passed", detail: "Submitted audio hash matches the review file." },
      { label: "Buyer identity", status: "warning", detail: "Production entity has not completed enhanced verification." },
      { label: "License scope", status: "warning", detail: "Requested paid advertising conflicts with editorial policy." },
      { label: "Payment", status: "passed", detail: "Authorization held; no capture until approval." },
    ],
    steps: [
      { title: "Request voice use", actor: "buyer", gives: "Trailer script, generated sample, festival plan", receives: "Policy conflicts and evidence request", proof: "Creator I1" },
      { title: "Review authority", actor: "platform", gives: "Missing-clause notice", receives: "Updated representation addendum", proof: "Authority review case" },
      { title: "Limit the scope", actor: "seller", gives: "Festival-only counteroffer", receives: "Revised script and channel list", proof: "Conditioned approval draft" },
      { title: "Resubmit final version", actor: "buyer", gives: "Shorter audio, removed paid ads, updated disclosure", receives: "Second review", proof: "Submission version v2" },
      { title: "Hold issuance", actor: "platform", gives: "Readiness checklist", receives: "Completed authority evidence", proof: "No certificate before A2" },
    ],
    friction: [
      "The buyer initially interprets a price quote as permission, even though authority is unresolved.",
      "The seller needs reusable scope templates instead of editing legal text in every request.",
      "The revision screen must show differences between v1 and v2, not only the newest files.",
    ],
    outcome: "Conditionally approved. Certificate remains unissued until authority reaches A2 and the revised scope is signed.",
  },
  {
    id: "counterfeit-block",
    name: "Counterfeit derivative blocked",
    summary: "A reseller submits a luxury character asset with copied provenance and a mismatched source file.",
    status: "blocked",
    asset: {
      name: "Maison Or / Celestial Fox Character",
      category: "Luxury character IP",
      edition: "Claimed limited digital collectible #18",
      fingerprint: "sha256:claim-22bd... / observed:91cf...",
      assurance: "I1 / A0 / C0 / T0",
    },
    seller: {
      name: "Or Archive Resale",
      type: "Unverified secondary seller",
      verification: "Email verified; legal entity and authority not established",
    },
    buyer: {
      name: "Arcadia Game Lab",
      type: "Game studio",
      verification: "Business and procurement signer verified",
    },
    commercial: {
      licenseFee: "$32,000 blocked",
      platformFee: "$0",
      payout: "$0",
      scope: "Requested global game trailer and in-game promotional use",
    },
    checks: [
      { label: "Seller identity", status: "warning", detail: "Seller identity is basic and business registry is missing." },
      { label: "Authority", status: "failed", detail: "Uploaded letter is not from the brand-controlled domain." },
      { label: "Asset integrity", status: "failed", detail: "Submitted file does not match the claimed edition fingerprint." },
      { label: "Buyer identity", status: "passed", detail: "Studio and procurement signer verified." },
      { label: "License scope", status: "failed", detail: "Seller cannot grant character merchandising rights." },
      { label: "Payment", status: "passed", detail: "No funds captured; authorization cancelled." },
    ],
    steps: [
      { title: "Submit resale claim", actor: "seller", gives: "Asset file, ownership screenshot, claimed brand letter", receives: "Evidence challenge", proof: "Low-assurance seller profile" },
      { title: "Request commercial license", actor: "buyer", gives: "Global game-use brief and procurement identity", receives: "Transaction risk warning", proof: "Buyer I2" },
      { title: "Detect mismatch", actor: "platform", gives: "Hash mismatch and domain warning", receives: "Original source request", proof: "C0 content result" },
      { title: "Escalate to brand", actor: "platform", gives: "Evidence bundle and claimed document", receives: "Brand denial", proof: "Official-domain response" },
      { title: "Block transaction", actor: "platform", gives: "Reason code, appeal path, buyer notice", receives: "Preserved dispute record", proof: "Fraud case TS-2026-018" },
    ],
    friction: [
      "A polished listing can create false confidence before authority checks finish.",
      "The buyer needs a clear 'funds not captured' message during a fraud hold.",
      "The seller appeal flow must separate honest documentation mistakes from deliberate impersonation.",
    ],
    outcome: "Blocked before payment. No certificate issued; evidence is retained for dispute and anti-fraud review.",
  },
];
