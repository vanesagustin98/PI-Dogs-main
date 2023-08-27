const getAllDogs = require ('../controllers/getAllDogs.js');

async function getDogByQuery(req, res) {
    try {
        const { name } = req.query;
        const allDogs = await getAllDogs()

        if (name) {
            const dog = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            console.log(dog);
            res.status(200).json(dog);
        } else {
            res.status(404).send('faltan datos');
        }
    } catch (error) {
        res.status(500).send(error.message );
    }
}

module.exports = getDogByQuery;
