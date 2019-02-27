let questionslist = {};
let trivia = {};

let questions;
let answervalue;
let answertext;
let playerchoice;

let intervalID;

// Timer 
timer = {
    time: 12,

    start: function () {
        intervalID = setInterval(timer.countdown, 1000)
    },

    countdown: function () {
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".question-block").hide();
            timer.reset();
            timedOut();
            console.log(trivia.blank);
            console.log(playerchoice);
        } else {

        }
    },

    reset: function () {
        timer.time = 12;
        $("#timer-display").text("00:12");
        clearInterval(intervalID);
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};

// Questions
function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestion();

}

// reset
function resetTrivia() {
    return {
        questionNum: 0,
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}
// reset questions
function resetQuestions() {
    return {
        q0: {
            question: "What year did Warcraft release?",
            A: "1990",
            B: "1992",
            C: "1994",
            D: "1996",
            ans: {
                value: "C",
                display: "November 23rd, 1994"
            }
        },
        q1: {
            question: "Which planet holds warcraft inhabitants?",
            A: "Earth",
            B: "Tristram",
            C: "Hath",
            D: "Azeroth",
            ans: {
                value: "D",
                display: "Azeroth"
            }

        },
        q2: {
            question: "What company developed Warcraft?",
            A: "EA",
            B: "Bethesda",
            C: "Activision",
            D: "Blizzard",
            ans: {
                value: "D",
                display: "Blizzard Entertainment"
            }
        },
        q3: {
            question: "How many races exist in Warcraft?",
            A: "17",
            B: "360",
            C: "420",
            D: "69",
            ans: {
                value: "A",
                display: "Currently there are 17 Races"
            }
        },
        q4: {
            question: "Who is the Omega-Villian?",
            A: "The Titans",
            B: "The Old Gods",
            C: "The Void Lords",
            D: "Sargeras",
            ans: {
                value: "C",
                display: "The Void Lords"
            }
        },
        q5: {
            question: "What is the best race/class combination?",
            A: "Gnome Mage",
            B: "Gnome Mage",
            C: "Gnome Mage",
            D: "All of the Above",
            ans: {
                value: "D",
                display: "All the Gnome Mages"
            }
        },
        q6: {
            question: "How many playable races exist in the warcraft universe?",
            A: "2",
            B: "12",
            C: "6",
            D: "4",
            ans: {
                value: "B",
                display: "12 playable races currently"
            }
        },
        q7: {
            question: "Who was the first guardian?",
            A: "Alodi",
            B: "Medivh",
            C: "Aegwynn",
            D: "med'an",
            ans: {
                value: "A",
                display: "Alodi"
            }
        }
    }
}

// show question
function showQuestion() {
    questions = Object.keys(questionslist);
    let questiontitle = questions[trivia.questionNum];
    let question = questionslist[questiontitle];
    let questionblocks = createQuestions(question, questiontitle);
    $(".question-block").append(questionblocks).show();
}
// push questions to div
function createQuestions(question, key) {
    let block = $(`<div class="question" name="${key}"><h3>${question.question}</h3><hr>
                    <ul>
                    <li><h4 class="choice" data-value="A">${question.A}</h4></li>
                    <li><h4 class="choice" data-value="B">${question.B}</h4></li>
                    <li><h4 class="choice" data-value="C">${question.C}</h4></li>
                    <li><h4 class="choice" data-value="D">${question.D}</h4></li>
                    </ul>
                    </div>`);

    answervalue = question.ans.value;
    answertext = question.ans.display;

    return block;
}
// when timer ends mark question as wrong
function timedOut() {
    trivia.blank++;
    $(".answer-page").text("Your focus needs more focus, the correct answer was '" + answertext + "'.").show();

    setTimeout(clearBoard, 2000);
    setTimeout(transitionQuestions, 3000);

}
// check answer to see if it matches
function checkAnswer(pick) {
    playerchoice = pick;
    if (playerchoice === answervalue) {
        $(".answer-page").text("Correct!").show();
        trivia.correct++;
    } else {
        $(".answer-page").text("Wrong... The correct answer was '" + answertext + "'.")
            .show();
        trivia.incorrect++;
    }

    setTimeout(clearBoard, 2000);
    setTimeout(transitionQuestions, 3000);

}

function clearBoard() {
    $(".question-block").empty();

}
//  show results
function displayResults() {
    $(".question-block").empty();
    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);
    $(".results").show();
    $(".reset").show();
}
// show question til all have been answer else show results
function transitionQuestions() {
    trivia.questionNum++;
    $(".answer-page").hide();
    playerchoice = undefined;
    if (trivia.questionNum < questions.length) {
        $(".answer-page .question-block").empty();
        showQuestion();
        timer.start();
    } else {
        displayResults();
    }

}


// Gameplay

$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
    });
    // hide block after player chooses
    $(".question-block").on("click", ".choice", function () {
        timer.reset();
        playerchoice = $(this).attr("data-value");
        $(".question-block").hide();
        checkAnswer(playerchoice);

    });
    // reset button
    $(".reset").on("click", function () {
        $(".start").show();
        timer.reset();
        $(".results, .reset").hide().empty();
    })

});