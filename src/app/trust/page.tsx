import type { Metadata } from "next";
import { PublicDocument } from "@/components/public-document";

export const metadata: Metadata = {
  title: "Trust and Verification",
  description: "What Verified Presence public records prove, their limits, and how to report misuse.",
};

export default function TrustPage() {
  return (
    <PublicDocument eyebrow="Relying-party guidance" title="Trust and verification" updated="June 13, 2026">
      <Section title="What a record proves">
        An active public record shows that this platform recorded an approval for the identified project, performer, scope, term, and listed publishing locations. Status must be checked live because approvals can expire or be revoked.
      </Section>
      <Section title="What it does not prove">
        A certificate is not a universal legal opinion, proof that every underlying right is valid, or proof that copied media on an unlisted page is authorized. The current demo URL check compares normalized URLs and does not yet verify domain control or media fingerprints.
      </Section>
      <Section title="Assurance labels">
        Identity, representative authority, approval, content match, and distribution match are separate claims. Future records will expose each assurance level independently rather than collapsing them into one check mark.
      </Section>
      <Section title="Report misuse or a mismatch">
        Preserve the page URL, certificate ID, screenshots, and the date observed. Send a report to{" "}
        <a className="font-semibold text-[#31554f] underline" href="mailto:trust@verified-ai-cast.com?subject=Certificate%20misuse%20report">
          trust@verified-ai-cast.com
        </a>
        . Reports are triaged as product demonstrations until production trust operations and response-time commitments launch.
      </Section>
    </PublicDocument>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="font-serif text-2xl text-[#17211f]">{title}</h2><p className="mt-3">{children}</p></section>;
}
