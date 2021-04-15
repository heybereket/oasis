const translations = require("../public/locales/en/translation.json");

const keys = [];

const _traverseTranslations = (obj, path) => {
	Object.keys(obj).forEach((key) => {
		if (key.startsWith("_")) {
			return;
		}
		const objOrString = obj[key];
		if (typeof objOrString === "string") {
			keys.push([...path, key].join("."));
		} else {
			_traverseTranslations(objOrString, [...path, key]);
		}
	});
};

const traverseTranslations = () => {
	_traverseTranslations(translations, []);
	return keys;
};

module.exports = {
  traverseTranslations
};