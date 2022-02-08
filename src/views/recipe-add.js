import View from './view.js'
import config from '../config.js'

// TODO: Check form data before sending to api.
//   Writing <img src='x' onerror='alert(1)'> in a text form will execute the
//   function when the recipe is loaded by user

export default class RecipeAdd extends View {
	constructor() {
		super()
	}

	update() {
		document.getElementById('submit').addEventListener('click', this.onSubmit)
		document.getElementById('add-ingredient').addEventListener('click', this.onIngredientAdd)
		document.getElementById('add-instruction').addEventListener('click', this.onInstructionAdd)
	}

	onIngredientAdd(event) {
		const ingredient = document.createElement('div')
		ingredient.classList.add('ingredient')
		ingredient.innerHTML = `
			<label class="name">
				Name:
				<input type="text" class="input-ingredient-name">
			</label>
			<label class="amount">
				Amount:
				<input type="number" class="input-ingredient-amount">
			</label>
			<label class="type">
				Type:
				<select class="input-ingredient-type">
					<optgroup label="Type">
						<option value="gram">gram</option>
						<option value="tbs">tbs</option>
						<option value="tsp">tsp</option>
						<option value="cub">cub</option>
						<option value="pieces">pieces</option>
					</optgroup>
				</select>
			</label>
		`
		document.getElementById('ingredients-container').appendChild(ingredient)
	}

	onInstructionAdd(event) {
		const instruction = document.createElement('div')
		instruction.innerHTML = `<textarea rows="3" cols="20" class="input-instruction"></textarea>`
		document.getElementById('instructions').appendChild(instruction)
	}

