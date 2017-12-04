//run when page is started
 $(document).ready(function () {
     //QandA = triviaQuestions();
     $("#startOverBtn").hide();
 });

//Global Variables
    let correct = 0;
    let wrong = 0;
    let time = 15;
    let timer;
    let currentQuestion;
    let unanswered = 0;
    let userSelect;
    let answered = false;

//objects
var QandA = [

    {
        question: "Who was the best multiplayer character in Goldeneye 007?" ,
        answerArr: [" Bond", " Jaws", " Oddjob", " Xenia"],
        answers: 2,
        image: "assets/images/question1.gif" 
    },{
        question: "What was the most annoying weapon to get hit by in Mario Kart 64?",
        answerArr: [" Thunderbolt", " Spiny (blue) shell", " Red Shell", " Banana peel" ],
        answers: 3,
        image: "assets/images/question2.gif"
    },{
        question:" Hardest temple in The Legend of Zelda: Ocarina of Time?",
        answerArr: [" Fire", " Water", " Shadow", " Forest"],
        answers :2,
        image: "assets/images/question3.gif"
    },{
        question: " Best selling N64 Game?",
        answerArr: [" Super Mario 64", " Goldeneye 007", " Super Smash Bros", " Donkey Kong 64"],
        answers: 0,
        image: "assets/images/question4.gif"
    },{
        question: " Which Star Wars N64 game was the best?",
        answerArr: [" Rogue Squadron", " Shadows of the Empire", " Episode I Racer", " X Wing Alliance"],
        answers: 1,
        image: "assets/images/question5.gif"
    }, {
        question:  " Best sports game on N64?",
        answerArr: [" 1080 Snowboarding", " Wave Racer 64", " NFL Blitz 2000", " Tony Hawk Pro Skater 2"],
        answers: 3,
        image: "assets/images/question6.gif"
    },{
        question: "Best multiplayer game on N64?",
        answerArr: ["Perfect Dark", "Goldeneye 007", "Super Smash Bros", "Mario Kart 64", ],
        answers: 1,
        image: " assets/images/question7.gif"
            
}];
var messages ={
        correct:"You answered correctly! ",
        incorrect:"Incorrect answer!",
        timeEnd:"Out of time, good luck next time!",
        finished:"Trivia is all done lets see how well you did!"
}

//Functions 
//=============================================
function newGame(){
    currentQuestion = 0;
    correct = 0;
    wrong = 0;
    unanswered = 0;
    $("#endMessage").empty();
    $("#correct").empty();
    $("#wrong").empty();
    $("#unanswered").empty();
    newQuestion();
}
function newQuestion(){
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#image").empty();
    $("#answerList").empty();
    
    $("#question").html(QandA[currentQuestion].question);
    timeRem();
    for( var i = 0; i < 4; i++){
        var choices = $("<div>");
        choices.text(QandA[currentQuestion].answerArr[i]);
        choices.attr({'data-index':i});
        choices.addClass('thisChoice');
        $('#answerList').append(choices);
    }        
    $('.thisChoice').on("click", function(){
        userSelect = $(this).data('index');
        clearInterval(timer);
        answerPage();
        answered = true;
    });

}
function answerPage(){
    $("#question").empty();
    $('.thisChoice').empty();
    var rightAnswer = QandA[currentQuestion].answerArr[QandA[currentQuestion].answers];
    var rightAnswerIndex = QandA[currentQuestion].answers;
    //$("#image").html(QandA[currentQuestion].image);
    //.prepend('<img id="theImg" src="theImg.png" />')
    $("#image").html( '<img src =' + QandA[currentQuestion].image +'>');
    if(answered === false){
        unanswered++;
        
        console.log("unanswered" + unanswered);
        $("#message").html(messages.timeEnd);
        $("#correctedAnswer").html("The correct answer was" + rightAnswer);

    }else if((userSelect === rightAnswerIndex) && (answered = true) ){
        correct++;
        console.log("correct" + correct);
        $("#message").html(messages.correct);
        
    }else if((userSelect != rightAnswerIndex) && (answered = true)){
        wrong++;
        console.log("wrong" + wrong);
        $("#message").html(messages.incorrect);
        $("#correctedAnswer").html("The correct answer was" + rightAnswer);
         //answered = true;
    }

    if(currentQuestion == (QandA.length -1)){
       setTimeout(endGame,5000)
    }else{
        currentQuestion++;
        console.log(currentQuestion);
        setTimeout(newQuestion,8000);
    }

}
function endGame(){
    $("#time-remaining").empty();
    $("#message").empty();
    $("#correct").empty();
    $("#startOverBtn").addClass('reset');
    $("#startOverBtn").show();
    $("#image").empty();
    $("#endMessage").html(messages.finished);
    $("#correct").html("Number Correct: " + correct);
    $("#wrong").html("Number Wrong: " + wrong);
    $("#unanswered").html("Unanswered : " + unanswered);    
    
}
function timeRem(){
    time = 15;
    $("#time-remaining").html("Time remaining : " + time );
    answered = true;
    timer = setInterval(decrementTime, 1000);
}
function decrementTime(){
    time --;
    $("#time-remaining").html("Time remaining : " + time );
    if( time <= 0 ){
        clearInterval(timer);
        answered = false;
        answerPage();
    }
}


$("#startBtn").on("click", function(){
    $(this).hide();
    $("#n64pic").hide();
    newGame();
});
$("#startOverBtn").on("click",function(){
    $(this).hide();
    newGame();
});