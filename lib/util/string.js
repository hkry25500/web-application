/**
 * Util Function
 *
 * @param {string} text Receive a string and Capitalized it's first letter.
 * @returns {string}
 *
 */
export function withUpperCase(text)
{
    return text.charAt(0).toUpperCase() + text.slice(1);
}