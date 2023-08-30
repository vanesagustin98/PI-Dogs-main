import styles from './Error.module.css'
import { Link } from "react-router-dom"

const Error = ()=>{
    return(
        <div className={styles.backgroundStyle}>
            <div className={styles.container}>
                <h1 className={styles.title}>Undefined path</h1>
                <Link to={'/home'}>
                    <button className={styles.navButton}>Back to home</button>
                </Link>
            </div>
        </div>
    )
}

export default Error