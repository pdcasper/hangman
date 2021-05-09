import React from "react";

interface GameProps  {
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
        guessWord: 'SUPERCALIFRAGILISTICOESPIALIDOSO', 
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
    let newUsedLetters = Object.assign([], this.state.usedLetters);
    newUsedLetters.push(this.state.currentLetter);

    if(ocurrences > 0) {
      let newGuessedChars = ocurrences + this.state.guessedChars;
      this.setState(
        {
          endGame : (newGuessedChars === this.state.guessWord.length),
          guessedChars : newGuessedChars,
          usedLetters : newUsedLetters,
          currentLetter: ""
      }
      );
    } else {
      let newErrorCount = this.state.errorCount +1;
      let newUsedLetters = Object.assign([], this.state.usedLetters);
      newUsedLetters.push(this.state.currentLetter);
      this.setState(
        {
          usedLetters: newUsedLetters,
          errorCount: newErrorCount,
          currentLetter: ""
        }
      )
    }
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
      <table>
        <tr>
          <td>Errores</td><td>{this.state.errorCount}</td>
          <td>Errores</td><td>{this.state.errorCount}</td>
        </tr>
      </table>
    </>
    );
  }
}

