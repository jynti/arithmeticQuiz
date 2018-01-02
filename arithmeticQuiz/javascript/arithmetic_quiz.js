function ArithmeticQuiz(formElements, details) {
  this.incorrectQuestions = [];
  this.container = formElements.container;
  this.form = formElements.form;
  this.questionField = formElements.question;
  this.inputAnswer = formElements.inputAnswer;
  this.nextButton = formElements.nextButton;
  this.count = 0;
  this.totalScore = 0;
  this.details = details;
  this.totalQuestion = details.totalQuestion;
}

ArithmeticQuiz.prototype.init = function() {
  this.form.append($("<p></p>"));
  this.createQuestion();
  this.bindClickToNext();
};

ArithmeticQuiz.prototype.createQuestion = function() {
  var questionElements = {
    questionField: this.questionField,
    inputAnswer: this.inputAnswer,
    form: this.form
  }
  this.question = new Question(questionElements, this.details, this);
  this.question.init();
};

ArithmeticQuiz.prototype.bindClickToNext = function() {
  var _this = this;
  this.form.on("submit", function(event) {
    if (_this.inputAnswer.val().trim() != "") {
      _this.nextQuestion();
    }
    return false;
  })
};

ArithmeticQuiz.prototype.nextQuestion = function() {
  var scoreOutput = this.question.calculateScore();
  if (++this.count == this.totalQuestion) {
    this.lastQuestion();
    this.form.remove();
  } else {
    this.form.find("p").empty().append(scoreOutput);
    this.createQuestion();
    this.inputAnswer.val("");
  }
}

ArithmeticQuiz.prototype.lastQuestion = function() {
  var _this = this;
  var scorePara = $("<p></p>").text("Your total score is " + this.totalScore);
  this.container.append(scorePara);
  var wrongAnswersList = $("<ol></ol>");
  this.incorrectQuestions.forEach(function(question, index) {
    _this.incorrectAnsweredListCreator(wrongAnswersList, question);
  });
  this.container.append(wrongAnswersList);
};

ArithmeticQuiz.prototype.incorrectAnsweredListCreator = function(wrongAnswersList, question) {
  var listItem = $("<li></li>");
  var divInsideList = $("<div></div>");
  listItem.append(divInsideList);
  var ques = "What is " + question.randomNum1 + " " + question.operator + " " + question.randomNum2 + "?";
  divInsideList.html("Question: " + ques + "<br>" + "Correct Ans: " + question.correctAns + "<br>" + "Your answer: " + question.userAnswer + "<br>");
  wrongAnswersList.append(listItem);
}

$(document).ready(function() {
  var formElements = {
    container: $("[data-type='container']"),
    form: $("[data-type='form']"),
    question: $("[data-type='question']"),
    inputAnswer: $("[data-type='answer']"),
    nextButton: $("[data-type='button']")
  };
  var details = {
    operators: ['+', '-', '*', '/'],
    totalQuestion: 5,
    correctScore: 2,
    incorrectScore: 0
  };
  var arithmeticQuiz = new ArithmeticQuiz(formElements, details);
  arithmeticQuiz.init();
});
