function Question(questionElements, details, quiz) {
  this.questionField = questionElements.questionField;
  this.inputAnswer = questionElements.inputAnswer;
  this.form = questionElements.form;

  this.totalQuestion = details.totalQuestion;
  this.allOperators = details.operators;
  this.correctScore = details.correctScore;
  this.incorrectScore = details.incorrectScore;

  this.quiz = quiz;
}

Question.prototype.init = function() {
  this.createQuestion();
  this.calculateCorrectAns();
}

Question.prototype.createRandomNumbers = function() {
  return Math.floor(Math.random() * this.totalQuestion);
};

Question.prototype.createRandomOperator = function() {
  var randomNumber = Math.floor(Math.random() * this.allOperators.length);
  return this.allOperators[randomNumber];
};

Question.prototype.createQuestion = function() {
  this.randomNum1 = this.createRandomNumbers();
  this.randomNum2 = this.createRandomNumbers();
  this.operator = this.createRandomOperator();
  var questionText = "What is " + this.randomNum1 + " " + this.operator + " " + this.randomNum2 + " ?";
  this.questionField.text(questionText);
};

Question.prototype.calculateCorrectAns = function() {
  var operation = {
    "+": function(a, b){ return a + b;},
    "-": function(a, b){ return a - b;},
    "*": function(a, b){ return a * b;},
    "/": function(a, b){ return a / b;}
  };
  this.correctAns = operation[this.operator](this.randomNum1, this.randomNum2);
};

Question.prototype.calculateScore = function(){
  var presentScoreText = "Your score for the previous question is: ";
  this.userAnswer = this.inputAnswer.val();
  if(this.userAnswer == this.correctAns) {
    presentScoreText += this.correctScore;
    this.quiz.totalScore += this.correctScore;
  } else {
    presentScoreText += this.incorrectScore;
    this.quiz.incorrectQuestions.push(this);
  }
  return presentScoreText;
}

