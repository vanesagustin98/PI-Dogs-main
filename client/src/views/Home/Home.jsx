import CardsContainer from "../../Components/CardsContainer/CardsContainer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { allDogs, filter, order } from "../../Redux/actions"
import SelectTemperament from "../../Components/SelectTemperament/SelectTemperament"
import styles from './Home.module.css';

const Home = () => {
    const dogs = useSelector(state => state.myDogs);
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 9;
    const totalPages = Math.ceil(dogs.length / dogsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allDogs())
    }, [dispatch])

    function handleOrder(event) {
        dispatch(order(event.target.value))
    }

    function handleFilterTemperament(event) {
        dispatch(filter(event.target.value))
    }

    function handleFilterOrigin(event) {
        dispatch(filter(event.target.value))
    }

    function handlePrevPage() {
        setCurrentPage(currentPage - 1);
    }

    function handleNextPage() {
        setCurrentPage(currentPage + 1);
    }
    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.header}>DOGS</h1>
            <div className={styles.selectRow}>

                <div className={styles.selectContainer}>
                    <select className={styles.selectDropdown} onChange={handleOrder} defaultValue="">
                        <option key={''} selected disabled value="">Alphabetical</option>
                        <option key={'AA'} value="AA">Ascendente</option>
                        <option key={'DA'} value="DA">Descendente</option>
                    </select>
                </div>
                <div className={styles.selectContainer}>
                    <select className={styles.selectDropdown} onChange={handleOrder} defaultValue="">
                        <option key={''} selected disabled value="">Weight</option>
                        <option key={'AP'} value="AP">Ascendente</option>
                        <option key={'DP'} value="DP">Descendente</option>
                    </select>
                </div>
                <SelectTemperament onChange={handleFilterTemperament} />
                <div className={styles.selectContainer}>
                    <select className={styles.selectDropdown} onChange={handleFilterOrigin}>
                        <option key={''} selected disabled value="">Origin</option>
                        <option key={'all'} value="all">Todos</option>
                        <option key={'API'} value="API">Api</option>
                        <option key={'DB'} value="DB">Base de datos</option>
                    </select>
                </div>

            </div>
            <CardsContainer currentPage={currentPage} dogsPerPage={dogsPerPage} dogs={dogs} />
            <div className={styles.buttonsContainer}>
                <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>
                    Página anterior
                </button>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={styles.paginationButton}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </button>
                ))}
                <button
                    className={styles.paginationButton}
                    onClick={handleNextPage}
                    disabled={currentPage * dogsPerPage >= dogs.length}
                >
                    Página siguiente
                </button>
            </div>
        </div>
    );
}

export default Home