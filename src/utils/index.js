export const collatzConj = (num, results = []) => {
  results.push(num)
  return num !== 1 ? (num % 2 === 0 ? collatzConj(num / 2, results) : collatzConj(3 * num + 1, results)) : results
}
