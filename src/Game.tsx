import React from "react";
import { Picture}  from './components/HangmanPicture';
import {WordService} from './services/WordService';
import './style/Game.css';

interface GameProps  {
  wordService: WordService;
}

interface GameState  {
  guessWord: string
  maxErrors: number,
  errorCount: number,
  guessedChars: number,
  usedLetters: string[],
  currentLetter: string,
  gameStatus: number // 1-> continue, 2 -> loose, 3 -> win, added

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
        gameStatus: 1,
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
    let status = 1;
    let newErrorCount = this.state.errorCount;
    let newGuessedChars  =this.state.guessedChars;
    if(ocurrences > 0) {
      newGuessedChars += ocurrences;
      status = newGuessedChars === this.state.guessWord.length ? 3 : 1;
    } else {
      newErrorCount = this.state.errorCount +1;
      status = newErrorCount === 7 ? 2 : 1;
    }
    this.setState(
     {
        gameStatus: status,
        usedLetters: newUsedLetters,
        errorCount: newErrorCount,
        currentLetter: "",
        guessedChars: newGuessedChars
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
      <div className="Game">
        <div className="header">The Hangman</div>

        <div className="GameBoard">
        <div style={{width: '50%', float: 'left'}}>
        <input type="text" value={this.state.currentLetter} onChange={e => this.setInputText(e.target.value)} size={1}/>
        <button onClick={() => this.play()} disabled={this.state.gameStatus !== 1}>Play</button>

          <div>
           {this.getWordLetters().map((value, index) => {
              return <span>{value} </span>
            })}
          </div>
        
      
          
          <div>Letras usadas</div>
            {
              this.state.usedLetters.map((value, index) => {
              return <span>{value}, </span>
            })}
          <div>
             {
              this.state.gameStatus !== 1 ? (
                this.state.gameStatus === 2 ?
                <p>Fuck you</p> : <p>You won</p>
              ):''
            }
         </div>
         </div>
         <div style={{width: '50%', float: 'left'}}>
         <Picture errorCont={this.state.errorCount} ></Picture>
         </div>
         </div>
         </div>
    );
  }
}

