import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { detailDog } from "../../Redux/actions"
import { Link, useParams } from "react-router-dom"
import styles from './Detail.module.css'

const Detail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailDog(id))
    }, [dispatch, id])
    const dog = useSelector(state => state.dogDetail)

    const backgroundStyle = {
        backgroundImage: `url(${dog.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(5px)',
        opacity: 0.5,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    };

    return (
        <div className={styles.mainContainer}>
            <div style={backgroundStyle} />
            <div className={styles.testStyle}>
                {dog && (
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <h3>Id</h3>
                            <h3>Breed</h3>
                            <h3>Weight</h3>
                            <h3>Height</h3>
                            <h3>Life Span</h3>
                            <h3>Temperament</h3>
                        </div>
                        <br />
                        <div className={styles.divider}>&nbsp;</div>
                        <div className={styles.right}>
                            <h3>{dog.id}</h3>
                            <h3>{dog.name}</h3>
                            <h3>{dog.weight} kg</h3>
                            <h3>{dog.height} cm</h3>
                            <h3>{dog.life_span}</h3>
                            <h3>{dog.temperament}</h3>
                        </div>
                    </div>
                )}
            </div>
            <Link to={'/home'}>
                <button className={styles.navButton}>Home</button>
            </Link>
        </div>
    )
}

export default Detail