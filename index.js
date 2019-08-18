var fs = require("fs");
var Handlebars = require("handlebars");
var dateFormat = require('dateformat')

module.exports = {
	render: render
};

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var template = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	return Handlebars.compile(template)({
		css: css,
		resume: resume
	});
}

Handlebars.registerHelper("nl2br", function(value) {
	return (value || "").replace(/\n/g, "</p><p>");
});

Handlebars.registerHelper("formatDate", function(date, mask) {
	if (date === null) {
		return 'Present';
	}
	return dateFormat(date, mask);
});