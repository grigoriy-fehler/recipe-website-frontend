import View from './view.js'

export default class Privacy extends View {
	constructor() {
		super()
	}

	html() {
		return `
			<div class="container">
				<h1>Privacy Policy</h1>
				<p>No personal data is collected or stored.</p>
			</div>
		`
	}
}