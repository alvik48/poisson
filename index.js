'use strict';

/**
 * We need to specify a cache size to be enough for all needed calculations
 * and at the same time to be as minimal as it possible
 * @type {number}
 */
const FACTORIAL_CACHE_SIZE = 500;

/**
 * We need to prepare factorial cache for a future usage
 */
let FACTORIAL_POINTS = [];
let FACTORIAL_CACHE = [];

/**
 * Returns points in which we need to split factorial calculation
 * to prevent a result to be greater than JS max number value
 *
 * @param max
 * @returns {Array}
 */
function _getFactorialPoints(max) {
  const points = [];
  let point = 0;
  let m = 2;
  let end = false;

  while (true) {
    let f = 1;
    while (f < Number.MAX_VALUE / m) {
      f *= m;
      m++;

      if (m > max) {
        end = true;
        break;
      }
    }

    if (end) {
      break;
    } else {
      points[point] = m - 1;
      point++;
    }
  }

  return points;
}

/**
 * Calculates factorial as an array of multipliers.
 * Each number in array is max as possible to use in future calculations
 *
 * @param n
 * @returns {[number]}
 */
function _calcFactorial(n) {
  let point = 0;
  let f = [1];

  for (let i = 2; i <= n; ++i) {
    if (i > FACTORIAL_POINTS[point]) {
      point++;
      f[point] = 1;
    }

    f[point] *= i;
  }

  return f;
}

/**
 * Calculates probability of given score based on expected score
 *
 * @param expected
 * @param exact
 * @returns {number}
 */
function probabilityPoisson(expected, exact) {
  const bf = FACTORIAL_CACHE[exact];
  const exactPart = Math.floor(exact / (bf.length + 1));

  let h = 0;
  let result = 1;
  let step = 0;
  while (exact > 0) {
    h = Math.min(exact, exactPart);

    result *= Math.pow(expected, h) / (bf[step] || 1);

    step++;
    exact -= h;
  }

  return Math.exp(-expected) * result;
}

module.exports = function(MAX) {
  MAX = MAX || 1000;

  FACTORIAL_POINTS = _getFactorialPoints(MAX);
  FACTORIAL_CACHE.length = MAX;

  for (let i = 0; i < FACTORIAL_CACHE_SIZE; ++i) {
    FACTORIAL_CACHE[i] = _calcFactorial(i);
  }

  return probabilityPoisson;
};
