export default {
    truncateString: (string, size = 25) => string.length > size ? string.slice(0, size - 1) + "…" : string,
}