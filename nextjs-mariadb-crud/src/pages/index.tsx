import { useRouter } from "next/router";
import { useEffect } from "react";
import HeroSection from "./bespoke-hero-section";

export default function Home() {
  // const router = useRouter();
  // useEffect(() => {
  //   router.push(`/product-list`);
  // }, [router])
  return (
    <>
      <HeroSection></HeroSection>
    </>
  );
}
