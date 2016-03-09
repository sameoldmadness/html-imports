var links = document.querySelectorAll('link[rel="import"]');
var imports = Array.from(links).reduce((acc, link) => {
	const name = link.getAttribute('href');
	acc[name] = link.import.body;
	return acc;
}, {});

var placeholders = document.querySelectorAll('[data-import]');
Array.from(placeholders).forEach(placeholder => {
	const name = placeholder.dataset.import;

	if (!imports[name]) {
		throw new Error('Unknown template ' + name);
	}

	const children = imports[name].cloneNode(true).children;
	Array.from(children).forEach(child => placeholder.appendChild(child));
});
