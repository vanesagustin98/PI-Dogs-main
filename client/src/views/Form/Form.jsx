import SelectTemperament from "../../Components/SelectTemperament/SelectTemperament"
import { useDispatch } from 'react-redux';
import { postDog } from '../../Redux/actions';
import { useState } from 'react';
import styles from './Form.module.css'
import validate from "./validation"

const Form = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [successAlert, setSuccessAlert] = useState(false);
    const [temperaments, setTemperaments] = useState({ temperament: '' });
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [dogInput, setDogInput] = useState({});


    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dog = Object.fromEntries(formData.entries());
        const validationErrors = validate(dog);
        setErrors({});
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newDogInput = {
            weight: `${dog.weightMin} - ${dog.weightMax}`,
            height: `${dog.heightMin} - ${dog.heightMax}`,
            life_span: `${dog.ageMin} - ${dog.ageMax}`,
            name: dog.name,
            image: dog.image,
            temperament: selectedTemperaments.join(', ')
        };

        dispatch(postDog(newDogInput));
        setDogInput(prevState => ({
            ...prevState,
            ...newDogInput
        }));

        event.target.reset();
        setSelectedTemperaments([]);
        setTemperaments({ temperament: '' });
        setSuccessAlert(true);
        setTimeout(() => {
            setSuccessAlert(false);
        }, 5000);
    }


    function handleChange(event) {
        const { name, value } = event.target;
        setTemperaments(prevState => {
            return { ...prevState, [name]: value }
        });
    }

    function handleChanges(event) {
        const { name, value } = event.target;
        setDogInput(prevDogInput => ({ ...prevDogInput, [name]: value }));
        const updatedDogInput = { ...dogInput, [name]: value };
        const validationErrors = validate(updatedDogInput);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: validationErrors[name] }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    }


    function handleAddTemperament(event) {
        event.preventDefault();
        const temp = temperaments.temperament

        if (temp === '') {
            return;
        }

        const validationErrors = validate({ temperament: temp });
        if (validationErrors.temperament) {
            setErrors(prevErrors => ({ ...prevErrors, temperament: validationErrors.temperament }));
            return;
        }

        if (selectedTemperaments.includes(temp)) {
            setErrors(prevErrors => ({ ...prevErrors, temperament: 'Temperament already added' }));
            return;
        }

        setSelectedTemperaments(prevSelected => [...prevSelected, temp]);
        setTemperaments({ temperament: '' });
        setErrors(prevErrors => ({ ...prevErrors, temperament: '' }));
    }


    return (
        <div className={styles.formContainer}>
            <div className={styles.formBox}>
                <h1 className={styles.formHeader}>Add Dog</h1>
                <form className={styles.formu} onSubmit={handleSubmit}>
                    <label className={styles.formLabel}>Name</label>
                    <input className={styles.formInput} name='name' type="text" placeholder="Breed" onChange={handleChanges} />
                    {errors.name && <p className={styles.pForm}>{errors.name}</p>}
                    <div className={styles.inlineInputs}>
                        <label className={styles.formLabel}>Weight</label>
                        <input className={styles.formInput} name='weightMin' type="number" placeholder="Min" onChange={handleChanges} />
                        <span>-</span>
                        <input className={styles.formInput} name='weightMax' type="number" placeholder="Max" onChange={handleChanges} />
                    </div>
                    <div className={styles.containerP}>
                        {errors.weightMin && <p className={styles.pFormLines}>{errors.weightMin}</p>}
                        {errors.weightMax && <p className={styles.pFormLinesRight}>{errors.weightMax}</p>}
                    </div>
                    <div className={styles.inlineInputs}>
                        <label className={styles.formLabel}>Height</label>
                        <input className={styles.formInput} name='heightMin' type="number" placeholder="Min" onChange={handleChanges} />
                        <span>-</span>
                        <input className={styles.formInput} name='heightMax' type="number" placeholder="Max" onChange={handleChanges} />
                    </div>
                    <div className={styles.containerP}>
                        {errors.heightMin && <p className={styles.pFormLines}>{errors.heightMin}</p>}
                        {errors.heightMax && <p className={styles.pFormLinesRight}>{errors.heightMax}</p>}
                    </div>
                    <div className={styles.inlineInputs}>
                        <label className={styles.formLabel}>Life Span</label>
                        <input className={styles.formInput} name='ageMin' type="number" placeholder="Min" onChange={handleChanges} />
                        <span>-</span>
                        <input className={styles.formInput} name='ageMax' type="number" placeholder="Max" onChange={handleChanges} />
                    </div>
                    <div className={styles.containerP}>
                        {errors.ageMin && <p className={styles.pFormLines}>{errors.ageMin}</p>}
                        {errors.ageMax && <p className={styles.pFormLinesRight}>{errors.ageMax}</p>}
                    </div>
                    <label className={styles.formLabel}>Temperament</label>
                    <div className={styles.inlineTemperament}>
                        <SelectTemperament name='temperament' onChange={handleChange} />
                        <button className={styles.formButton} onClick={handleAddTemperament}>+</button>
                    </div>
                    {errors.temperament && <p className={styles.pForm}>{errors.temperament}</p>}
                    <div className={styles.selectedTemperaments}>
                        {selectedTemperaments.map((temp, index) => (
                            <span key={index} className={styles.selectedTemperament}>{temp}</span>
                        ))}
                    </div>
                    <label className={styles.formLabel}>Image</label>
                    <input className={styles.formInput} name='image' type="text" placeholder="URL" onChange={handleChanges} />
                    {errors.image && <p className={styles.pForm}>{errors.image}</p>}
                    <button className={styles.formButton} type="submit">Crear</button>
                    {(successAlert && <div className={styles.alert}>¡Dog created successfully!
                        <pre>
                            {`
 / \\__
    (    @\\___
    /         O
     /   (_____/   
/_____/   U
            `}
                        </pre>
                    </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default Form