import View from './view.js'
import config from '../config.js'

export default class UserLogin extends View {
	constructor() {
		super()
	}

	update() {
		document.getElementById('submit').addEventListener('click', this.onSubmit)
	}

	async onSubmit(event) {
		event.preventDefault()
		const username = document.getElementById('username').value
		const password = document.getElementById('password').value

		const error = document.getElementById('error')
		error.style.display = 'none'
		if (!username) {
			error.innerText = 'Username Required!'
			error.style.display = 'block'
			return
		}

		if (!password) {
			error.innerText = 'Password Required!'
			error.style.display = 'block'
			return
		}

		const user = {
			'username': username,
			'password': password
		}

		const headers = new Headers()
		headers.append('Content-Type', 'text/plain')

		const url = `${config.apiBaseUrl}/users`
		const request = new Request(url, {
			'method': 'POST',
			'headers': headers,
			'body': JSON.stringify(user)
		})

		try {
			const response = await fetch(request)
			const data = await response.json()
			const resUsername = typeof(data.username) == 'string' &&
				data.username.trim().length > 0 ?
				data.username.trim() : null

			if (resUsername) {
				sessionStorage.setItem('username', resUsername)
				router.route('/')
			} else {
				error.innerText = data.error
				error.style.display = 'block'
			}
		} catch (error) {
			console.log(error)
		}
	}

	html() {
		return `
			<style>
				.container {
					width: 30rem;
				}
				#error {
					display: none;
				}
			</style>

			<div class="container">
				<form>
					<div id="error"></div>
					<div class="form-group">
						<label for="username">Username</label>
						<input type="text" name="username" id="username" placeholder="Username">
					</div>
					<div class="form-group">
						<label for="password">Password</label>
						<input type="password" name="password" id="password" placeholder="Password">
					</div>
					<button type="submit" id="submit">Log in</button>
				</form>
				<a href="/user-register" data-link="/user-register">register instead</a>
			</div>
		`
	}
}