interface MyObject {
  [key: string]: any;
}

/**
 * Removes empty values from an object and returns a new object with the non-empty values.
 *
 * @param {MyObject} obj - The object to remove empty values from.
 * @return {MyObject} A new object with the non-empty values.
 */
function removeEmptyValues(obj: MyObject): MyObject {
  const result: MyObject = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== '') {
      result[key] = value;
    }
  });

  return result;
}

/**
 * Converts an object to a query string representation.
 *
 * @param {MyObject} obj - The object to convert to a query string.
 * @return {string} The query string representation of the object.
 */
export function objectToQueryString(obj: MyObject) {
  const filteredObject = removeEmptyValues(obj);

  const queryString = Object.entries(filteredObject)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        // If the value is an array, encode each element separately
        return value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
      }
      // If the value is a string or undefined, handle it as before
      return `${encodeURIComponent(key)}=${value ? encodeURIComponent(value) : ''}`;
    })
    .join('&');

  return queryString;
}

/**
 * Extracts the anime ID and episode number from a slug.
 *
 * @param {string} slug - The slug from which to extract the anime ID and episode number.
 * @returns {Object} An object containing the anime ID and episode number.
 *
 * @example
 * // Example input and output
 * const slug = "one-piece-episode-999";
 * getAnimeIdAndEpisodeNumberFromSlug(slug);
 * // Output:
 * // {
 * //   animeId: "one-piece",
 * //   episodeNumber: "999"
 * // }
 */
export function getAnimeIdAndEpisodeNumberFromSlug(slug: string) {
  const parts         = slug.split('-');
  const animeId       = parts.slice(0, -2).join('-');
  const episodeNumber = parts[parts.length - 1];
  return { animeId, episodeNumber };
}
