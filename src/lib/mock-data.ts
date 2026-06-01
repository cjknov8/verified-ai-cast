export type ReviewStatus =
  | "submitted"
  | "reviewing"
  | "changes_requested"
  | "approved"
  | "rejected"
  | "revoked";

export type CertificateStatus = "active" | "revoked" | "expired";

export type AuditAction =
  | "submitted"
  | "review_started"
  | "approved"
  | "rejected"
  | "changes_requested"
  | "revoked";

export type TalentPolicy = {
  talentId: string;
  allowedUses: string[];
  restrictedUses: string[];
  reviewSlaHours: number;
  minimumLicenseFee: number;
  likenessBoundaries: string[];
  requiredDisclosures: string[];
};

export type Talent = {
  id: string;
  name: string;
  agency: string;
  category: string;
  territory: string;
  reputationScore: number;
  activeLicenses: number;
  pendingReviews: number;
  policy: TalentPolicy;
};

export type Project = {
  id: string;
  title: string;
  producer: string;
  talentId: string;
  status: ReviewStatus;
  submittedAt: string;
  intendedUse: string;
  territory: string;
  duration: string;
  budget: number;
  riskFlags: string[];
  reviewerNotes: string[];
  certificateId?: string;
};

export type Certificate = {
  id: string;
  projectId: string;
  status: CertificateStatus;
  issuedAt: string;
  expiresAt: string;
  approvedUrls: string[];
  verificationHash: string;
  licenseScope: string;
  revokedAt?: string;
  revocationReason?: string;
};

export type AuditLogEntry = {
  id: string;
  projectId: string;
  certificateId?: string;
  action: AuditAction;
  actorType: "creator" | "agency" | "platform";
  actorName: string;
  createdAt: string;
  note: string;
};

export type LedgerEntry = {
  id: string;
  projectId: string;
  talentId: string;
  type: "license" | "review_fee" | "royalty";
  amount: number;
  status: "scheduled" | "paid" | "held";
  date: string;
};

export const talents: Talent[] = [
  {
    id: "talent-01",
    name: "Mina Park",
    agency: "Aster Rights Studio",
    category: "Actor",
    territory: "KR, JP, US",
    reputationScore: 94,
    activeLicenses: 8,
    pendingReviews: 3,
    policy: {
      talentId: "talent-01",
      allowedUses: ["Brand film", "Short-form social", "Episodic concept proof"],
      restrictedUses: ["Political endorsement", "Medical claims", "Adult content"],
      reviewSlaHours: 36,
      minimumLicenseFee: 18000,
      likenessBoundaries: [
        "No voice cloning without separate approval",
        "No age regression below 21",
        "No implied personal product use",
      ],
      requiredDisclosures: [
        "Official AI appearance mark",
        "Certificate URL in final credits",
      ],
    },
  },
  {
    id: "talent-02",
    name: "Daniel Kwon",
    agency: "Northline Management",
    category: "Actor",
    territory: "Global excluding CN",
    reputationScore: 91,
    activeLicenses: 5,
    pendingReviews: 2,
    policy: {
      talentId: "talent-02",
      allowedUses: ["Game trailer", "Virtual host", "Previsualization"],
      restrictedUses: ["Financial advice", "Gambling", "Deepfake parody"],
      reviewSlaHours: 48,
      minimumLicenseFee: 24000,
      likenessBoundaries: [
        "Wardrobe must match approved style guide",
        "No unscripted dialogue beyond submitted script",
      ],
      requiredDisclosures: ["Visible AI appearance badge", "Landing page certificate link"],
    },
  },
];

export const projects: Project[] = [
  {
    id: "project-01",
    title: "Orion Fragrance Launch Film",
    producer: "Vantage Pictures",
    talentId: "talent-01",
    status: "reviewing",
    submittedAt: "2026-05-10",
    intendedUse: "Premium campaign film and social cutdowns",
    territory: "KR, JP",
    duration: "12 months",
    budget: 86000,
    riskFlags: ["Voice similarity requires separate consent", "Disclosure mark missing in 9:16 cut"],
    reviewerNotes: [
      "Facial likeness is within approved tolerance.",
      "Request a revised end-card with certificate placement.",
    ],
  },
  {
    id: "project-02",
    title: "Helio Motors Interactive Configurator",
    producer: "Blueframe Lab",
    talentId: "talent-02",
    status: "changes_requested",
    submittedAt: "2026-05-08",
    intendedUse: "Interactive dealership screen",
    territory: "US",
    duration: "6 months",
    budget: 42000,
    riskFlags: ["Gesture library includes unapproved thumbs-up shot"],
    reviewerNotes: ["Replace three gesture clips before final review."],
  },
  {
    id: "project-03",
    title: "Luma Seoul Season Teaser",
    producer: "Arc Edit House",
    talentId: "talent-01",
    status: "approved",
    submittedAt: "2026-05-01",
    intendedUse: "Streaming teaser and press microsite",
    territory: "Global",
    duration: "9 months",
    budget: 128000,
    riskFlags: [],
    reviewerNotes: ["Approved with certificate placement in opening slate."],
    certificateId: "cert-2026-0007",
  },
  {
    id: "project-04",
    title: "North Harbor Virtual Host Pilot",
    producer: "North Harbor Media",
    talentId: "talent-02",
    status: "revoked",
    submittedAt: "2026-03-12",
    intendedUse: "Virtual event host pilot",
    territory: "US",
    duration: "3 months",
    budget: 32000,
    riskFlags: ["Certificate revoked after an unapproved derivative edit was published"],
    reviewerNotes: ["Preserve the original approval record and block active certificate display."],
    certificateId: "cert-2026-0005",
  },
  {
    id: "project-05",
    title: "Mori Atelier Spring Lookbook",
    producer: "Mori Atelier",
    talentId: "talent-01",
    status: "approved",
    submittedAt: "2025-03-02",
    intendedUse: "Seasonal lookbook microsite",
    territory: "KR",
    duration: "12 months",
    budget: 28000,
    riskFlags: [],
    reviewerNotes: ["Approval period ended. Retain certificate history for public verification."],
    certificateId: "cert-2025-0018",
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-2026-0007",
    projectId: "project-03",
    status: "active",
    issuedAt: "2026-05-03",
    expiresAt: "2027-02-03",
    approvedUrls: [
      "https://campaigns.lumaseoul.example/season-teaser",
      "https://video.example.com/watch/luma-seoul-season-teaser",
    ],
    verificationHash: "VAC-8F91-24C7-77A0",
    licenseScope:
      "Official AI appearance approval for streaming teaser, press microsite, and owned social channels.",
  },
  {
    id: "cert-2026-0005",
    projectId: "project-04",
    status: "revoked",
    issuedAt: "2026-03-15",
    expiresAt: "2026-06-15",
    approvedUrls: ["https://events.northharbor.example/virtual-host-pilot"],
    verificationHash: "VAC-41B2-9D30-CC18",
    licenseScope: "Virtual event host pilot on the approved event page only.",
    revokedAt: "2026-04-02",
    revocationReason: "An unapproved derivative edit was published outside the reviewed scope.",
  },
  {
    id: "cert-2025-0018",
    projectId: "project-05",
    status: "expired",
    issuedAt: "2025-03-10",
    expiresAt: "2026-03-10",
    approvedUrls: ["https://lookbook.moriatelier.example/spring-2025"],
    verificationHash: "VAC-E581-771F-902A",
    licenseScope: "Seasonal lookbook microsite approval for the Spring 2025 campaign.",
  },
];

