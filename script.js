const questions = document.querySelector('.question');
const options = document.querySelectorAll('.options-text');
const nextPage = document.querySelector('.next-question');
const previousPage = document.querySelector('.previous-question');
const optionBox = document.querySelectorAll('.options');
const yourChoice = document.querySelectorAll('.your-choice');
const questionNumber = document.querySelector('.question-no');
const rightIcon = document.querySelector('.correct-icon');
const wrongIcon = document.querySelector('.wrong-icon');
const timer = document.querySelector('.timer');
const body = document.querySelector('body');
const soundOn = document.querySelector('.sound-on');
const soundOff = document.querySelector('.sound-off');
const audio = document.querySelector('audio');
const startQuizBtn = document.querySelector('.start-now');
const startPage = document.querySelector('.start-section');
const questionsPage = document.querySelector('.questions-section');
const resultPage = document.querySelector('.result-section');
const retryBtn = document.querySelector('.retry-btn');
const highestScore = document.querySelector('.highest-score');
const result = document.querySelector('.result-no');
const correctBar = document.querySelector('.correct-bar')
const quote = document.querySelector('.quote');

let highScore = 0;

// showing the question page and hiding the start page
audio.pause();

// Start quiz event
startQuizBtn.addEventListener('click', () => {
    startPage.classList.add('start-section-hide');
    questionsPage.classList.add('questions-section-show');
    audio.play()
    currentQuestionIndex = 0;
    timerFunc();
    questionAndAnswers();
    answerGuess();
    currentQuestionNumber();
    userChoices = [];
})

// add class to the correct ans to show correct ans
const correctAns = () => {
    for (let i = 0; i < quiz.length; i++) {
        const correctAnswerArr = quiz[i].correctAnswer;
        options.forEach((el) => {
            if (el.innerText === correctAnswerArr) {
                el.parentElement.classList.add('correct-ans');
                el.nextElementSibling.lastElementChild.classList.add(
                    'correct-icon-show'
                );
            }
        });
    }
};

// changing question number on page
const currentQuestionNumber = () => {
    questionNumber.innerText = `${currentQuestionIndex + 1}/${totalQuestions}`;
};

// creating a array of user choice
let userChoices = [];

// reset the option after every page
const resetOptions = () => {
    optionBox.forEach((reset) => {
        reset.classList.add('reset-option');
        reset.lastElementChild.firstElementChild.style.display = 'none';

        reset.classList.remove('correct-ans', 'incorrect-ans', 'option-close');
        reset.lastElementChild.firstElementChild.nextElementSibling.classList.remove(
            'wrong-icon-show'
        );
        reset.lastElementChild.lastElementChild.classList.remove(
            'correct-icon-show'
        );
        nextPage.classList.remove('next-question-show')
    });
    isOptionSelected = false;
};

// changing questions on web page;
const questionAndAnswers = () => {
    resetOptions();

    questions.innerText = quiz[currentQuestionIndex].question;

    options.forEach((option, index) => {
        option.innerText = quiz[currentQuestionIndex].answers[index];
    });
};

// Handle answer selection
const answerGuess = () => {
    let isOptionSelected = false;
    optionBox.forEach((checkbox) => {
        checkbox.onclick = () => {
            if (isOptionSelected) {
                return;
            } // Prevent multiple selections
            isOptionSelected = true;

            if (isOptionSelected) {
                nextPage.classList.add('next-question-show') // Show next button after selection

            }

            // giving red border to wrong and green to right
            if (checkbox.innerText === quiz[currentQuestionIndex].correctAnswer) {
                checkbox.classList.add('correct-ans');
            } else {
                checkbox.classList.add('incorrect-ans');
                checkbox.lastElementChild.firstElementChild.nextElementSibling.classList.add('wrong-icon-show');
            }

            userChoices[currentQuestionIndex] = checkbox.firstElementChild.innerText

            // removing hover when clicked on options
            checkbox.classList.add('no-hover');

            // choice container get a you choice text
            checkbox.lastElementChild.firstElementChild.style.display = 'block';

            correctAns();

            // After click make the option unclickable
            setTimeout(() => {
                optionBox.forEach((option) => {
                    option.classList.add('option-close');
                });
            }, 10);
        };
    });
};

