import { Link } from "react-router-dom"
import styles from './Landing.module.css';

const Landing = () => {
    return (
        <div className={styles.divLanding}>
            <div className={styles.divConDegradado}></div>
            <img className={styles.imgPerro} src='https://d2yoo3qu6vrk5d.cloudfront.net/images/20230228085206/colombia-perros.jpg' alt='Perro' />
            <div className={styles.divLandingContent}>
                <h1 className={styles.h1Landing}>Bienvenid@</h1>
                <Link to='/home'>
                    <button className={styles.buttonLanding}>¡Vamos!</button>
                </Link>
            </div>
        </div>
    );
}

export default Landing;
