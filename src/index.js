import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from "react-dom";
import akita from "./images/akita.jpg";
import aussie from "./images/Australian-Shepherd.jpg";
import beagle from "./images/beagle.jpg";
import bernese from "./images/Bernese.jpg";
import chow from "./images/ChowChow.jpg";
import spaniel from "./images/Cocker-Spaniel.jpg";
import dachshund from "./images/Dachshund.jpg";
import frenchie from "./images/frenchbulldog.jpg";
import german from "./images/German-Shepherd.jpg";
import goldie from "./images/GoldenRetriever.jpg";
import greatdane from "./images/GreatDane.jpg";
import greyhound from "./images/Greyhound.jpg";
import husky from "./images/husky.jpg";
import lab from "./images/Lab.jpg";
import shiba from "./images/shiba2.jpg";
import boston from "./images/boston.jpg";
import boxer from "./images/boxer.jpg";
import chihuahua from "./images/Chihuahua.jpg";
import corgi from "./images/corgi.jpg";
import dalmatian from "./images/dalmatian.jpg";
import heeler from "./images/heeler.jpg";
import poodle from "./images/poodle.jpg";
import basset from "./images/basset.jpg";
import collie from "./images/collie.jpg";
// import mastiff from "./images/mastiff.jpg";
import sheepdog from "./images/sheepdog.jpg";

import "./App.css";
import { start } from "./Confetti";

function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}

const dogs = [
  { name: "Akita", 
    img: akita },
  { name: "Australian Shepherd",
    img: aussie}, 
  { name: "Basset Hound",
    img: basset}, 
  { name: "Beagle",
    img: beagle},
  { name: "Boston Terrier",
    img: boston},
  { name: "Boxer",
    img: boxer},  
  { name: "Chihuahua",
    img: chihuahua},
  { name: "Chow Chow",
    img: chow},  
  { name: "Cocker Spaniel",
    img: spaniel},
  { name: "Border Collie",
    img: collie},
  { name: "Welsch Corgi",
    img: corgi}, 
  { name: "Dachshund",
    img: dachshund}, 
  { name: "Dalmatian",
    img: dalmatian}, 
  { name: "Great Bernese Mountain Dog",
    img: bernese}, 
  { name: "Poodle",
    img: poodle}, 
  { name: "Blue Heeler",
    img: heeler}, 
  { name: "Sheepdog",
    img: sheepdog}, 
  { name: "French Bulldog",
    img: frenchie}, 
  { name: "German Shepherd",
    img: german}, 
  { name: "Golden Retriever",
    img: goldie}, 
  { name: "Great Dane",
    img: greatdane}, 
  { name: "Greyhound",
    img: greyhound}, 
  { name: "Husky",
    img: husky}, 
  { name: "Labrador Retriever",
    img: lab}, 
  { name: "Shiba Inu",
    img: shiba},
];


function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

const shuffledDogs = shuffleArray(dogs)

function Tile({ children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

function App() {
  const [state, setState] = useState({ checked: {} });
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <div className= "container">
            <div className="jumbotron">
                <h1 className="display-5 text-center">FIND FIDO</h1>
                <hr className="my-4"></hr>
                <p className= "lead text-center">The Dog Bingo Game</p>
            </div>
      <div className="wrapper">
        {Object.keys(shuffledDogs).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            <img src = {shuffledDogs[id].img} alt= {shuffledDogs[id].name}></img>
            <p className="text-center" id= "dogName">{shuffledDogs[id].name}</p>
          </Tile>
        ))}
      </div>
      {state.won ? <Confetti /> : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
