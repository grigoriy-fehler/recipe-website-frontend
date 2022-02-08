import View from './view.js'

export default class Contact extends View {
	constructor() {
		super()
	}

	html() {
		return `
			<div class="container">
				<h1>Contact</h1>
				<p>Grigoriy Fehler</p>
				<p>Schulstraße 26</p>
				<p>57636 Mammelzen</p>
				<p>Email: grigoriy@g-f.me</p>
				<p>Telefon: 01578 2248450</p>
			</div>
		`
	}
}