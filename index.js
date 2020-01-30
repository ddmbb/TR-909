//question database
const STORE = [
  {
    question: 'What year was the Roland TR-909 released?',
    answers: [
      '1978',
      '1983',
      '1988',
      '2001'
    ],
    correctAnswer:
      '1983'
  },
  {
    question: 'Who designed the TR-909?',
    answers: [
      'Tadao Kikumoto',
      'Kieran Hebden',
      'Kenichiro Nishi',
      'Don Lewis'
    ],
    correctAnswer:
      'Tadao Kikumoto'
  },
  {
    question:"How many TR-909's were built?",
    answers: [
      '5,000,000',
      '7,000,000',
      '10,000',
      '200,000'
    ],
    correctAnswer: '10,000'
  },
  {
    question: 'How much did the TR-909 originally cost?',
    answers: [
      '$500',
      '$999',
      '$2,999',
      '$1,195'
    ],
    correctAnswer: '$1,195'
  },
  {
    question: 'What does "TR" stand for?',
    answers: [
      'Trans-Regulatory',
      'Tinnitus Respiration',
      'Transistor Rhythm',
      'Triple Riveted'
    ],
    correctAnswer:
      'Transistor Rhythm'
  },
  {
    question: 'Was the TR-909 Analog or Digital?',
    answers: [
      'Analog',
      'Digital',
      'Both',
      'Neither'
    ],
    correctAnswer: 'Both'
  },
  {
    question:'How many different drum sounds does the 909 have?',
    answers: [
      '1',
      '10',
      '100',
      '1000'
    ],
    correctAnswer:
      '10'
  },
  {
    question: 'What innovative feature did the 909 introduce?',
    answers: [
      "LFO's",
      'MIDI',
      'Sub Frequencies',
      'Polyphonic Voices'
    ],
    correctAnswer:
      'MIDI'
  },
  {
    question: 'What was the first official release showcasing the 909?',
    answers: [
      'Frankie Knuckles - The Whistle Song',
      'Madonna - Vogue',
      'Derrick May - Strings of Life',
      'Skinny Puppy - Remission'
    ],
    correctAnswer: 'Skinny Puppy - Remission'
  },
];
  
  //variables to store the quiz score and question number information
  let score = 0;
  let questionNumber = 0;
  
  //template to generate each question
  function generateQuestion() {
    if (questionNumber < STORE.length) {
      return createThing(questionNumber);
    } else {
      $('.questionBox').hide();
      finalScore();
      $('.questionNumber').text(10);
    }
  }
  
  //increments the number value of the "score" variable by one
  //and updates the "score" number text in the quiz view
  function updateScore() {
    score++;
    $('.score').text(score);
  }
  
  //increments the number value of the "question number" variable by one
  //and updates the "question number" text in the quiz view
  function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
  }
  
  //resets the text value of the "question number" and "score" variables
  //and updates their repective text in the quiz view
  function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
  }
  
  //begins the quiz
  function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
      $('.startQuiz').hide();
      $('.questionNumber').text(1);
      $('.questionBox').show();
      $('.questionBox').prepend(generateQuestion());
    });
  }
  
  //submits a selected answer and checks it against the correct answer
  //runs answer functions accordingly
  function submitAnswer() {
    $('.contentBox').on('submit', function (event) {
      event.preventDefault();
      $('.altBox').hide();
      $('.response').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = STORE[questionNumber].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
  }
  
  //creates html for question form
  function createThing(questionIndex) {
    let formMaker = $(`<form>
      <fieldset>
        <legend class="questionText">${STORE[questionIndex].question}</legend>
      </fieldset>
    </form>`)
  
    let fieldSelector = $(formMaker).find('fieldset');
  
    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
      $(`<label class="sizeMe" for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
  }
  
  //resulting feedback if a selected answer is correct
  //increments user score by one
  function correctAnswer() {
    $('.response').html(
      `<h3>Your answer is correct!</h3>
      <img src="images/correct.jpg" alt="monkey wearing glasses" class="images" width="200px">
        <p class="sizeMe">You're a smart monkey!</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
  }
  
  //resulting feedback if a selected answer is incorrect
  function wrongAnswer() {
    $('.response').html(
      `<h3>That's the wrong answer...</h3>
      <img src="images/wrong.jpg" alt="dissapointed monkey face" class="images" width="200px">
      <p class="sizeMe">It's actually:</p>
      <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton button">Next</button>`
    );
  }
  
  //generates the next question
  function nextQuestion() {
    $('.contentBox').on('click', '.nextButton', function (event) {
      $('.altBox').hide();
      $('.questionBox').show();
      updateQuestionNumber();
      $('.questionBox form').replaceWith(generateQuestion());
    });
  }
  
  //determines final score and feedback at the end of the quiz
  function finalScore() {
    $('.final').show();
  
    const great = [
      'Great job!',
      'images/win.jpg',
      'cheering monkey',
      'You sure know a lot about monkeys!'
    ];
  
    const good = [
      'Good, not great.',
      'images/read.jpg',
      'monkey reading a book',
      'You should keep studying about monkeys...'
    ];
  
    const bad = [
      'Do you even know what monkeys look like?',
      'images/end.png',
      'cat in a monkey costume',
      'Or are you more of a cat person?'
    ];
  
    if (score >= 8) {
      array = great;
    } else if (score < 8 && score >= 5) {
      array = good;
    } else {
      array = bad;
    }
    return $('.final').html(
      `<h3>${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="images">
          <h3>Your score is ${score} / 10</h3>
          <p class="sizeMe">${array[3]}</p>
          <button type="submit" class="restartButton button">Restart</button>`
    );
  }
  
  //takes user back to the starting view to restart the quiz
  function restartQuiz() {
    $('.contentBox').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.altBox').hide();
      $('.startQuiz').show();
    });
  }
  
  //runs the functions
  function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  }
  
  $(makeQuiz);
  