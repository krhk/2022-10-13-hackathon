import { useState, useEffect } from "react";
import styles from "./headerStyle.module.scss";
import hamburger from "./hamburgerStyle.module.scss";
import Link from "next/link";

export default function Header() {

   const [clicked, setClicked] = useState(false);
   const [scrollPos, setScrollPos] = useState(0);

   const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPos(position);
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <header className={styles.header}>
         <div className={styles.wrapper}>
            <div className={styles.left}>
               <Link href="/">
                  <img src="/src/KrajLogo.svg" />
               </Link>

            </div>
            <div className={styles.right}>
               <div className={styles.pc}>
                  <Link href="/kontakt">Kontakt</Link>
                  <Link href="/oprojektu">O projektu</Link>
               </div>
               <div className={styles.mobile}>
                  <div id={hamburger.hamburger} className={clicked ? "open" : ""} onClick={() => setClicked(!clicked)}>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span></span>
                  </div>
               </div>
            </div>
         </div>
         {scrollPos > 50 ? <div className={styles.background}/> : null}
         
      </header>
   )
}