export const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false, // show all errors
            stripUnknown: true // remove unknown fields
        });
        if (error) {
            const err = new Error('Validation error: ');
            err.status = 400;
            err.code = 'VALIDATION_ERROR';
            err.errors = error.details.map(d => ({
                field: d.path.join('.'),
                message: d.message.replace(/"/g, '')
            }))
            console.log('error: ', error);
            next(err);
        }
        req[property] = value; // sanitized input
        console.log('value: ', value);
        console.log('request-property: ', req[property]);
        console.log('request-body: ', req.body);
        next();
    };
};
