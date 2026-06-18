import { AppShell } from "@/components/app-shell";
import { SubmissionWorkspace } from "@/components/submission-workspace";
import { SectionHeader } from "@/components/ui";

export default function NewProjectPage() {
  return (
    <AppShell>
      <SectionHeader eyebrow="Verification request" title="Prepare an official asset review." description="Submit the finished result, supporting record, and exact rights scope you want the rights holder to review." />
      <SubmissionWorkspace />
    </AppShell>
  );
}