export const auditLogs: AuditLogEntry[] = [
  {
    id: "audit-001",
    projectId: "project-01",
    action: "submitted",
    actorType: "creator",
    actorName: "Vantage Pictures",
    createdAt: "2026-05-10T09:12:00Z",
    note: "Finished campaign film and supporting disclosure package submitted.",
  },
  {
    id: "audit-002",
    projectId: "project-01",
    action: "review_started",
    actorType: "agency",
    actorName: "Aster Rights Studio",
    createdAt: "2026-05-10T14:40:00Z",
    note: "Agency review opened with voice similarity and disclosure placement flags.",
  },
  {
    id: "audit-003",
    projectId: "project-02",
    action: "submitted",
    actorType: "creator",
    actorName: "Blueframe Lab",
    createdAt: "2026-05-08T03:30:00Z",
    note: "Interactive dealership screen package submitted.",
  },
  {
    id: "audit-004",
    projectId: "project-02",
    action: "changes_requested",
    actorType: "agency",
    actorName: "Northline Management",
    createdAt: "2026-05-09T08:20:00Z",
    note: "Replace the unapproved gesture clips before resubmission.",
  },
  {
    id: "audit-005",
    projectId: "project-03",
    action: "submitted",
    actorType: "creator",
    actorName: "Arc Edit House",
    createdAt: "2026-05-01T05:10:00Z",
    note: "Streaming teaser and press microsite package submitted.",
  },
  {
    id: "audit-006",
    projectId: "project-03",
    certificateId: "cert-2026-0007",
    action: "approved",
    actorType: "agency",
    actorName: "Aster Rights Studio",
    createdAt: "2026-05-03T11:00:00Z",
    note: "Approved with certificate placement in the opening slate and URL allowlist.",
  },
  {
    id: "audit-007",
    projectId: "project-04",
    certificateId: "cert-2026-0005",
    action: "approved",
    actorType: "agency",
    actorName: "Northline Management",
    createdAt: "2026-03-15T04:00:00Z",
    note: "Approved for the reviewed pilot version and the event page URL only.",
  },
  {
    id: "audit-008",
    projectId: "project-04",
    certificateId: "cert-2026-0005",
    action: "revoked",
    actorType: "agency",
    actorName: "Northline Management",
    createdAt: "2026-04-02T10:15:00Z",
    note: "Revoked after an unapproved derivative edit was published outside scope.",
  },
];

export const ledger: LedgerEntry[] = [
  {
    id: "led-001",
    projectId: "project-03",
    talentId: "talent-01",
    type: "license",
    amount: 42000,
    status: "paid",
    date: "2026-05-05",
  },
  {
    id: "led-002",
    projectId: "project-01",
    talentId: "talent-01",
    type: "review_fee",
    amount: 2500,
    status: "held",
    date: "2026-05-10",
  },
  {
    id: "led-003",
    projectId: "project-02",
    talentId: "talent-02",
    type: "license",
    amount: 24000,
    status: "scheduled",
    date: "2026-05-20",
  },
];

export function getTalent(id: string) {
  return talents.find((talent) => talent.id === id) ?? talents[0];
}

export function getProject(id: string) {
  return projects.find((project) => project.id === id) ?? projects[0];
}

export function getCertificate(id: string) {
  return certificates.find((certificate) => certificate.id === id) ?? certificates[0];
}

export function getAuditLogsForProject(projectId: string) {
  return auditLogs.filter((entry) => entry.projectId === projectId);
}

export function normalizeSourceUrl(value: string) {
  try {
    const url = new URL(value);
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function isApprovedSourceUrl(certificate: Certificate, claimedSourceUrl: string) {
  const normalizedClaim = normalizeSourceUrl(claimedSourceUrl);

  if (!normalizedClaim) {
    return false;
  }

  return certificate.approvedUrls.some(
    (approvedUrl) => normalizeSourceUrl(approvedUrl) === normalizedClaim,
  );
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
