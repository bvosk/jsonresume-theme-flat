var fs = require("fs");
var Handlebars = require("handlebars");
var dateFormat = require('dateformat');
var _ = require('underscore');

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

// Thanks to this dev for this snippet: https://jaketrent.com/post/every-nth-item-in-handlebars-loop
Handlebars.registerHelper('everyNth', function(context, every, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";
  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      var modZero = i % every === 0;
      ret = ret + fn(_.extend({}, context[i], {
        isModZero: modZero,
        isModZeroNotFirst: modZero && i > 0,
        isLast: i === context.length - 1
      }));
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});