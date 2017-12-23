function PageInQuiz(pageElements) {
  this.question = pageElements.question;
  this.inputAnswer = pageElements.inputAnswer;
  this.numberLimit = 20;
  this.numberOfOperators = 4;
}

PageInQuiz.prototype.init = function() {
  this.createRandomNumbers();
  this.calculateCorrectAns();
  this.createQuestion();
}

PageInQuiz.prototype.createRandomNumbers = function() {
  this.randomNum1 = Math.floor(Math.random() * this.numberLimit);
  this.randomNum2 = Math.floor(Math.random() * this.numberLimit);
};

PageInQuiz.prototype.createRandomOperator = function() {
  return Math.floor(Math.random() * this.numberOfOperators);
};

PageInQuiz.prototype.calculateCorrectAns = function() {
  var randomOperator = this.createRandomOperator();
  switch (randomOperator) {
    case 0:
      this.operator = "+";
      this.correctAns = this.randomNum1 + this.randomNum2;
      break;
    case 1:
      this.operator = "-";
      this.correctAns = this.randomNum1 - this.randomNum2;
      break;
    case 2:
      this.operator = "*";
      this.correctAns = this.randomNum1 * this.randomNum2;
      break;
    case 3:
      this.operator = "/";
      this.correctAns = Math.floor(this.randomNum1 / this.randomNum2);
      break;
  }
};

PageInQuiz.prototype.createQuestion = function() {
  var questionText = "What is " + this.randomNum1 + " " + this.operator + " " + this.randomNum2 + " ?"
  this.question.text(questionText);
};

PageInQuiz.prototype.getInputValue = function() {
  this.userAnswer = this.inputAnswer.val();
};
