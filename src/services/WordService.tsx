
export class WordService {
    getWord() : string {
        let words = require("an-array-of-spanish-words");
        let index = Math.round(Math.random() * (words.length));
        console.log(words[index]);     
        return words[index].toUpperCase();
    }
}