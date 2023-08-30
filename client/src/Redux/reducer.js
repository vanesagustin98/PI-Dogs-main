import { POST_DOG, FIND_DOG, DEATIL_DOG, FILTER, ORDER, ALL_DOGS, TEMPERAMENTS, NEXT_PAGE, PREV_PAGE, SET_CURRENT_PAGE } from "./action_types";

const initialState = {
    myDogs: [],
    dogDetail: [],
    allDogs: [],
    temperaments: [],
    currentPage: 1
}

const avg = (dog) => {
    let numbersArray = [];
    let promedio;
    if (typeof dog.weight === 'string') {
        const extractedNumbers = dog.weight.match(/\d+/g);
        if (extractedNumbers) {
            numbersArray = extractedNumbers.map(Number);
            const sum = numbersArray.reduce((acc, num) => acc + num, 0);
            promedio = numbersArray.length > 0 ? sum / numbersArray.length : 0;
        } else {
            promedio = 101;
        }
    } else if (typeof dog.weight === 'number' && !isNaN(dog.weight)) {
        promedio = dog.weight;
    }
    return promedio;
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_DOGS:
            return { ...state, myDogs: action.payload, allDogs: action.payload };

        case DEATIL_DOG:
            return { ...state, dogDetail: action.payload };

        case FIND_DOG:
            return { ...state, myDogs: action.payload, allDogs: action.payload };

        case POST_DOG:
            return { ...state };

        case TEMPERAMENTS:
            return { ...state, temperaments: action.payload };

        case FILTER:
            let filteredDogs

            if (action.payload === 'DB' || action.payload === 'API') {
                filteredDogs = action.payload === 'all' ? state.allDogs : state.allDogs.filter(dog => dog.origin === action.payload);
            } else {
                filteredDogs = action.payload === 'all' ? state.allDogs : state.allDogs.filter(dog =>
                    dog.temperament && dog.temperament.includes(action.payload)
                );
            }

            return {
                ...state,
                myDogs: filteredDogs,
            };

        case ORDER:
            let sorter
            if (action.payload === 'AA') {
                sorter = (a, b) => a.name.localeCompare(b.name)
            }
            if (action.payload === 'DA') {
                sorter = (a, b) => b.name.localeCompare(a.name)
            }
            if (action.payload === 'AP') {
                sorter = (a, b) => avg(a) - avg(b)
            }
            if (action.payload === 'DP') {
                sorter = (a, b) => avg(b) - avg(a)
            }
            const copyOrder = [...state.myDogs].sort(sorter)

            return { ...state, myDogs: copyOrder }


        case NEXT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1,
            };

        case PREV_PAGE:
            return {
                ...state,
                currentPage: state.currentPage - 1,
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };

        default:
            return state
    }
}

export default reducer