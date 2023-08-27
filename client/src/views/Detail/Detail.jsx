import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { detailDog } from "../../Redux/actions"
import { useParams } from "react-router-dom"
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
        filter: 'blur(10px)',
        opacity: 0.5,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };
    return (
        <>
            {dog && (
                <div style={backgroundStyle}>
                    <div className={styles.testStyle}>
                        <h3>Id: {dog.id}</h3>
                        <h3>Raza: {dog.name}</h3>
                        <h3>Peso: {dog.weight} kg</h3>
                        <h3>Altura: {dog.height} cm</h3>
                        <h3>Años de vida: {dog.life_span}</h3>
                        <h3>Temperamento: {dog.temperament}</h3>
                        {/* <img src={dog.image} alt={dog.name} /> */}
                    </div>
                </div>
            )}
        </>
    )
}

export default Detail