	onSubmit(event) {
		event.preventDefault()

		const name = document.getElementById('input-name').value
		if (!name) {
			error.innerText = 'Recipe Name Required!'
			error.style.display = 'block'
			return
		}

		const author = sessionStorage.getItem('username')
		if (!author) {
			error.innerText = 'Login to Create a New Recipe!'
			error.style.display = 'block'
			return
		}

		const cookingTime = document.getElementById('input-cooking-time').value
		if (!cookingTime) {
			error.innerText = 'Cooking Time Required!'
			error.style.display = 'block'
			return
		}

		const difficulty = document.getElementById('input-difficulty').value
		if (!difficulty) {
			error.innerText = 'Difficulty Required!'
			error.style.display = 'block'
			return
		}

		const servings = document.getElementById('input-servings').value
		if (!servings) {
			error.innerText = 'Servings Required!'
			error.style.display = 'block'
			return
		}

		const inputIngredientNames = document.getElementsByClassName('input-ingredient-name')
		const inputIngredientAmounts = document.getElementsByClassName('input-ingredient-amount')
		const inputIngredientTypes = document.getElementsByClassName('input-ingredient-type')
		const ingredients = []
		for (let i = 0; i < inputIngredientNames.length; i++) {
			const name = inputIngredientNames[i].value
			const amount = inputIngredientAmounts[i].value
			const type = inputIngredientTypes[i].value

			if (!name || !amount || !type)
				continue

			const ingredient = {
				'name': name,
				'amount': amount,
				'type': type
			}

			ingredients.push(ingredient)
		}
		if (ingredients.length < 1) {
			error.innerText = 'Ingredients Required!'
			error.style.display = 'block'
			return
		}

		const inputInstructions = document.getElementsByClassName('input-instruction')
		const instructions = []
		for (let i = 0; i < inputInstructions.length; i++) {
			const instruction = inputInstructions[i].value

			if (!instruction)
				continue
			
			instructions.push(instruction)
		}
		if (instructions.length < 1) {
			error.innerText = 'Instructions Required!'
			error.style.display = 'block'
			return
		}

		const inputImage = document.getElementById('input-image')
		const image = inputImage.files[0]
		if (!image) {
			error.innerText = 'Image Required!'
			error.style.display = 'block'
			return
		}
		const reader = new FileReader();
		reader.readAsDataURL(image)

		reader.onloadend = async function() {
			const recipe = {
				'name': name,
				'author': author,
				'image': reader.result,
				'cookingTime': cookingTime,
				'difficulty': difficulty,
				'servings': servings,
				'instructions': instructions,
				'ingredients': ingredients,
			}

			const headers = new Headers()
			headers.append('Content-Type', 'application/json')

			const url = `${config.apiBaseUrl}/recipes`
			const request = new Request(url, {
				'method': 'POST',
				'headers': headers,
				'body': JSON.stringify(recipe)
			})

			try {
				const response = await fetch(request)
				const data = await response.json()
	
				if (response.status == 200) {
					router.route('/')
				} else {
					error.innerText = data.error
					error.style.display = 'block'
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	html() {
		return `
		<style>
			.container {
				margin: 2rem auto;
				padding: 1rem 2rem;
				min-width: 30rem;
				width: 50vw;
				border-radius: 0.6rem;
				box-shadow: 0.1rem 0.2rem 0.5rem 0.1rem;
			}

			.container form {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 1rem;
			}

			.container form #error {
				grid-column: 1 / -1;
				display: none;
			}
	      
			.container form h1 {
				grid-column: 1 / -1;
			}
	      
			.container form h2 {
				grid-column: 1 / -1;
			}

			.container form label {
				width: 100%;
				grid-column: 1 / -1;
			}

			.container form #name {
				max-width: 100%;
				grid-column: 1 / 3;
			}

			.container form #image {
				grid-column: 3 / -1;
			}

			.container form #cooking-time {
				grid-column: 1 / 2;
			}

			.container form #servings {
				grid-column: 2 / 3;
			}

			.container form #difficulty {
				grid-column: 3 / 4;
			}

			.container form #ingredients-container {
				grid-column: 1 / -1;
			}

			.container form .ingredient {
				grid-column: 1 / -1;
				display: grid;
				grid-template-columns: repeat(3, 1fr) 2rem;
				gap: 1rem;
				align-items: center;
			}

			.container form .ingredient label {
				margin: 0 1rem;
			}

			.container form .ingredient .name {
				grid-column: 1 / 2;
			}

			.container form .ingredient .amount {
				grid-column: 2 / 3;
			}

			.container form .ingredient .type {
				grid-column: 3 / 4;
			}

			.container form #instructions {
				grid-column: 1 / -1;
			}

			.container form #add-ingredient,
			.container form #add-instruction {
				grid-column: 1 / -1;
				margin: auto;
				padding: 0.2rem;
				width: 1.5rem;
				text-align: center;
				border-radius: 100%;
				border: solid 0.1rem var(--text-color);
				transition: 0.3s;
			}

			.container form #add-ingredient:hover,
			.container form #add-instruction:hover {
				cursor: pointer;
				border-color: var(--primary-color-light);
				background-color: var(--primary-color-light);
			}
		</style>

		<div class="container">
			<form>
				<div id="error"></div>
				<h1>Add a new Recipe</h1>
				<label id="name">
					Recipe Name:
					<input type="text" name="name" id="input-name" autofocus>
				</label>
				<label id="image">
					Image:
					<input type="file" name="image" id="input-image">
				</label>
				<label id="cooking-time">
					Cooking Time:
					<input type="number" name="cooking-time" id="input-cooking-time">
				</label>
				<label id="servings">
					Servings:
					<input type="number" name="servings" id="input-servings">
				</label>
				<label id="difficulty">
					Difficulty:
					<select name="difficulty" id="input-difficulty">
						<optgroup label="Difficulty">
							<option [ngValue]="1">1 - very easy</option>
							<option [ngValue]="2">2 - easy</option>
							<option [ngValue]="3">3 - normal</option>
							<option [ngValue]="4">4 - hard</option>
							<option [ngValue]="5">5 - very hard</option>
						</optgroup>
					</select>
				</label>
				<h2>Ingredients</h2>
				<div id="ingredients-container">
					<div class="ingredient">
						<label class="name">
							Name:
							<input type="text" class="input-ingredient-name">
						</label>
						<label class="amount">
							Amount:
							<input type="number" class="input-ingredient-amount">
						</label>
						<label class="type">
							Type:
							<select class="input-ingredient-type">
								<optgroup label="Type">
									<option value="gram">gram</option>
									<option value="tbs">tbs</option>
									<option value="tsp">tsp</option>
									<option value="cub">cub</option>
									<option value="pieces">pieces</option>
								</optgroup>
							</select>
						</label>
					</div>
				</div>
				<img src="/assets/plus.svg" alt="add icon" id="add-ingredient">
				<h2>Instructions</h2>
				<div id="instructions">
					<div>
						<textarea rows="3" cols="20" class="input-instruction"></textarea>
					</div>
				</div>
				<img src="/assets/plus.svg" alt="add icon" id="add-instruction">
				<button type="submit" id="submit">Submit</button>
			</form>
		</div>
	`
	}
}
