const axios = require("axios");
require('dotenv').config();
const { API_KEY, API, URL_IMAGE } = process.env;
const { Dog, Temperament } = require('../db.js');

async function getAllDogs() {
    try {
        const { data } = await axios.get(`${API}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        const apiDogs = await data.map((dog) => {

            let imageUrl;
            imageUrl = URL_IMAGE + dog.reference_image_id + ".jpg";
            return {
                id: dog.id,
                name: dog.name,
                weight: dog.weight.metric,
                height: dog.height.metric,
                life_span: dog.life_span,
                temperament: dog.temperament,
                image: imageUrl,
                origin: 'API'
            }
            
        })
        
        const dbDogs = await Dog.findAll({
            include:[{
                model: Temperament,
                attributes: [ "name"],
                through:{
                    attributes: [],
                }
            }]
        }).then(dogs => dogs.map(dog => ({
            ...dog.dataValues,
            temperament: dog.temperaments.map(temp => temp.name).join(', ')
        })));
        
        const dogs = [...apiDogs, ...dbDogs];

        return dogs;

    } catch (error) {
        throw error;
    }
}

module.exports = getAllDogs;
