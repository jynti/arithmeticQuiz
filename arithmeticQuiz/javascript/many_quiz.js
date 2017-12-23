function QuizCreator(details) {
  this.quizContainer = details.quizContainer;
  this.numOfQuestions = details.numOfQuestions;
  this.rangeX = details.rangeX;
  this.rangeY = details.rangeY;
  this.operators = details.operators;
  this.totalPages = [];
  this.score = 0;
  this.count = 0;
  this.correctScore = 2;
  this.incorrectScore = 0;
}

QuizCreator.prototype.init = function() {
  this.createLayout();
  this.createPage();
  this.bindClickToNext();
  this.currentScorePara = $("<p></p>");
  this.form.append(this.currentScorePara);
};

QuizCreator.prototype.createLayout = function() {
  this.container = $("<div></div>").attr("id", "container");
  this.form = $("<form></form>");

  this.question = $("<label></label>").attr({
    id: "question",
    for: "answer"
  });

  this.inputAnswer = $("<input>").attr({
    type: "text",
    placeholder: "enter your text",
    id: "answer"
  });

  this.nextButton = $("<input>").attr({
    type: "button",
    id: "button",
    value: "Next"
  });

  this.form.append(this.question);
  this.form.append(this.inputAnswer);
  this.form.append(this.nextButton);
  this.container.append(this.form);
  this.quizContainer.append(this.container);
};

QuizCreator.prototype.createPage = function() {
  var pageElements = {
    question: this.question,
    inputAnswer: this.inputAnswer
  }
  var details = {
    rangeX: this.rangeX,
    rangeY: this.rangeY,
    operators: this.operators
  }
  this.page = new PageInQuiz(pageElements, details);
  this.page.init();
};

QuizCreator.prototype.bindClickToNext = function() {
  this.nextButton.on("click", $.proxy(function() {

    this.page.getInputValue();
    this.showScoreForQuestion();
    this.inputAnswer.val("");

    if (++this.count == this.numOfQuestions) {
      this.lastPage();
      this.form.remove();
    } else {
      this.createPage();
    }
  }, this));
};

QuizCreator.prototype.showScoreForQuestion = function() {
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

QuizCreator.prototype.lastPage = function() {
  var _this = this;
  var scorePara = $("<p></p>").text("Your total score is " + this.score);
  this.container.append(scorePara);
  var wrongAnswersList = $("<ol></ol>");
  this.totalPages.forEach(function(page, index) {
    _this.incorrectAnsweredListCreator(wrongAnswersList, page);
  });
  this.container.append(wrongAnswersList);
};

QuizCreator.prototype.incorrectAnsweredListCreator = function(wrongAnswersList, page) {
  var listItem = $("<li></li>");
  var divInsideList = $("<div></div>");
  listItem.append(divInsideList);
  var ques = "What is " + page.randomNum1 + " " + page.operator + " " + page.randomNum2 + "?";
  divInsideList.html("Question: " + ques + "<br>" + "Correct Ans: " + page.correctAns + "<br>" + "Your answer: " + page.userAnswer + "<br>");
  wrongAnswersList.append(listItem);
}

$(document).ready(function() {
  var details = {
    quizContainer: $("#quizContainer"),
    rangeX: 20,
    rangeY: 30,
    numOfQuestions: 4,
    operators: ['+', '-', '*', '/'],
    operatorsX: 1,
    operatorsY: 3
  }
  var quizCreator1 = new QuizCreator(details);
  quizCreator1.init();

  var details = {
    quizContainer: $("#quizContainer"),
    rangeX: 2,
    rangeY: 5,
    numOfQuestions: 5,
    operators: ['+', '-'],
    operatorsX: 1,
    operatorsY: 3
  }

  var quizCreator2 = new QuizCreator(details);
  quizCreator2.init();
});
