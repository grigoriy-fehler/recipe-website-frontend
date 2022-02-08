import ViewAbout from './views/about.js'
import ViewRecipeAdd from './views/recipe-add.js'
import ViewRecipeDetails from './views/recipe-details.js'
import ViewRecipeList from './views/recipe-list.js'
import ViewUserLogin from './views/user-login.js'
import ViewUserRegister from './views/user-register.js'
import ViewUserDetails from './views/user-details.js'
import ViewContact from './views/contact.js'
import ViewPrivacy from './views/privacy.js'
import config from './config.js'

async function viewGetHtml(url, View) {
	if (typeof(url) == 'string' && url.length > 0) {
		const res = await fetch(url)
		const json = await res.json()
		return new View(json)
	}

	return new View()
}

const handlers = {}

handlers.about = function() {
	return viewGetHtml('', ViewAbout)
}

handlers['recipe-add'] = function() {
	return viewGetHtml(`${config.apiBaseUrl}/recipes`, ViewRecipeAdd)
}

handlers['recipe-details'] = function(search) {
	return viewGetHtml(`${config.apiBaseUrl}/recipes?${search}`, ViewRecipeDetails)
}

handlers['recipe-list'] = function() {
	return viewGetHtml(`${config.apiBaseUrl}/recipes`, ViewRecipeList)
}

handlers['user-login'] = function() {
	return viewGetHtml('', ViewUserLogin)
}

handlers['user-register'] = function() {
	return viewGetHtml('', ViewUserRegister)
}

handlers['user-details'] = function() {
	return viewGetHtml('', ViewUserDetails)
}

handlers.contact = function() {
	return viewGetHtml('', ViewContact)
}

handlers.privacy = function() {
	return viewGetHtml('', ViewPrivacy)
}

export default handlers