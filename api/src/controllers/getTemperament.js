const axios = require('axios');
const { Temperament } = require('../db.js');
require('dotenv').config();
const { API_KEY, API } = process.env;
async function getTemperament(req,res) {
    try {
        const result = await axios.get(`${API}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const temperaments = [];
        await result.data.map(dog => {
            if (dog.temperament) {
                dog.temperament.split(', ').forEach(temp => {
                    if (!temperaments.includes(temp)) {
                        temperaments.push(temp);
                    }
                });
            }
        });
        const temperamentsDB = await Temperament.bulkCreate(temperaments.map(temp => ({ name: temp })))
        res.status(200).json(temperamentsDB);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = getTemperament