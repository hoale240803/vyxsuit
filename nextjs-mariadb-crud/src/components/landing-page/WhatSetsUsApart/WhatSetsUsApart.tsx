import styles from './WhatSetsUsApart.module.scss';

const WhatSetsUsApart = () => {
  return (
    <section className={styles.section}>
      <h2>Luxury That Fits—Your Body and Your Budget.</h2>
      <div className={styles.content}>
        <div className={styles.item}>
          {/* <img src="/images/artisans.jpg" alt="Artisans working" /> */}
          <p>Global Expertise: We collaborate with renowned artisans from around the world to deliver suits of unparalleled quality.</p>
        </div>
        <div className={styles.item}>
          {/* <img src="/images/pricing.jpg" alt="Affordable pricing" /> */}
          <p>Affordable Excellence: Luxury no longer means compromise. We redefine affordability with bespoke suits at a fraction of traditional costs.</p>
        </div>
        <div className={styles.item}>
          {/* <img src="/images/perfect-fit.jpg" alt="Perfect fit" /> */}
          <p>Personalized Perfection: From the first measurement to the final stitch, your suit is uniquely crafted to fit your style and ambition.</p>
        </div>
      </div>
      <button className={styles.cta}>Learn More About Our Process</button>
    </section>
  );
};

export default WhatSetsUsApart;