/**
 * Get a random integer between maximum (exclusive) and the minimum (inclusive)
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
 * Get a random integer between maximum (inclusive) and the minimum (inclusive)
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