import { Hero } from "@/components/home/hero";
import { CrateFeature } from "@/components/home/crate-feature";
import { ConsultancyIntro } from "@/components/home/consultancy-intro";
import { SelectedWork } from "@/components/home/selected-work";
import { Capabilities } from "@/components/home/capabilities";
import { Methodology } from "@/components/home/methodology";
import { DesignEngineering } from "@/components/home/design-engineering";
import { StudioPreview } from "@/components/home/studio-preview";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <CrateFeature />
      <ConsultancyIntro />
      <SelectedWork />
      <Capabilities />
      <Methodology />
      <DesignEngineering />
      <StudioPreview />
      <ContactSection />
    </>
  );
}
