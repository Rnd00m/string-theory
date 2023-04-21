/**
 * Get a random integer the minimum (inclusive) and  between maximum (exclusive)
 *
 * @param min
 * @param max
 */
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Get a random integer between the minimum (inclusive) and maximum (inclusive)
 *
 * @param min
 * @param max
 */
function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { getRandomInt, getRandomIntInclusive };