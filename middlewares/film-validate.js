export const validateFilm = (req, res, next) => {
    let {title, description, releaseYear, rating, length,
        specialFeatures, actors, categories } = req.body;
    const validateErrors = [];
    title = title?.trim();
    description = description?.trim();
    releaseYear = Number(releaseYear) ;
    const currentYear = new Date().getFullYear();
    if (!title)
        validateErrors.push({title : 'Title is required'});
    else if (title.length < 4)
        validateErrors.push({title :'Title must be at least 3 characters'});
    if(!releaseYear || isNaN(releaseYear) || releaseYear < 1900
        || releaseYear > currentYear)
        validateErrors.push({releaseYear :
                `Release year must be a number between 1900,${currentYear}`});
    if (validateErrors.length > 0) {
        const err = new Error('Validation error');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        err.errors = validateErrors;
        return next(err);
    }
    delete req.body['releaseYear'];  // why?
    req.body.language_id = 1;
    req.body.release_year = releaseYear;
    next();
}