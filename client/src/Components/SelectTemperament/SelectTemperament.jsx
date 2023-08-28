import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { allTemperaments} from "../../Redux/actions"
import styles from './SelectTemperament.module.css';

const SelectTemperament = ({ name, onChange }) => {

    const temperaments = useSelector(state => state.temperaments)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allTemperaments())
    }, [dispatch])

    return (
        <div className={styles.selectContainer}>
            <select className={styles.selectDropdown} name={name} onChange={onChange} defaultValue="">
                <option disabled value="">Temperaments</option>
                <option value="all">All</option>
                {temperaments.map(temperament => (
                    <option key={temperament.id} value={temperament.name}> {temperament.name} </option>
                    ))
                    
                }
            </select>


                </div>
    )
}

export default SelectTemperament
