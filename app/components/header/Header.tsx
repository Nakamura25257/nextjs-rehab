import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        MySite
      </Link>
      <nav className={styles.nav}>
        <a href="#features">Features</a>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
