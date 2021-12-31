export function toTitleCase(text: string, onlyFirst = true) {
	return onlyFirst
		? text[0].toUpperCase() + text.substring(1).toLowerCase()
		: text
				.split(" ")
				.map(text => toTitleCase(text))
				.join(" ");
}
