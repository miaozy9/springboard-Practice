const gameContainer = document.getElementById("actualGame");

let currentScore = 0;
let score = 0;
let cardsflipped = 0;
let record = Infinity;
document.getElementById('currentScore').append(score)

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let multipleClick = false;
let flipped = document.createElement('div');

function endGame(){
  alert("Congrats! You finished the game. Your score is: " + currentScore)
  if(currentScore < record){
    record = currentScore;
  }
  
  document.getElementById('highScore').innerText = "Your best record is: "+record;
  cardsflipped = 0;
  currentScore = 0;
  score = 0;
  document.getElementById('currentScore').innerText = "Your current record is: " + score
}
// TODO: Implement this function!
function handleCardClick(event) {
  if(event.target.classList.contains("flippedd")){
    // console.log("has already been clicked")
    return;
  }
  if(multipleClick){
    return;
  }
  // console.log("currentScore tracking " + event.target.classList[0])
  event.target.style.backgroundColor = event.target.classList[0]
  //empty case
  if(flipped.classList.length === 0){
    score += 1
    console.log("empty case triggered")
    
    flipped = event.target;
    flipped.classList.add("flippedd") 
    // console.log("after empty case triggered flipped is: " + flipped.classList)
    // event.target = flipped;
    // console.log(event.target.classList)
    event.target.classList.add("flippedd")

  }
  //stored memory not empty 
  else{
    //match
    multipleClick = true;
    let prevcolor = "";
    score += 1
      if(event.target.classList[0] === flipped.classList[0]){

        event.target.classList.add("flippedd")
        //clear memory
        flipped = document.createElement('div');
        multipleClick = false;
        event.target.removeEventListener("click", handleCardClick);
        // console.log("Same item found, now flipped is: " + flipped.classList)
        currentScore += 2;
        cardsflipped += 2;
        console.log(cardsflipped)
        let cardNum = document.getElementById('actualGame').getElementsByTagName('div').length
        if(cardsflipped === cardNum){
          endGame();
        }
        // if(document.getElementsByClassName('flippedd').length === document.getElementsByClassName('actualGame').length)
      }
      //not match
      else{
        console.log("Hey no good")
        setTimeout(function(){
          event.target.style.backgroundColor = ""
          // console.log("prev color is : " + flipped.classList[0])
          prevcolor = flipped.classList[0] + " flippedd"
          console.log(prevcolor)
          console.log(document.getElementsByClassName(prevcolor)) 
          document.getElementsByClassName(prevcolor)[0].style.backgroundColor = ""
          // console.log("fired")
          document.getElementsByClassName(prevcolor)[0].classList.remove('flippedd')
          flipped = document.createElement('div');
          prevcolor = ""
          currentScore += 2;
          multipleClick = false;
        },500)
        
      }
  }
  
  document.getElementById('currentScore').innerText = "Your current record is: " + score
}

document.getElementById('reset').addEventListener('click',function(){
  console.log(document.getElementById('actualGame'))
  document.getElementById('actualGame').innerHTML = "";
  flipped = document.createElement('div');
  multipleClick = false;
  //clear all datas
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  score = 0;
  document.getElementById('currentScore').innerText = "Your current record is: " + score
})

function reset(){
  
}
// when the DOM loads
createDivsForColors(shuffledColors);

