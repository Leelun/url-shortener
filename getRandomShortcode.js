function getRandomLetter() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseLetters = lowerCaseLetters.toUpperCase()
  const numberLetters = '0123456789'
  const randomSelection = lowerCaseLetters + uppercaseLetters + numberLetters
  const randomLetters = Math.floor(Math.random() * randomSelection.length)
  const output = randomSelection[randomLetters]
  return output
}
function getRandomUrlOutput() {
  let randomLetterOutput = ''
  for (let i = 1; i <= 5; i++) {
    randomLetterOutput += getRandomLetter()
  }
  return output = randomLetterOutput
}

module.exports = getRandomUrlOutput