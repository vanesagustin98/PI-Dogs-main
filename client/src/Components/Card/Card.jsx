import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { connect } from 'react-redux';

function Card(props) {
    const { id, name, weight, image, temperament } = props;
    let cardStyle = styles.divCard;

    if ((id + 1) % 3 === 2) {
        cardStyle = `${styles.divCard} ${styles.yellowBackground}`;
    } else if ((id + 1) % 3 === 0) {
        cardStyle = `${styles.divCard} ${styles.blueBackground}`;
    } else if ((id) % 3 === 0) {
        cardStyle = `${styles.divCard} ${styles.redBackground}`;
    }

    return (
        <Link to={`/detail/${id}`}>
            <div className={cardStyle}>
                <h2 className={styles.h2CardName}>{name}</h2>
                <h2 className={styles.h2Card}>{weight} kg</h2>
                <h2 className={styles.h2Card}>{temperament}</h2>
                <div className={styles.imgContainer}>
                    <img
                        className={styles.imgCard}
                        src={image}
                        alt={name}
                        onError={(e) => {
                            e.target.src = 'https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=1200,height=675,fit=cover/article/main-picture/60344e6b560ba218487240.jpg';
                            e.target.onerror = null;
                            e.preventDefault();
                        }}
                    />
                </div>
            </div>
        </Link>
    );
}

function mapStateToProps(state) {
    return {
        myDogs: state.myDogs
    }
}
export default connect(mapStateToProps)(Card);
