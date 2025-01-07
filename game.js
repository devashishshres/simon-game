var colorBoxArray = ["green","red","yellow","blue"];
var chosenColorArray = [];
var userClickedArray = [];
var gameStarted = false;
var audioElement = new Audio();
audioElement.autoplay = true;


// Start the game after user keypress
function startSimonGame() {
    $(document).keypress(function(){
        if (!gameStarted) {
            gameStarted = true;
            $("h1").text("Level 1");
            nextSequence();
        }
    });
}


// Generate next color in the sequence
function nextSequence() {
    var chosenColor = randomColorSelector();
    chosenColorArray.push(chosenColor);
    userClickedArray = [];

    $("." + chosenColor).fadeOut(200).fadeIn(200);
    audioElement.src = './sounds/' + chosenColor + '.mp3';
    audioElement.play();

    $("h1").text("Level " + chosenColorArray.length);
}


// Handle user button clicks
$('.btn').click(function() {
    if(!gameStarted) return; // Ignore clicks if game hasn't started

    var clickedBtn = $(this);
    var userChosenColor = clickedBtn.attr('id');

    userClickedArray.push(userChosenColor);

    playSound(userChosenColor);

    animateBtnPress(clickedBtn);

    var currentIndex = userClickedArray.length - 1;
    
    if (checkColorSequence(currentIndex)) {
        if (userClickedArray.length === chosenColorArray.length) {
            setTimeout(nextSequence, 500);
        } 
    } else {
        gameOver();
    }
});


// Check user's input against game sequence
function checkColorSequence(index) {
    return userClickedArray[index] === chosenColorArray[index];
}


// Play sound of a given color
function playSound(chosenColor) {
    var selectedBtnAudioElement = new Audio('./sounds/' + chosenColor + '.mp3');
    selectedBtnAudioElement.play();
}


// Animate button press
function animateBtnPress(selectedBtn){
    selectedBtn.addClass("pressed");
    setTimeout(function() {
        selectedBtn.removeClass("pressed");
    },100);
}


// Handle game over scenario
function gameOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
        audioElement.src = './sounds/wrong.mp3';
        audioElement.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        gameStarted = false;
        chosenColorArray = [];
        userClickedArray = [];

        startSimonGame();
}


// Utility functions
function randomNumberGenerator() {
    return Math.floor(Math.random() * 4);
}

function randomColorSelector() {
    var index = randomNumberGenerator();
    return colorBoxArray[index];
}


// Initialize the game
startSimonGame();