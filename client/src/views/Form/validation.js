export default function validate(data) {
    const errors = {};
    if (!/^[A-Za-z]+$/.test(data.name)) errors.name = 'Dog breed must contain only letters';
    if (!data.name) errors.name = 'Dog breed cannot be empty';

    if (!data.weightMin) errors.weightMin = 'Minimum size cannot be empty';
    if (data.weightMin > 100) errors.weightMin = 'The dog cannot weigh more than 100 kg';

    if (!data.weightMax) errors.weightMax = 'Maximum size cannot be empty';
    if (data.weightMax > 100) errors.weightMax = 'The dog cannot weigh more than 100 kg';

    if (!data.heightMin) errors.heightMin = 'Minimum height cannot be empty';
    if (data.heightMin > 100) errors.heightMin = 'The dog cannot measure more than 100cm';

    if (!data.heightMax) errors.heightMax = 'Maximum height cannot be empty';
    if (data.heightMax > 100) errors.heightMax = 'The dog cannot measure more than 100cm';

    if (!data.ageMin) errors.ageMin = 'Minimum age cannot be empty';
    if (data.ageMin > 20) errors.ageMin = 'The age of the dog cannot be older than 20 years';

    if (!data.ageMax) errors.ageMax = 'Maximum age cannot be empty';
    if (data.ageMax > 20) errors.ageMax = 'The age of the dog cannot be older than 20 years';

    if (!data.temperament) errors.temperament = 'The dog must have at least one temperament';

    if (!data.image) errors.image = 'You must add an image';
    if (!/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(data.image)) errors.image = 'invalid URL'

    return errors;
}
