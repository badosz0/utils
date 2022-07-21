export function toTitleCase(text: string, onlyFirst = true): string {
  return onlyFirst
    ? text[0].toUpperCase() + text.slice(1).toLowerCase()
    : text
      .split(' ')
      .map(t => toTitleCase(t))
      .join(' ');
}
