
'use strict';

// ---------------GLOBAL VARIABLES--------------------------------

let voteCount = 25;
let productArray = [];
let nameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

// ----------------DOM REFERENCES ----------------------------

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsButton = document.getElementById('results-button');
let resultsContainer = document.getElementById('results-container');
let list = document.getElementById('list');
let pending = document.getElementById('pending');


// --------------CONSTRUCTOR--------------------------------------

function Product(name, fileExtension = 'jpg') {
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
  imgThree.src = productArray[imgThreeIndex].img;

  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

}

function resultsMessage() {
  let main = document.getElementById('main');
  let messageContainer = document.createElement('section');
  main.appendChild(messageContainer);
  let message = document.createElement('h2');
  message.textContent = 'The People Have Spoken!';
  messageContainer.appendChild(message);
  messageContainer.style.gridArea = 'sidebar';
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
  console.log(voteCount);
  renderImage();
  if (voteCount > 0) {
    pending.textContent = `${voteCount} more votes needed to get results`;
    resultsButton.style.display = 'none';
  }
  else {
    pending.style.display = 'none';
    resultsButton.style.display = 'block';
    imgContainer.style.display = 'none';
    resultsContainer.style.gridArea = 'content';
    resultsMessage();
  }
}

function resultsHandler() {
  if (voteCount <= 0) {
    for (let i = 0; i < productArray.length; i++) {
      let listElem = document.createElement('li');
      listElem.textContent = `${productArray[i].name} was viewed ${productArray[i].views} times and received ${productArray[i].clicks} votes.`;
      list.appendChild(listElem);
    }
  }
}



// ---------------EXECUTABLE CODE-------------------------------

imgContainer.addEventListener('click', containerHandler);
resultsButton.addEventListener('click', resultsHandler);

// -------------- OBJECT CREATION

for (let i = 0; i < nameArray.length; i++) {
  let prod = new Product(nameArray[i]);
}

let prod2 = new Product('sweep', 'png');

// Results zone messages
pending.textContent = `${voteCount} more votes needed to get results`;
resultsButton.style.display = 'none';

// Starting image display
renderImage();



