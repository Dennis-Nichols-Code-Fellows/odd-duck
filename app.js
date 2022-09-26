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
let nameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu','dog-duck','dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntan', 'unicorn','water-can', 'wine-glass'];

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
  let imgThreeIndex = randomIndex();

  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThreeIndex.src = productArray[imgThreeIndex].img;

  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

}

// ---------------EVENT HANDLERS-------------------------------

function containerHandler() {
  let imageClicked = event.target.alt;
  for (let i = 0; i < productArray.length; i++) {
    if (imageClicked === productArray[i].name) {
      productArray[i].clicks++;
    }
}
voteCount--;
renderImage();
}

function resultsHandler() {
  if (voteCount === 0) {
    let list = document.createElement('ul');
    resultsContainer.appendChild(list);

    for (let i=0; i<productArray.length; i++) {
      let listElem = document.createElement('li');
      listElem.textContent(`${productArray[i].name} was viewed ${productArray[u/i].views} times and received ${productArray[i].clicks} votes.`);
      list.appendChild(listElem);
  }
}
}



// ---------------EXECUTABLE CODE-------------------------------

imgContainer.addEventListener('click', containerHandler);
resultsButton.addEventListener('click', resultsHandler);

// -------------- OBJECT CREATION

for (let name in nameArray) {
  let prod = new Product(name);
}

let prod2 = new Product('sweep','png');