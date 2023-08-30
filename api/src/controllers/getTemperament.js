const axios = require('axios');
const { Temperament } = require('../db.js');
require('dotenv').config();
const { API_KEY, API } = process.env;

async function getTemperament(req, res) {
    try {
        const { data } = await axios.get(`${API}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const temperaments = [];
        await data.map(dog => {
            if (dog.temperament) {
                dog.temperament.split(', ').forEach(temp => {
                    if (!temperaments.includes(temp)) {
                        temperaments.push(temp);
                    }
                });
            }
        });
        const temperamentsDB = await Promise.all(temperaments.map(async temp => {
            const [temperament, created] = await Temperament.findOrCreate({
                where: { name: temp },
                defaults: { name: temp }
            });
            return temperament;
        }));
        res.status(200).json(temperamentsDB);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = getTemperament
