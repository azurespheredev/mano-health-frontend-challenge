// Convert a string to original case ("helloWorld" => "Hello World")
export function toOriginal(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

// Convert a string to camel case ("Hello World" => "helloWorld")
export function toCamel(str: string): string {
  return str
    .replace(/(?:^\w|[-_\s]\w)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase().replace("-", "").replace("_", "").replace(" ", "")
    );
};