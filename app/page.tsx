import { Hero } from "@/components/sections/hero";
import { CommandCenter } from "@/components/sections/command-center";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Showcase } from "@/components/sections/showcase";
import { About } from "@/components/sections/about";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CommandCenter />
      <Marquee />
      <Services />
      <Process />
      <Showcase />
      <About />
      <Cta />
    </>
  );
}
