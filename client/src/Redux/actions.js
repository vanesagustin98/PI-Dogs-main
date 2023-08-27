import { POST_DOG, FIND_DOG, DEATIL_DOG, FILTER, ORDER, ALL_DOGS, TEMPERAMENTS } from "./action_types";
import axios from 'axios'

export const allDogs = () => {
    const endpoint = 'http://localhost:3001/dogs';
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            dispatch({
                type: ALL_DOGS,
                payload: data,
            });
        } catch (error) {
            return { error: error.message };
        }
    };
};

export const findDog = (dog) => {
    let endpoint;
    if (dog === '') {
        endpoint = 'http://localhost:3001/dogs';
    } else {
        endpoint = 'http://localhost:3001/dogs/name?name=' + dog;
    }
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)
            return dispatch({
                type: FIND_DOG,
                payload: data,
            });
        } catch (error) {
            return { error: error.message }
        }
    };
};



export const detailDog = (id) => {
    const endpoint = 'http://localhost:3001/dogs/' + id;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)
            return dispatch({
                type: DEATIL_DOG,
                payload: data,
            })
        } catch (error) {
            return { error: error.message }
        }
    };

};

export const postDog = (dog) => {
    const endpoint = 'http://localhost:3001/dogs';
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, dog)
            return dispatch({
                type: POST_DOG,
                payload: data,
            });
        } catch (error) {
            return { error: error.message }
        }
    };
};


export const allTemperaments = () => {
    const endpoint = 'http://localhost:3001/temperaments';
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)
            return dispatch({
                type: TEMPERAMENTS,
                payload: data,
            });
        } catch (error) {
            return { error: error.message }
        }
    };
};



export const filter = (obj) => {
    return {
        type: FILTER,
        payload: obj
    }
}

export const order = (id) => {
    return {
        type: ORDER,
        payload: id
    }
}