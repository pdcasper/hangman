import React from "react";
import { Picture}  from './components/HangmanPicture';
import {WordService} from './services/WordService';

interface GameProps  {
  wordService: WordService;
}

interface GameState  {
  guessWord: string;
  maxErrors: number;
  errorCount: number;
  guessedChars: number;
  endGame: boolean;
  usedLetters: string[],
  currentLetter: string

}

export default class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps , state: GameState){
    super(props);
    this.state = 
      {
        guessWord: this.props.wordService.getWord(), 
        maxErrors: 10, 
        errorCount: 0, 
        guessedChars: 0, 
        endGame: false,
        usedLetters: [],
        currentLetter: ''
      }
  }

  play() {
    if(this.state.usedLetters.includes(this.state.currentLetter)) {
      return
    }

    let ocurrences = this.state.guessWord.split(this.state.currentLetter).length - 1;
    let newUsedLetters = [...this.state.usedLetters, this.state.currentLetter];
    let endGame = false;
    let newErrorCount = this.state.errorCount;
    if(ocurrences > 0) {
      let newGuessedChars = ocurrences + this.state.guessedChars;
      endGame = newGuessedChars === this.state.guessWord.length;
    } else {
      newErrorCount = this.state.errorCount +1;
    }
    this.setState(
     {
        endGame: endGame,
        usedLetters: newUsedLetters,
        errorCount: newErrorCount,
        currentLetter: ""
      }
    )
  }

  setInputText(s: string) {
    this.setState({currentLetter: s.toUpperCase()});
  }

  getWordLetters(): string[] {
    var letters:string[];
    letters = [];

    this.state.guessWord.split("").forEach(c => {
      if(this.state.usedLetters.includes(c))
        letters.push(c);
      else 
        letters.push("_");
      });

    return letters;

  }

  render() {

    return(
      <>
        <Picture errorCont={this.state.errorCount}></Picture>
        <div>
          PALABRA: 
         {this.getWordLetters().map((value, index) => {
           return <span>{value} </span>
        })}
        </div>
        
      
        <input type="text" value={this.state.currentLetter} onChange={e => this.setInputText(e.target.value)}/>
        <button onClick={() => this.play()}>Play</button>
<div>Letras usadas</div>
        {this.state.usedLetters.map((value, index) => {
          return <span>{value}, </span>
        })}
         </>
    );
  }
}

