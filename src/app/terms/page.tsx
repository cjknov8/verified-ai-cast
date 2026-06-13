import type { Metadata } from "next";
import { PublicDocument } from "@/components/public-document";

export const metadata: Metadata = { title: "Demo Terms" };

export default function TermsPage() {
  return (
    <PublicDocument eyebrow="Draft terms" title="Demo terms of use" updated="June 13, 2026">
      <Section title="Demonstration only">The current service is a product demonstration. It does not execute a license, process payment, create a legally binding approval, or provide a production certificate authority service.</Section>
      <Section title="No reliance on demo records">All displayed people, organizations, projects, financial entries, hashes, and certificates are fictional examples unless expressly identified otherwise. Do not rely on them for commercial distribution or rights clearance.</Section>
      <Section title="Acceptable use">Do not use the service to impersonate a rights holder, submit unlawful content, misrepresent a demo certificate as production authorization, probe private systems, or interfere with service availability.</Section>
      <Section title="Production agreements">Rights-holder, agency, creator, privacy, payment, dispute, and certificate policies require legal review and explicit acceptance before production onboarding.</Section>
    </PublicDocument>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="font-serif text-2xl text-[#17211f]">{title}</h2><p className="mt-3">{children}</p></section>;
}
