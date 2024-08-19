"use client";
import "./Nav.css";
import { useState } from "react";
import styles from './NetworkToggle.module.css';

function Nav() {

    const [isMainnet, setIsMainnet] = useState(true);

    const toggleNetwork = () => {
      setIsMainnet(!isMainnet);
    };
    
    return (
        <nav className="nav">
            <div className="nav__container">
                <div className="nav__left">
                    <div className="nav__logo">
                        HederaScan
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
