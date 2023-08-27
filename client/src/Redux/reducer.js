import { POST_DOG, FIND_DOG, DEATIL_DOG, FILTER, ORDER, ALL_DOGS, TEMPERAMENTS } from "./action_types";

const initialState = {
    myDogs: [],
    dogDetail: [],
    allDogs: [],
    temperaments: []
}

const avg = (dog) => {
    const [min, max] = dog.weight.split(' - ').map(Number);
    return (min + max) / 2;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_DOGS:
            return { ...state, myDogs: action.payload, allDogs: action.payload };

        case DEATIL_DOG:
            return { ...state, dogDetail: action.payload };

        case FIND_DOG:
            return { ...state, myDogs: action.payload, allDogs: action.payload };

        case POST_DOG:
            return { ...state};

        case TEMPERAMENTS:
            return { ...state, temperaments: action.payload };

        case FILTER:
            if (action.payload === 'DB' || action.payload === 'API') {
                const copyFilter = [...state.allDogs].filter((dog) => dog.origin === action.payload);
                const filterCharacter = action.payload === 'all' ? state.allDogs : copyFilter;
                return {
                    ...state,
                    myDogs: filterCharacter,
                };
            }

            const copyFilter = [...state.allDogs].filter((dog) =>
                dog.temperament ? dog.temperament.includes(action.payload) : null
            );
            const filterCharacter = action.payload === 'all' ? state.allDogs : copyFilter;
            return {
                ...state,
                myDogs: filterCharacter,
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

        default:
            return state
    }
}

export default reducer