function ArithmeticQuiz(formElements) {
  this.totalPages = [];
  this.container = formElements.container;
  this.form = formElements.form;
  this.question = formElements.question;
  this.inputAnswer = formElements.inputAnswer;
  this.nextButton = formElements.nextButton;
  this.score = 0;
  this.count = 0;
  this.totalQuestion = 2;
  this.correctScore = 2;
  this.incorrectScore = 0;
}

ArithmeticQuiz.prototype.init = function() {
  this.createPage();
  this.bindClickToNext();
  this.currentScorePara = $("<p></p>");
  this.form.append(this.currentScorePara);
};

ArithmeticQuiz.prototype.createPage = function() {
  var pageElements = {
    question: this.question,
    inputAnswer: this.inputAnswer
  }
  this.page = new PageInQuiz(pageElements);
  this.page.init();
};

ArithmeticQuiz.prototype.bindClickToNext = function() {
  this.nextButton.on("click", $.proxy(function() {
    this.page.getInputValue();
    this.showScoreForQuestion();
    this.inputAnswer.val("");
    if (++this.count == this.totalQuestion) {
      this.lastPage();
      this.form.remove();
    } else {
      this.createPage();
    }
  }, this));
};

ArithmeticQuiz.prototype.showScoreForQuestion = function() {
  var presentScoreText = "Your score for the previous question is ";
  if (this.page.userAnswer == this.page.correctAns) {
    presentScoreText += this.correctScore;
    this.score += this.correctScore;
  } else {
    presentScoreText += this.incorrectScore;
    this.totalPages.push(this.page);
  }
  this.currentScorePara.text(presentScoreText);
}

ArithmeticQuiz.prototype.lastPage = function() {
  var _this = this;
  var scorePara = $("<p></p>").text("Your total score is " + this.score);
  this.container.append(scorePara);
  var wrongAnswersList = $("<ol></ol>");
  this.totalPages.forEach(function(page, index) {
    _this.incorrectAnsweredListCreator(wrongAnswersList, page);
  });
  this.container.append(wrongAnswersList);
};

ArithmeticQuiz.prototype.incorrectAnsweredListCreator = function(wrongAnswersList, page) {
  var listItem = $("<li></li>");
  var divInsideList = $("<div></div>");
  listItem.append(divInsideList);
  var ques = "What is " + page.randomNum1 + " " + page.operator + " " + page.randomNum2 + "?";
  divInsideList.html("Question: " + ques + "<br>" + "Correct Ans: " + page.correctAns + "<br>" + "Your answer: " + page.userAnswer + "<br>");
  wrongAnswersList.append(listItem);
}

$(document).ready(function() {
  var formElements = {
    container: $("#container"),
    form: $("form"),
    question: $("#question"),
    inputAnswer: $("#answer"),
    nextButton: $("#button")
  }
  var arithmeticQuiz = new ArithmeticQuiz(formElements);
  arithmeticQuiz.init();
});
