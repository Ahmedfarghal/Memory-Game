
//Adding Cards on an Arry
const iconsList = [
  "fa fa-diamond", "fa fa-diamond",
  "fa fa-anchor","fa fa-anchor",
  "fa fa-bolt","fa fa-bolt",
  "fa fa-car","fa fa-car",
  "fa fa-cube", "fa fa-cube",
  "fa fa-bomb","fa fa-bomb",
  "fa fa-bicycle", "fa fa-bicycle",
  "fa fa-fighter-jet", "fa fa-fighter-jet",
  "fa fa-leaf","fa fa-leaf",
  "fa fa-paper-plane-o", "fa fa-paper-plane-o",
];


let cards = document.querySelector(".deck");
const cardsChildren = cards.children;

//matchedCards Array (collecting the matched cards and compare between them)
let matchedCards = [];

//flippedCards Array
let flippedCards = [];


//shuffled Array (changing the cards postion after starting new game )
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
//end of the shuffled Array--------------



//Starting Game Function
function startGame(){

  const icons = shuffle(iconsList);
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card"); //card!!
        card.innerHTML = "<i class='" + icons[i] + "'></i>";
        cards.appendChild(card);
    }
    // Click Card
    click();
};
//end of starting game function--------


//Click function for checking the matched and unmatched cards.
     let moves = 1;
     let flag = true;
function click() {
  for(let i = 0; i < cardsChildren.length; i++) {
    cardsChildren[i].addEventListener("click", function() {
      //startTimer min and sec and countmoves

        if (flag){
          startTimer();
          flag = false;
        }
      // Open Card
      cardsChildren[i].classList.add("open","show","disabled");

      // Global 2 Cards [ Current & Previous ]
      const currCard = this;
      const prevCard = flippedCards[0];

      // Flipped Card
      if(flippedCards.length === 1 ) {


          // Matching and adding the match class
        if(currCard.childNodes[0].className === prevCard.childNodes[0].className) {
            currCard.classList.add("match", "disabled");
            prevCard.classList.add("match", "disabled");

            // Add to Matched Cards List
            matchedCards.push(currCard, prevCard);

          } else {
            setTimeout(function() {
              currCard.className = "card";
              prevCard.className = "card";
            }, 1000);
          }

          const movesCount = document.querySelector(".moves");
          movesCount.innerHTML= moves++;
          Rating();
          flippedCards = [];

      } else {
        // Add to the Flipped Cards Arr
        flippedCards.push(cardsChildren[i]);
        console.log("Add To the Flipped Cards List");
      }
      // Is Over?
      isOver();
    });
  }
}
//end of the Click function-----------------


//isOver function (gameOver function )
function isOver() {
    if(matchedCards.length == cardsChildren.length){
        const displayScreen = document.querySelector(".displayScreen");
        displayScreen.style.display = "block";
        const displayMessage = document.querySelector(".displayMessage");
        displayMessage.style.textAlign = "center";
      // Display the Congratulations div
      clearInterval(interval);
      sweetAlert()
    }
}
  startGame();
//end of isOver function--------------


// timer function
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".startTimer");
var interval;

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+ " mins "+second+" Sec";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
//end of timer function --------------------

//addEventListener for the reset button
const reset = document.querySelector(".restart");
reset.addEventListener('click', function(){

    resetGame();
});
//end of the addEventListener reset button


//rest function (rest, timer, moves, flippedCards, matchedCards )
function resetGame() {
  //rest Timer
      second = 0;
      minute = 0;
      hour = 0;
      flag = true;
      var timer = document.querySelector(".startTimer");
      timer.innerHTML = "0 mins 0 Sec";
      clearInterval(interval);

  //rest moves
      const movesCount = document.querySelector(".moves");
      moves = 0;
      movesCount.innerHTML= 0;

  //reset Rating
      stars[2].style.color = "#FFD700";
      stars[1].style.color = "#FFD700";

  //rest flippedCards, matchedCards
      matchedCards = [];
      flippedCards = [];
      cards.innerHTML="";
      startGame()
       /*Udacity feedback needs to remove that startTimer()*/
}
//end of the rest function-------------


//rating starts
const stars = document.querySelectorAll(".star");

function Rating(){
  if (moves > 30 && moves < 40) {
    stars[2].style.color = "#000";
  } else if (moves > 60) {
    stars[1].style.color = "#000";
  }
}
//end of the rating starts---------------



// Congratulation message library after GameOver with Score and time
function sweetAlert(){
  swal({
  title: 'Congratulations! Winning!!',
  text: "You Scored " + (moves-1) + " Move In Just "+ minute + " Min " + (second-1) + " Sec",
  type: 'success',
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Restart Game',
  confirmButtonClass: 'btn btn-success',
  buttonsStyling: true,
}).then((result) => {
  if (result.value) {
    resetGame();

  }
})
}
//end of the function -------------
