import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WineSection } from "@/components/wine-section";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WineSection />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
