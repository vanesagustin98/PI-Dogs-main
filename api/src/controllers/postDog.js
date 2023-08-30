const { Dog, Temperament } = require('../db.js');
async function postDog(req, res) {
    try {
        const { weight, height, name, life_span, image, temperament } = req.body
        if (!weight || !height || !name ||  !life_span || !image ||!temperament) {
            return res.status(404).send('Faltan datos');
        }

        const [dog, created] = await Dog.findOrCreate({
            where: { name },
            defaults: {
                weight,
                height,
                life_span,
                image
            }
        });
        const selectedTemperaments = await Temperament.findAll({
            where: { name: temperament },
        });

        await dog.addTemperaments(selectedTemperaments)
        res.status(200).json(dog)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = postDog