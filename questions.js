const quiz = [
    {
      question: "What is the correct way to declare a JavaScript variable?",
      answers: ["var myVariable;", "v myVariable;", "variable myVariable;", "myVariable var;"],
      correctAnswer: "var myVariable;"
    },
    {
      question: "Which of the following methods is used to add an element at the end of an array?",
      answers: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: "push()"
    },
    {
      question: "What is the output of console.log(2 + '2');?",
      answers: ["22", "4", "undefined", "NaN"],
      correctAnswer: "22"
    },
    {
      question: "Which of the following is used to loop through an array?",
      answers: ["for", "loop", "while", "Both A and C"],
      correctAnswer: "Both A and C"
    },
    {
      question: "Which operator is used to check both value and type in JavaScript?",
      answers: ["==", "!=", "===", "=>"],
      correctAnswer: "==="
    },
    {
      question: "How can you add a comment in JavaScript?",
      answers: ["<!-- This is a comment -->", "# This is a comment", "/* This is a comment */", "// This is a comment"],
      correctAnswer: "// This is a comment"
    },
    {
      question: "What will typeof null return?",
      answers: ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""],
      correctAnswer: "\"object\""
    },
    {
      question: "What does the Array.prototype.map() method do?",
      answers: ["It mutates the array by adding elements to it.", "It creates a new array by applying a function to each element.", "It removes the last element of an array.", "It finds an element in an array based on a condition."],
      correctAnswer: "It creates a new array by applying a function to each element."
    },
    {
      question: "Which of the following is not a valid data type in JavaScript?",
      answers: ["String", "Character", "Boolean", "Undefined"],
      correctAnswer: "Character"
    },
    {
      question: "Which function is used to parse a string to an integer in JavaScript?",
      answers: ["Number.parseFloat()", "Number.parseInt()", "Number()", "parseNumber()"],
      correctAnswer: "Number.parseInt()"
    }
  ];



  let currentQuestionIndex = 0;
  let totalQuestions = quiz.length;

  const rightAnswer = quiz.map((correct)=>{
    return correct.correctAnswer
  })
  
  // console.log(rightAnswer);