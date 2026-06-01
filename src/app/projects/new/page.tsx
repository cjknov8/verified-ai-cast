import { AppShell } from "@/components/app-shell";
import { SubmissionWorkspace } from "@/components/submission-workspace";
import { SectionHeader } from "@/components/ui";

export default function NewProjectPage() {
  return (
    <AppShell>
      <SectionHeader eyebrow="Creator submission" title="Prepare an official appearance review." description="Submit a finished AI result, its supporting record, and the exact rights scope you want the talent team to review." />
      <SubmissionWorkspace />
    </AppShell>
  );
}
