import { Hero } from "@/components/sections/hero";
import { CommandCenter } from "@/components/sections/command-center";
import { Marquee } from "@/components/sections/marquee";
import { Systems } from "@/components/sections/systems";
import { Lattice } from "@/components/sections/lattice";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Pipeline } from "@/components/sections/pipeline";
import { Stack } from "@/components/sections/stack";
import { Showcase } from "@/components/sections/showcase";
import { Engagement } from "@/components/sections/engagement";
import { About } from "@/components/sections/about";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CommandCenter />
      <Marquee />
      <Systems />
      <Lattice />
      <Services />
      <Process />
      <Pipeline />
      <Stack />
      <Showcase />
      <Engagement />
      <About />
      <Faq />
      <Cta />
    </>
  );
}
