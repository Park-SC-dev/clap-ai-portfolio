import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        Clap AI
      </a>
      <nav className={styles.nav}>
        <a href="#work" className={styles.navLink}>
          WORK
        </a>
        <a href="#contact" className={styles.navLink}>
          CONTACT
        </a>
      </nav>
    </header>
  );
}
