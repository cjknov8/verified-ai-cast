import { AppShell } from "@/components/app-shell";
import { CertificateLookup } from "@/components/certificate-lookup";
import { Notice, Panel, PanelHeader, SectionHeader } from "@/components/ui";

export default function VerifyPage() {
  return (
    <AppShell>
      <SectionHeader eyebrow="Public trust" title="Verify an asset certificate." description="Inspect the current certificate state, approved URLs, and usage scope before relying on an official claim." />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <Panel>
          <PanelHeader eyebrow="Verify an asset" title="Enter the public certificate ID" description="Try the active demo record: cert-2026-0007" />
          <CertificateLookup />
        </Panel>
        <div className="space-y-4">
          <Notice tone="neutral">A valid certificate still applies only to its approved publishing URLs. Inspect the source URL allowlist on the certificate page.</Notice>
          <Notice tone="warning">Revoked and expired records remain visible for transparency, but they must not be presented as active approvals.</Notice>
        </div>
      </div>
    </AppShell>
  );
}
