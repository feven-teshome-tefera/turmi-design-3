import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "How Turmi Works",
  description:
    "Follow Turmi's process from farmer registration through market access.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "72px", background: "#fafaf0" }}>
        <HowItWorks />
      </main>
      <SiteFooter />
    </>
  );
}
