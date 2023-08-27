import SelectTemperament from "../../Components/SelectTemperament/SelectTemperament"
import { useDispatch } from 'react-redux';
import { postDog } from '../../Redux/actions';
import { useState } from 'react';
import styles from './Form.module.css'

const Form = () => {
    const dispatch = useDispatch();
    const [successAlert, setSuccessAlert] = useState(false);
    const [temperaments, setTemperaments] = useState({ temperament: '' });
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dog = Object.fromEntries(formData.entries());
        dog.weight = `${dog.weightMin} - ${dog.weightMax}`;
        delete dog.weightMin;
        delete dog.weightMax;
        dog.height = `${dog.heightMin} - ${dog.heightMax}`;
        delete dog.heightMin;
        delete dog.heightMax;
        dog.life_span = `${dog.agetMin} - ${dog.ageMax}`;
        delete dog.ageMin;
        delete dog.ageMax;
        dog.temperament = selectedTemperaments.join(', ');
        dispatch(postDog(dog));
        setSuccessAlert(true);
        event.target.reset();
        setSelectedTemperaments([]);
        setTemperaments({ temperament: '' });
        setTimeout(() => {
            setSuccessAlert(false);
        }, 3000);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setTemperaments(prevState => ({ ...prevState, [name]: value }));
    }

    function handleAddTemperament(event) {
        event.preventDefault();
        setSelectedTemperaments(prevSelected => [...prevSelected, temperaments.temperament]);
        setTemperaments({ temperament: '' });
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formBox}>
                <h1 className={styles.formHeader}>Add Dog</h1>
                <form className={styles.formu} onSubmit={handleSubmit}>
                    <label className={styles.formLabel}>Name</label>
                    <input className={styles.formInput} name='name' type="text" />
                    <div className={styles.inlineInputs}>
                        <label className={styles.formLabel}>Weight</label>
                        <input className={styles.formInput} name='weightMin' type="text" />
                        <span>-</span>
                        <input className={styles.formInput} name='weightMax' type="text" />
                    </div>
                    <div className={styles.inlineInputs}>
                        <label className={styles.formLabel}>Height</label>
                        <input className={styles.formInput} name='heightMin' type="text" />
                        <span>-</span>
                        <input className={styles.formInput} name='heightMax' type="text" />
                    </div>
                    <div className={styles.inlineInputs}>
                        <label className={styles.formLabel}>Life Span</label>
                        <input className={styles.formInput} name='ageMin' type="text" />
                        <span>-</span>
                        <input className={styles.formInput} name='ageMax' type="text" />
                    </div>
                    <label className={styles.formLabel}>Temperament</label>
                    <div className={styles.inlineTemperament}>
                        <SelectTemperament name='temperament' onChange={handleChange} />
                        <button className={styles.formButton} onClick={handleAddTemperament}>+</button>
                    </div>
                    <div className={styles.selectedTemperaments}>
                        {selectedTemperaments.map((temp, index) => (
                            <span key={index} className={styles.selectedTemperament}>{temp}</span>
                        ))}
                    </div>
                    <label className={styles.formLabel}>Image</label>
                    <input className={styles.formInput} name='image' type="text" />
                    <button className={styles.formButton} type="submit">Crear</button>
                    {successAlert && (
                        <div className={styles.alert}>Dog created successfully!</div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Form
