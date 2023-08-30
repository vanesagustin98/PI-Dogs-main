import CardsContainer from "../../Components/CardsContainer/CardsContainer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, } from "react"
import { allDogs, filter, order, prevPage, nextPage, setCurrentPage } from "../../Redux/actions"
import SelectTemperament from "../../Components/SelectTemperament/SelectTemperament"
import styles from './Home.module.css';

const Home = () => {
    const dogs = useSelector(state => state.myDogs);
    const dogsPerPage = 9;
    const totalPages = Math.ceil(dogs.length / dogsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allDogs())
    }, [dispatch])

    function handleOrder(event) {
        dispatch(order(event.target.value));
        dispatch(setCurrentPage(1));
    }

    function handleFilter(event) {
        dispatch(filter(event.target.value));
        dispatch(setCurrentPage(1));
    }

    function handlePrevPage() {
        dispatch(prevPage());
    }

    function handleNextPage() {
        dispatch(nextPage());
    }

    const currentPage = useSelector(state => state.currentPage);
    return (
        <div className={styles.homeContainer}>
            <div className={styles.containerHeader}>
                <h1 className={styles.header}>DOGS</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.orders}>
                    <h2>Orders</h2>
                    <div className={styles.selectRow}>
                        <select className={styles.selectDropdown} onChange={handleOrder} defaultValue="">
                            <option disabled value="">Alphabetical</option>
                            <option value="AA">Upward</option>
                            <option value="DA">Falling</option>
                        </select>
                        <select className={styles.selectDropdown} onChange={handleOrder} defaultValue="">
                            <option disabled value="">Weight</option>
                            <option value="AP">Upward</option>
                            <option value="DP">Falling</option>
                        </select>
                    </div>
                </div>
                <div className={styles.orders}>
                    <h2>Filters</h2>
                    <div className={styles.selectRow}>
                        <SelectTemperament onChange={handleFilter} />
                        <select className={styles.selectDropdown} onChange={handleFilter} defaultValue="">
                            <option disabled value="">Origin</option>
                            <option value="all">All</option>
                            <option value="API">Api</option>
                            <option value="DB">Database</option>
                        </select>
                    </div>
                </div>
            </div>
            <CardsContainer currentPage={currentPage} dogsPerPage={dogsPerPage} dogs={dogs} />
            <div className={styles.buttonsContainer}>
                <button
                    className={styles.paginationButton}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >Previous
                </button>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        className={`${styles.paginationButton} ${currentPage === number ? styles.currentPageButton : ''}`}
                        onClick={() => dispatch(setCurrentPage(number))}
                    >
                        {number}
                    </button>
                ))}
                <button
                    className={styles.paginationButton}
                    onClick={handleNextPage}
                    disabled={currentPage * dogsPerPage >= dogs.length}
                >Next
                </button>
            </div>
        </div>
    );
}

export default Home