// Timer settings
let timing;
let sec = 30;

// Timer function
const timerFunc = () => {
    clearInterval(timing);
    sec = 30;

    timing = setInterval(() => {
        timer.innerText = `00:${sec < 10 ? '0' : ''}${sec}`;
        sec--;

        // Background color changes based on time left
        if (sec > 15) {
            questionsPage.style.backgroundColor = '#CCE2C2';
            timer.style.backgroundColor = '#44b845';
            nextPage.style.color = '#01AB08';
        }

        if (sec < 15) {
            questionsPage.style.backgroundColor = '#E4E5C7';
            timer.style.backgroundColor = '#C5B1006E';
            nextPage.style.color = '#C58800';
        }
        if (sec < 5) {
            questionsPage.style.backgroundColor = '#DBADAD';
            timer.style.backgroundColor = '#cc4038';
            nextPage.style.color = '#C50000';
        }

        // Disable options when time runs out
        if (sec < 0) {
            clearInterval(timing);
            optionBox.forEach((option) => {
                option.classList.add('option-close');
            });
        }
    }, 1000);
};

// Sound control functionality
soundOn.addEventListener('click', () => {
    soundOff.style.display = 'block';
    soundOn.style.display = 'none';
    audio.pause();
});

soundOff.addEventListener('click', () => {
    soundOn.style.display = 'block';
    soundOff.style.display = 'none';
    audio.play();
});

// quotes to be displayed on the result page
const quizQuotes = [
    "Don't worry! Every expert was once a beginner. Keep trying!",
    "Keep going! JavaScript is all about practice. You'll get there!",
    "Not bad! You're getting the hang of it, keep pushing forward.",
    "Good job! You have a solid foundation in JavaScript. Keep building on it!",
    "Impressive! You're close to mastering JavaScript fundamentals.",
    "Amazing! You're a JavaScript pro! Keep up the fantastic work!"
];


questionAndAnswers();
answerGuess();
currentQuestionNumber();

// updating question on click on next
nextPage.addEventListener('click', (e) => {
    e.preventDefault();

    timerFunc();

    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        questionAndAnswers();
        answerGuess();
        currentQuestionNumber();
    } else if (currentQuestionIndex === totalQuestions - 1) {
        questionsPage.classList.remove('questions-section-show');
        resultPage.classList.add('result-section-show')
        audio.pause()
        // console.log(userChoices);

        // checking the no of correct ans
        const noOfCorrectAns = rightAnswer.filter((el, i) => {
            return rightAnswer[i] === userChoices[i]
            //    console.log(rightAnswer);
        });

        // storing user response in variable 
        let currentScore = noOfCorrectAns.length;
        
        //updating the result dynamically
        result.innerText = `${currentScore}/${totalQuestions}`

        // changing bar according to the no of correct ans
        correctBar.style.width = `${currentScore / totalQuestions * 100}%`

        // displaying quote according to the score
        if (currentScore === 0) {
            quote.innerText = quizQuotes[0]
        } else if (currentScore <= 2) {
            quote.innerText = quizQuotes[1]
        } else if (currentScore <= 4) {
            quote.innerText = quizQuotes[2]
        } else if (currentScore <= 6) {
            quote.innerText = quizQuotes[3]
        } else if (currentScore <= 8) {
            quote.innerText = quizQuotes[4]
        } else if (currentScore <= 10) {
            quote.innerText = quizQuotes[5]
        }

        if (highScore < currentScore) {
            highScore = currentScore;
        }
        highestScore.innerText = `Highest Score: ${highScore}/${totalQuestions}`
    }
});

// Retry quiz button
retryBtn.addEventListener('click', () => {
    resultPage.classList.remove('result-section-show');
    startPage.classList.remove('start-section-hide');
    highestScore.classList.add('highest-score-show');
})
