
'use strict';

// ---------------GLOBAL VARIABLES / settings--------------------------------

let voteCount = 3;
let productArray = [];
let nameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let recentArray = [];
let resultDisplay = document.getElementById('resultChart');
let resultChart = document.getElementById('resultChart').getContext('2d');

//Chart variables
let dataArr = [];

resultDisplay.style.display = 'none';
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

// modified random number generator to pick from filtered array length below
function randomIndex() {
  return Math.floor(Math.random() * (productArray.length - 3));
}

function renderImage() {
  //makes temporary array of numbers to use as indexes
  let currentArray = [];
  for (let i = 0; i < productArray.length; i++) {
    currentArray.push(i);
  }
  // filters the indexes of the last three pictures out and gives new filtered array
  let filtered = currentArray.filter(function (value, index, arr) {
    return !(recentArray.includes(value));
  });

  //randomly pick new image indexes from the filtered array, prevents repeats
  let imgOneIndex = filtered[randomIndex()];
  let imgTwoIndex = filtered[randomIndex()];
  let imgThreeIndex = filtered[randomIndex()];

  //logging code to track correct function
  console.log(currentArray);
  console.log(recentArray);
  console.log(filtered);

  //loop to prevent dupliicate images
  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = filtered[randomIndex()];
    imgThreeIndex = filtered[randomIndex()];
  }

  //remove indexes of previous set of images
  recentArray.pop();
  recentArray.pop();
  recentArray.pop();

  //add indexes of this set of images
  recentArray.push(imgOneIndex);
  recentArray.push(imgTwoIndex);
  recentArray.push(imgThreeIndex);

  //set image source and alt based on current set of indexes
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
    resultDisplay.style.display = 'none';
  }
  else {
    pending.style.display = 'none';
    // resultsButton.style.display = 'block';
    imgContainer.style.display = 'none';
    resultsContainer.style.gridArea = 'content';
    resultDisplay.style.display = 'block';
    resultsMessage();
    
  }

  let subArr = [];
  for (let i = 0; i < productArray.length; i++) {
    subArr.push(productArray[i].clicks);
  }
  console.log(subArr);
  dataArr = subArr;
  console.log(dataArr, subArr);
  renderChart();
}

// function resultsHandler() {
//   if (voteCount <= 0) {
//     for (let i = 0; i < productArray.length; i++) {
//       let listElem = document.createElement('li');
//       listElem.textContent = `${productArray[i].name} was viewed ${productArray[i].views} times and received ${productArray[i].clicks} votes.`;
//       list.appendChild(listElem);
//     }
//     resultsButton.removeEventListener('click', resultsHandler);
//   }
// }



// ---------------EXECUTABLE CODE-------------------------------

imgContainer.addEventListener('click', containerHandler);
// resultsButton.addEventListener('click', resultsHandler);

// -------------- OBJECT CREATION

for (let i = 0; i < nameArray.length; i++) {
  let prod = new Product(nameArray[i]);
}

let prod2 = new Product('sweep', 'png');

// Results zone messages

pending.textContent = `${voteCount} more votes needed to get results`;

// Starting image display
renderImage();

// Chart code which hoists up to run in the click handler
const renderChart = () => {
  let labelsArr = [];
  for (let i = 0; i < productArray.length; i++) {
    labelsArr.push(productArray[i].name);
  }

  console.log('renderChart');
  const ctx = document.getElementById('resultChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsArr,
      datasets: [{
        label: '# of Votes',
        data: dataArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0], 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true
    }
  });
};

