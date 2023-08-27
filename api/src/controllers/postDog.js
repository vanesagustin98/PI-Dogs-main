const { Dog, Temperament } = require('../db.js');
async function postDog(req, res) {
    try {
        const { weight, height, name, life_span, image, temperament} = req.body
        if (!weight || !height || !name ||  !life_span || !image ||!temperament) {
            return res.status(404).send('Faltan datos');
        }

        const temperaments = await Temperament.findAll()
        console.log(temperaments);
        const [dog, created] = await Dog.findOrCreate({
            where: { name },
            defaults: {
                weight,
                height,
                life_span,
                temperament,
                image,
            }
        });

        await dog.addTemperaments(temperaments)
        res.status(200).json(dog)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = postDog
