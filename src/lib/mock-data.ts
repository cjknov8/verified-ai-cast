export type ReviewStatus =
  | "submitted"
  | "reviewing"
  | "changes_requested"
  | "approved"
  | "rejected";

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
  issuedAt: string;
  expiresAt: string;
  verificationHash: string;
  licenseScope: string;
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
];

export const certificates: Certificate[] = [
  {
    id: "cert-2026-0007",
    projectId: "project-03",
    issuedAt: "2026-05-03",
    expiresAt: "2027-02-03",
    verificationHash: "VAC-8F91-24C7-77A0",
    licenseScope:
      "Official AI appearance approval for streaming teaser, press microsite, and owned social channels.",
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

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
