import Card from '../Card/Card';
import styles from './CardsContainer.module.css';

export default function CardsContainer({ currentPage, dogsPerPage, dogs }) {


    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

    return (
        <div className={styles.divCards}>
            {currentDogs.map((dog) => (
                <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    weight={dog.weight}
                    temperament={dog.temperament}
                    image={dog.image}
                />
            ))}
        </div>
    );
}
