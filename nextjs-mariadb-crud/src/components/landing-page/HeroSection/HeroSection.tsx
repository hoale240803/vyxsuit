import styles from './HeroSection.module.scss';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Global Craftsmanship, Redefined for You.</h1>
        <p>
          Discover bespoke suits crafted by the world’s finest artisans. Tailored perfection, brought to you at an accessible price.
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.primary}>Explore Our Vision</button>
          <button className={styles.secondary}>Shop Bespoke</button>
        </div>
      </div>
      <div className={styles.visual}>
        {/* <img src="/images/tailor.jpg" alt="Tailor in action" /> */}
      </div>
    </section>
  );
};

export default HeroSection;