import type { Metadata } from "next";
import { PublicDocument } from "@/components/public-document";

export const metadata: Metadata = { title: "Privacy Notice" };

export default function PrivacyPage() {
  return (
    <PublicDocument eyebrow="Draft notice" title="Privacy notice" updated="June 13, 2026">
      <Section title="Current demo">This deployment does not provide production accounts. Demo drafts and review actions are stored in the user&apos;s browser. Selected files are not uploaded by the current application.</Section>
      <Section title="Technical data">Hosting and infrastructure providers may process ordinary request logs, IP addresses, device information, and security events needed to deliver and protect the site.</Section>
      <Section title="Production launch">Before real onboarding begins, this notice will identify the operating legal entity, processing purposes, retention periods, subprocessors, international transfers, user rights, and jurisdiction-specific disclosures.</Section>
      <Section title="Contact">Privacy questions can be sent to <a className="underline" href="mailto:privacy@verified-ai-cast.com">privacy@verified-ai-cast.com</a>.</Section>
    </PublicDocument>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="font-serif text-2xl text-[#17211f]">{title}</h2><p className="mt-3">{children}</p></section>;
}
