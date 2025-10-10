import joi from 'joi'
const filmRating = {
    G:'G',
    PG: 'PG',
    PG_13: 'PG_13',
    R: 'R',
    NC_17: 'NC_17',
}
export const filmSchema = joi.object({
    title: joi.string().trim()
        .min(3).max(128).required()
        .messages({
            'string.min': 'Title >= 3 characters' ,
            'string.max': 'Title <= 128 characters' ,
            'any.required': 'Title is required'
        }),
    releaseYear: joi.number().integer()
        .min(1900)
        .max(new Date().getFullYear())
        .optional(),
    rating: joi.string().valid(...Object.keys(filmRating)).optional(),
        language: joi.number().integer().min(1).optional().default(1),
        description: joi.string().optional(),
        actors: joi.array().items(joi.object({})).optional(),
        length: joi.number().integer().min(30).optional(),
        stripUnknown: true
})

export const filmQuerySchema = joi.object({
    page: joi.number().integer().min(1).default(1),
    pageSize: joi.number().integer().min(5).max(30).default(10),
    sortBy: joi.string()
        .pattern(/^[a-zA-Z_]+:(asc|desc)$/)
        .message('Sort must be in format field:asc or field:desc')
        .default('id:asc'),
});
