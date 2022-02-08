import View from './view.js'
import config from '../config.js'

export default class RecipeDetails extends View {
	constructor(data) {
		super()
		if (!data.name || !data.image || !data.author || !data.ingredients || !data.instructions) {
			this.html = function() { return '' }
			router.route('/')
		}
		this.name = data.name
		this.image = data.image
		this.author = data.author
		this.rating = data.rating
		this.ingredients = data.ingredients
		this.instructions = data.instructions
	}

	update() {
		const username = sessionStorage.getItem('username')
		if (username == this.author) {
			document.getElementById('recipe-delete-button').addEventListener('click', this.onDelete)
		}
	}

	async onDelete() {
		// TODO: Ask user for password
		const browserUrl = new URL(location)
		const search = browserUrl.search.replace('?', '')

		const url = `${config.apiBaseUrl}/recipes?${search}`
		const request = new Request(url, {
			'method': 'DELETE',
		})
		const response = await fetch(request)
		if (response.status == 200) {
			router.route('/')
		} else {
			error.innerText = 'Could not delete the Recipe!'
			error.style.display = 'block'
		}
	}

	canDelete() {
		const username = sessionStorage.getItem('username')
		if (username == this.author) {
			return '<button id="recipe-delete-button">Delete</button>'
		} else {
			return ''
		}
	}

	html() {
		return `
		<style>
		.container div {
			margin: 2rem 0;
			padding: 1rem 1rem;
			min-height: 3rem;
		}
		      
		.container ul, ol {
			margin: 1rem 0;
		}
		      
		.container ul li,
		.container ol li {
			padding: 0.4rem 0;
		}
		      
		.container h1 {
			margin-bottom: 2rem;
		}
		      
		.container img {
			width: 100%;
			max-height: 40rem;
			object-fit: cover;
			margin: 0 auto;
			border-radius: 0.8rem;
		}
		      
		.container #rating img {
			width: 4rem;
			height: 4rem;
		}
			
		.container #ingredients {
			border: solid 0.1rem var(--text-color);
			border-radius: 0.4rem;
		}
		      
		.container #ingredients ul li,
		.container #instructions ol li {
			margin: 0 5rem;
		}
		#error {
			display: none;
		}
		</style>

		<div class="container">
			<div id="error"></div>
			<h1>${this.name}</h1>
			<img src="${this.image}" alt="Picture of recipe">
			<div>
				<p>Author: ${this.author} &nbsp; Rating: ${this.rating}</p>
			</div>
			<div id="ingredients">
				<h2>Ingredients</h2>
				<ul>
  					${this.createIngredientsTemplate()}
				</ul>
			</div>
			<div id="instructions">
				<h2>Instructions</h2>
				<ol>
  					${this.createInstructionsTemplate()}
				</ol>
			</div>
			${this.canDelete()}
		</div>
	`
	}

	createIngredientsTemplate() {
		let str = ``
		this.ingredients.forEach(ingredient => {
			str = str.concat(`<li>${ingredient.name} - ${ingredient.amount} ${ingredient.type}</li>`)
		})
		return str
	}
	
	createInstructionsTemplate() {
		let str = ``
		this.instructions.forEach(instruction => {
			str = str.concat(`<li>${instruction}</li>`)
		})
		return str
	}
}