const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs')
const getDogById = require('../controllers/getDogById')
const getDogByQuery = require('../controllers/getDogByQuery')
const postDog = require('../controllers/postDog')
const getTemperament = require('../controllers/getTemperament')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', async (req, res) => {
    try {
        const dogs = await getAllDogs();
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/dogs/name', getDogByQuery)
router.get('/dogs/:idRaza', getDogById)
router.post('/dogs', postDog)
router.get('/temperaments', getTemperament)


module.exports = router;
