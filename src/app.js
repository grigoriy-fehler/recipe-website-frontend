import handlers from './handlers.js'

const app = {}

window.router = {}

router.route = function(url) {
	history.pushState(null, null, url)
	app.init()
}

router.routes = {
	'about': handlers.about,
	'recipe-details': handlers['recipe-details'],
	'recipe-list': handlers['recipe-list'],
	'user-login': handlers['user-login'],
	'user-register': handlers['user-register'],
	'contact': handlers.contact,
	'privacy': handlers.privacy,
}

app.setUser = function() {
	const username = sessionStorage.getItem('username')
	if (username) {
		document.getElementById('login').style.display = 'none'
		document.getElementById('nav-user-login').style.display = 'none'
		document.getElementById('nav-user-register').style.display = 'none'
		document.getElementById('nav-recipe-add').style.display = 'block'
		const currentUser = document.getElementById('current-user')
		currentUser.style.display = 'block'
		currentUser.innerText = username
		router.routes['recipe-add'] = handlers['recipe-add']
		router.routes['user-details'] = handlers['user-details']
		delete router.routes['user-login']
		delete router.routes['user-register']
	} else {
		document.getElementById('login').style.display = 'block'
		document.getElementById('nav-user-login').style.display = 'block'
		document.getElementById('nav-user-register').style.display = 'block'
		document.getElementById('nav-recipe-add').style.display = 'none'
		const currentUser = document.getElementById('current-user')
		currentUser.style.display = 'none'
		delete router.routes['recipe-add']
		delete router.routes['user-details']
		router.routes['user-login'] = handlers['user-login']
		router.routes['user-register'] = handlers['user-register']
	}
}

app.init = function() {
	app.setUser()

	const url = new URL(location)

	const pathname = url.pathname.replace(/^\/+|\/+$/g, '')
	const hasRoute = typeof(router.routes[pathname]) !== 'undefined'
	const search = url.search.replace('?', '')

	let route = hasRoute ? router.routes[pathname] : router.routes['recipe-list']
	route(search).then(view => {
		document.getElementById('app').innerHTML = view.html()
		view.update()
	})
}

app.isSidenavActive = false
app.toggleSidenav = function() {
	if (app.isSidenavActive)
		document.getElementById('nav').style.visibility = none
	app.isSidenavActive = !app.isSidenavActive
}

window.addEventListener('popstate', app.init)

document.addEventListener('DOMContentLoaded', () => {
	// Toggle Sidenav
	document.getElementById('sidenav-menu').onclick = () => {
		document.getElementById('nav').style.display = "block"
	}
	document.getElementById('sidenav-close').onclick = () => {
		document.getElementById('nav').style.display = 'none'
	}

	// Handle Data-Links
	document.body.addEventListener('click', event => {
		const hasDataLink = typeof(event.target.attributes['data-link']) !== 'undefined'

		if (!hasDataLink) 
			return

		event.preventDefault();
		router.route(event.target.attributes['data-link'].nodeValue)
	})

	app.init()
})