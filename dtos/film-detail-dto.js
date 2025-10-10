class FilmDetailDto {
    constructor(film = {}) {
        const {id, title, description, length, releaseYear, special_features,rating, film_actor, film_category} = film;
        this.id = id ?? null;
        this.title = title ?? '-';
        this.releaseYear = releaseYear ?? '-';
        this.rating = rating ?? '-';
        this.description = description ?? '-';
        this.length = length ?? '-';
        this.specialFeatures = special_features ?? '-';
        if (film_actor) {
            this.actors = film_actor.map(actor => {
                return {
                    id: actor.actor_id,
                    name: actor.actor.first_name.charAt(0) + actor.actor.first_name.slice(1).toLowerCase()
                        + ' ' + actor.actor.last_name.charAt(0) + actor.actor.last_name.slice(1).toLowerCase()
                }
            });
        }
        if (film_category) {
            this.categories = film_category.map(category => {
                return {
                    id: category.category_id,
                    name: category.category.name,
                }
            })
        }
    }
}
module.exports = FilmDetailDto;