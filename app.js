// need a constructor to build goat instances

    // The goat needs to have

    //  imgs, clicks, views names

    // prototype methods to calculate views and clicks


// need an array of goat objects

// need function that randomly decides which goats to display, but also doesn't consecutively display goats

// need render functions to display the goats

// need DOM windows

// need an event listener on the objects

// need an event listener on the results button to render a list of the votes

'use strict';

// ---------------GLOBAL VARIABLES--------------------------------

let voteCount = 15;
let productArray = [];

// ----------------DOM REFERENCES ----------------------------

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let resultsButton = document.getElementById('results-button');
let resultsContainer = document.getElementById('results-container');

// --------------CONSTRUCTOR--------------------------------------

function Product(name, fileExtension = 'jpg')  {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  productArray.push(this);

}

// ---------------HELPER FUNCTIONS-----------------------------

function randomIndex() {
  return Math.floor(Math.random() * productArray.length)
}

function renderImage() {
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();

  while (imgOneIndex === imgTwoIndex) {
    imgTwoIndex = randomIndex();
  }

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgOneIndex].img;

}

// ---------------EVENT HANDLERS-------------------------------



// ---------------EXECUTABLE CODE-------------------------------


// -------------- OBJECT CREATION


// idea to loop through folder

// const fs = require('fs')

// const dir = '/Users/flavio/folder'
// const files = fs.readdirSync(dir)

// for (const file of files) {
//   console.log(file)
// }