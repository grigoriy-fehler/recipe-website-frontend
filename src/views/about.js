import View from './view.js'

export default class About extends View {
	constructor() {
		super()
	}

	html() {
		return `
			<div class="container">
				<h1>About</h1>
			</div>
		`
	}
}