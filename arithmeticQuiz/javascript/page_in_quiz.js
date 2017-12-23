function PageInQuiz(pageElements, details) {
  this.question = pageElements.question;
  this.inputAnswer = pageElements.inputAnswer;
  this.rangeX = details.rangeX;
  this.rangeY = details.rangeY;
  this.operators = details.operators;
}

PageInQuiz.prototype.init = function() {
  this.createRandomNumbers();
  this.calculateCorrectAns();
  this.createQuestion();
}

PageInQuiz.prototype.createRandomNumbers = function() {
  this.randomNum1 = Math.floor(Math.random() * (this.rangeY - this.rangeX) + this.rangeX);
  this.randomNum2 = Math.floor(Math.random() * (this.rangeY - this.rangeX) + this.rangeX);
};

PageInQuiz.prototype.createRandomOperator = function() {
  return Math.floor(Math.random()*this.operators.length)
};

PageInQuiz.prototype.calculateCorrectAns = function() {
  var randomOperator = this.createRandomOperator();
  this.operator = this.operators.join("")[randomOperator];
  this.correctAns = Math.floor(eval("this.randomNum1" + this.operator  +"this.randomNum2"));
};

PageInQuiz.prototype.createQuestion = function() {
  var questionText = "What is " + this.randomNum1 + " " + this.operator + " " + this.randomNum2 + " ?"
  this.question.text(questionText);
};

PageInQuiz.prototype.getInputValue = function() {
  this.userAnswer = this.inputAnswer.val();
};
