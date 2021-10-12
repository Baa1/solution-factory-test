const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'

const stringGenerator = (strLen) => {
    let word = ''
    for (let i = 0; i < strLen; i++) {
        word += alphabet[Math.round(Math.random() * (alphabet.length - 1))]
    }
    return word
}

module.exports = {
    stringGenerator
}
