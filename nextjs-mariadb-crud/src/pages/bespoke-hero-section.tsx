"use client";

import React from "react";
import Button from "../components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col justify-center items-center px-32 py-72 min-h-[944px] max-md:px-16 max-md:py-52 max-sm:px-5 max-sm:py-24">
      <div className="flex flex-col gap-8 justify-center items-center w-full max-w-[1200px]">
        <header className="flex flex-col gap-2 items-center w-full">
          <h1 className="text-5xl font-bold text-center text-amber-50 max-md:text-4xl max-sm:text-3xl">
            <span>Global Craftsmanship,</span>
            <br />
            <span>Redefined for You</span>
          </h1>
          <p className="text-2xl font-semibold text-center text-amber-50 max-md:text-xl max-sm:text-lg">
            Discover bespoke suits crafted by the world&apos;s finest artisans.
            Tailored perfection, brought to you at an accessible price.
          </p>
        </header>
        <div className="flex gap-4 items-center max-sm:flex-col max-sm:w-full">
          <Button className="max-sm:w-full">Explore Our Vision</Button>
          <Button className="max-sm:w-full">Shop Bespoke</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
