import Link from "next/link";
import styles from "./footerStyle.module.scss";

export default function Footer() {


   return (
      <footer className={styles.footer}>
         <div className={styles.divider} />
         <div className={styles.footerNav}>
            
            <div className={styles.section}>
               <h3>Projekt</h3>
               <ul>
                  <li><Link href="/kontakt">Kontakt</Link></li>
                  <li><Link href="/oprojektu">O projektu</Link></li>
               </ul>
            </div>
            <div className={styles.section}>
               <h3>Další stránky</h3>
               <ul>
                  <li><Link href="/">Vyhledávání</Link></li>
                  <li><Link href="/">Výlety</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
               </ul>
            </div>
         </div>

         <div className={styles.copyright}>© Hackaton Webpage</div>
      </footer>
   )
}