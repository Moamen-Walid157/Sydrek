import type { Metadata } from "next";
import { BackgroundRemoval } from "@/components/tools/background-removal";
import { ToolHeader } from "@/components/tools/tool-header";
import { ToolSwitcher } from "@/components/tools/tool-switcher";

export const metadata: Metadata = {
  title: "Background removal",
  description: "Remove a photo background in the browser. The image stays on your device, and you download a PNG.",
  alternates: { canonical: "/tools/background/" },
  openGraph: {
    title: "Background removal · Sydrek",
    description: "Cut a subject out of a photo in the browser. The file never leaves this device.",
    url: "/tools/background/",
  },
};

export default function BackgroundPage() {
  return (
    <section className="shell pt-32 pb-24">
      <ToolHeader
        index="01"
        stage="Design"
        title="Cut the background."
        text="Drop a product photo, a portrait, or a logo. Sydrek cuts the background on this device, then you download a PNG."
      />
      <ToolSwitcher current="background" />
      <BackgroundRemoval />
    </section>
  );
}
