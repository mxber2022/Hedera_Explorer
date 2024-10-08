"use client";
import "./Nav.css";
import { useNetwork } from '../NetworkContext/NetworkContext';
import { useState } from "react";
import styles from './NetworkToggle.module.css';


function Nav() {
   // const [isMainnet, setIsMainnet] = useState(true);
   const { isMainnet, toggleNetwork } = useNetwork();

    // const toggleNetwork = () => {
    //   setIsMainnet(!isMainnet);
    // };
    
    return (
        <nav className="nav">
            <div className="nav__container">
                <div className="nav__left">
                    <div className="nav__logo">
                        <img src="/logo.jpg" alt="HederaScan Logo" className="logo" />
                        <span className={styles.logoText}>HederaScan</span>
                    </div>
                </div>
                <div className="nav__right">
                    <div className="nav__right-content">
                        <div className={`${styles.toggle} ${isMainnet ? '' : styles.active}`} onClick={toggleNetwork}>
                            <div className={styles.toggleButton}></div>
                            <div className={styles.labelMainnet}>Mainnet</div>
                            <div className={styles.labelTestnet}>Testnet</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
