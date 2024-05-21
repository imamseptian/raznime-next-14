/**
 * Saves a value to local storage with the given key.
 *
 * @param {string} key - The key to use when storing the value in local storage.
 * @param {any} value - The value to be stored in local storage.
 * @return {void} This function does not return a value.
 */
export function saveToLocalStorage(key: string, value: any): void {
  try {
    // Convert value to string before storing in localStorage
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    // Handle error gracefully, for example, log it
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Retrieves a value from the local storage based on the provided key.
 *
 * @param {string} key - The key used to retrieve the value from the local storage.
 * @return {T | null} The retrieved value from the local storage, or null if the key does not exist or an error occurs.
 */
export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue !== null) {
      // Parse the JSON string back to its original form
      return JSON.parse(serializedValue) as T;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return null;
  }
}
