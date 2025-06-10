// Utility to convert snake_case to camelCase
const toCamel = (s: string): string =>
  s.replace(/_([a-z])/g, (_, c) => c.toUpperCase())

// Recursive function to convert all object keys to camelCase
export function snakeToCamel(input: any): any {
  if (Array.isArray(input)) {
    return input.map(snakeToCamel)
  } else if (input !== null && typeof input === 'object') {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        toCamel(key),
        snakeToCamel(value)
      ])
    )
  }
  return input
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // e.g., March
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}
