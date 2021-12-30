export function toTitleCase(text: string, onlyFirst = true) {
	return onlyFirst
		? text[0].toUpperCase() + text.substring(1).toLowerCase()
		: text
				.split(" ")
				.map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
				.join(" ");
}
