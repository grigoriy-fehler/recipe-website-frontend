import View from './view.js'

export default class UserDetails extends View {
	constructor() {
		super()
	}
	
	update() {
		document.getElementById('user-delete-button').addEventListener('click', this.onDelete)
		document.getElementById('user-logout-button').addEventListener('click', this.onLogout)
	}

	onDelete() {
	}

	onLogout() {
		sessionStorage.clear()
		router.route('/')
	}

	html() {
		return `
			<style>
				.container {
					text-align: center;
					width: 30rem;
				}

				.container h1, h2 {
					margin: 0 0 2rem 0;
				}
		      	</style>
			<div class="container">
				<h1>${sessionStorage.getItem('username')}</h1>
				<button id="user-delete-button">Delete Account</button>
				<button id="user-logout-button">Logout</button>
			</div>
		`
	}
}