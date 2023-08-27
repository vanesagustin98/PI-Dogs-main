const getAllDogs = require ('../controllers/getAllDogs.js');

async function getDogById(req,res) {
    try {
        const {idRaza} = req.params
        let allDogs = await getAllDogs()
        const dog = await allDogs.find((dog) => dog.id == idRaza)
        if (dog) {
            res.status(200).json(dog);
        } else {
            res.status(404).send('No se encontró una raza de perro con ese ID');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getDogById