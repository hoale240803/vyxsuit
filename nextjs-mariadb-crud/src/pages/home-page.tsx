import HeroSection from '../components/landing-page/HeroSection/HeroSection';
import WhatSetsUsApart from '../components/landing-page/WhatSetsUsApart/WhatSetsUsApart';
import FeaturedCollaboration from '../components/landing-page/FeaturedCollaboration/FeaturedCollaboration';
import CustomerTestimonials from '../components/landing-page/CustomerTestimonials/CustomerTestimonials';
import FinalCTA from '../components/landing-page/FinalCTA/FinalCTA';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <WhatSetsUsApart />
      <FeaturedCollaboration />
      <CustomerTestimonials />
      <FinalCTA />
    </>
  );
};

export default HomePage;