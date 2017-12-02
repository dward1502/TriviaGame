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
    let unanswered;
    let userSelect;
    let answered = false;

//objects
var triviaQuestions = [

    {
        question: "Who was the best multiplayer character in Goldeneye 007?" ,
        answerArr: [" Bond", " Jaws", " Oddjob", " Xenia"],
        answers: 2
    },{
        question: "What was the most annoying weapon to get hit by in Mario Kart 64?",
        answerArr: [" Thunderbolt", " Spiny (blue) shell", " Red Shell", " Banana peel" ],
        answers: 3
    },{
        question:" Hardest temple in The Legend of Zelda: Ocarina of Time?",
        answerArr: [" Fire", " Water", " Shadow", " Forest"],
        answers :2
    },{
        question: " Best selling N64 Game?",
        answerArr: [" Super Mario 64", " Goldeneye 007", " Super Smash Bros", " Donkey Kong 64"],
        answers: 0
    },{
        question: " Which Star Wars N64 game was the best?",
        answerArr: [" Rogue Squadron", " Shadows of the Empire", " Episode I Racer", " X Wing Alliance"],
        answers: 1
    }, {
        question:  " Best sports game on N64?",
        answerArr: [" 1080 Snowboarding", " Wave Racer 64", " NFL Blitz 2000", " Tony Hawk Pro Skater 2"],
        answers: 3
    },{
        question: "Best multiplayer game on N64?",
        answerArr: ["Perfect Dark", "Goldeneye 007", "Super Smash Bros", "Mario Kart 64", ],
        answers: 1
            
}];
var messages ={
        correct:"Questions you answered correctly: ",
        incorrect:"Questions you answered incorrectly",
        timeEnd:"Out of time, good luck next time!",
        finished:"Trivia is all done lets see how well you did!"
}
//var imgArr = [ question1, question2 ,question3 ,question4 ,question5 ,question6 ,question7  ];

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
    answered = true;
    $("#question").html(triviaQuestions[currentQuestion].question);
    timeRem();
    for( var i = 0; i < 4; i++){
        var choices = $("<div>");
        choices.text(triviaQuestions[currentQuestion].answerArr[i]);
        choices.attr({'data-index':i});
        choices.addClass('thisChoice');
        $('#answerList').append(choices);
    }        
    $('.thisChoice').on("click", function(){
        userSelect = $(this).data('index');
        clearInterval(timer);
        answerPage();
    });

}
function answerPage(){
    $("#question").empty();
    $('.thisChoice').empty();
    var rightAnswer = triviaQuestions[currentQuestion].answerArr[triviaQuestions[currentQuestion].answers];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answers;
    if((userSelect === rightAnswerIndex) && (answered = true) ){
        correct++;
        console.log("correct" + correct);
        //$("#message").html(messages.correct);
        
    }else if((userSelect != rightAnswerIndex) && (answered = true)){
        wrong++;
        console.log("wrong" + wrong);
        $("#message").html(messages.incorrect);
        $("#correctedAnswer").html("The correct answer was" + rightAnswer);
        //answered = true;
    } else{
        unanswered++;
        answered = false;
        console.log("unanswered" + unanswered);
        $("#message").html(messages.timeEnd);
        $("#correctedAnswer").html("The correct answer was" + rightAnswer);
    }

    if(currentQuestion == (triviaQuestions.length -1)){
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
    newGame();
});
$("#startOverBtn").on("click",function(){
    $(this).hide();
    newGame();
});