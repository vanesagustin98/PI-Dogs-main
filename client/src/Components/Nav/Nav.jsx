import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Nav.module.css';

const Nav = () => {
    return (
        <div className={styles.navContainer}>
            <div className={styles.navSectionLeft}>
                <Link to={'/'}>
                    <button className={styles.navButton}>Landing</button>
                </Link>
            </div>
            <div className={styles.navSectionCenter}>
                <SearchBar/>
            </div>
            <div className={styles.navSectionRight}>
                <Link to={'/home'}>
                    <button className={styles.navButton}>Home</button>
                </Link>
                <Link to={'/form'}>
                    <button className={styles.navButton}>Agregar Perro</button>
                </Link>
            </div>
        </div>
    )
}

export default Nav;
