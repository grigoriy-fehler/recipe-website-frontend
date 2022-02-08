import View from './view.js'
import config from '../config.js'

export default class UserRegister extends View {
	constructor() {
		super()
	}

	update() {
		document.getElementById('submit').addEventListener('click', this.onSubmit)
	}

	async onSubmit(event) {
		event.preventDefault()
		const username = document.getElementById('username').value
		const password1 = document.getElementById('password1').value
		const password2 = document.getElementById('password2').value

		const error = document.getElementById('error')
		error.style.display = 'none'
		if (!username) {
			console.log(error)
			error.innerText = 'Username Required!'
			error.style.display = 'block'
			return
		}

		if (!password1 || !password2) {
			error.innerText = 'Both Passwords are Required!'
			error.style.display = 'block'
			return
		}

		if (password1 !== password2) {
			error.innerText = 'You Entered different Passwords!'
			error.style.display = 'block'
			return
		}

		const user = {
			'username': username,
			'password1': password1,
			'password2': password2
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
						<label for="username">Username:</label>
						<input type="text" id="username" name="username" placeholder="Username">
					</div>
					<div class="form-group">
						<label for="password1">Password:</label>
						<input type="password" name="password1" id="password1" placeholder="Password">
						<label for="password2">Re-enter Password:</label>
						<input type="password" name="password2" id="password2" placeholder="Re-enter Password" [(ngModel)]="user.password">
					</div>
					<button type="submit" id="submit">Register</button>
				</form>
				<a href="/user-login" data-link="/user-login">log in instead</a>
			</div>
		`
	}
}