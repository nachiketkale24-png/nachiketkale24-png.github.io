import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import SignalStrip from "@/components/sections/SignalStrip";
import SelectedWork from "@/components/sections/SelectedWork";
import TechnicalDepth from "@/components/sections/TechnicalDepth";
import Timeline from "@/components/sections/Timeline";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <SignalStrip />
        <SelectedWork />
        <TechnicalDepth />
        <Timeline />
        <About />
        <Contact />
      </main>
    </>
  );
}
