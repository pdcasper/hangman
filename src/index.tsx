import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import reportWebVitals from './reportWebVitals';
import { WordService } from './services/WordService';

let wordService = new WordService();
ReactDOM.render(
  <React.StrictMode>
    <Game wordService={wordService}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
