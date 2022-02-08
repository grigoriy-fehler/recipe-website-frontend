import View from './view.js'

export default class RecipeList extends View {
	constructor(data) {
		super()
		this.recipes = data
	}

	html() {
		return `
			<style>
				#container {
					padding: 2rem;
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(30rem, auto));
					gap: 4rem 2rem;
				}
				
				#container .recipe {
					width: 30rem;
					height: 50rem;
					border-radius: 2rem;
					justify-self: center;
					box-shadow: 0.1rem 0.2rem 1rem 0.1rem;
					overflow: hidden;
				}
				
				#container .recipe img {
					width: 30rem;
					height: 20rem;
					object-fit: cover;
				}
				
				#container .recipe h2 {
					text-align: center;
					padding: 0.5rem 0;
					font-size: 2rem;
					border-bottom: solid 0.1rem var(--text-color);
				}
				
				#container .recipe ul {
					list-style: none;
					height: 10rem;
				}
				
				#container .recipe ul li {
					float: left;
					margin: 0.5rem 0 0 0.5rem;
					padding: 0.2rem 0.6rem;
					font-size: 1.2rem;
					border: solid 0.2rem var(--primary-color-light);
					border-radius: 2rem;
					color: var(--text-color-dark);
					background-color: var(--primary-color-light);
				}

				#container .recipe {
					cursor: pointer;
				}
			</style>
			<div id="container">
				${this.createRecipeTemplate()}
			</div>
		`
	}

	createRecipeTemplate() {
		let str = ``
		try {
			this.recipes.forEach(recipe => {
				str = str.concat(`
					<div class="recipe" data-link="/recipe-details?${recipe.id}">
						<img src="${recipe.image}" alt="Picture of Recipe">
						<h2>${recipe.name}</h2>
						<ul>${this.createIngredientTemplate(recipe.ingredients)}</ul>
					</div>
				`)
			})
		} catch (error) {
			console.log("No Recipes Found!")
		}
		return str
	}

	createIngredientTemplate(ingredients) {
		let str = ``
		try {
			ingredients.forEach(ingredient => {
				str = str.concat(`<li>${ingredient.name}</li>`)
			})
		} catch (error) {
			console.log("No Ingredients Found!")
		}
		return str
	}
}