import { AppShell } from "@/components/app-shell";
import { Panel, PrimaryButton, SectionHeader, SecondaryButton } from "@/components/ui";
import { talents } from "@/lib/mock-data";

const fields = [
  "Finished video file",
  "Script and subtitle transcript",
  "Prompt and tool log",
  "Publishing channels",
  "Revenue model",
  "Requested actor-name usage",
  "Campaign territory",
  "Release window",
];

export default function NewProjectPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Creator submission"
        title="Submit the finished AI result for official actor approval."
        description="The platform does not need to control every generation tool. It controls whether the final work can claim the actor's official approval."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
        <Panel>
          <h2 className="text-lg font-semibold">Submission package</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field} className="rounded border border-[#e1d8ca] bg-white p-4">
                <p className="text-sm font-semibold text-[#312d28]">{field}</p>
                <div className="mt-4 h-9 rounded border border-dashed border-[#cfc7ba] bg-[#f6f4ef]" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton>Submit for review</PrimaryButton>
            <SecondaryButton>Save draft</SecondaryButton>
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold">Available talent policies</h2>
          <div className="mt-4 space-y-4">
            {talents.map((talent) => (
              <div key={talent.id} className="rounded border border-[#e1d8ca] bg-white p-4">
                <p className="font-semibold">{talent.name}</p>
                <p className="mt-1 text-sm text-[#625d55]">{talent.agency}</p>
                <p className="mt-3 text-sm text-[#4d4941]">
                  Minimum license: {talent.policy.minimumLicenseFee.toLocaleString("en-US")} USD
                </p>
                <p className="mt-1 text-sm text-[#4d4941]">
                  Review SLA: {talent.policy.reviewSlaHours} hours
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
