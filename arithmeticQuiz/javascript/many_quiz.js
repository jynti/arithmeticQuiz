function QuizCreator(details){
  this.quizContainer = details.quizContainer;
  this.numOfQuestions = details.numOfQuestions;
  this.rangeX = details.rangeX;
  this.rangeY = details.rangeY;
  this.operators = details.operators;
  this.totalPages = [];
  this.score = 0;
  this.count = 0;
}

QuizCreator.prototype.init = function(){
  this.createLayout();
  this.createPage();
  this.bindClickToNext();
  this.currentScorePara = $("<p></p>");
  this.form.append(this.currentScorePara);
};

QuizCreator.prototype.createLayout = function(){
  this.container = $("<div></div>");
  this.container.attr("id", "container");

  this.form = $("<form></form>");

  this.question = $("<label></label>");
  this.question.attr({
    id: "question",
    for: "answer"
  });
  this.question.text("Hey is this working");

  this.inputAnswer = $("<input>");
  this.inputAnswer.attr({
    type: "text",
    placeholder: "enter your text",
    id: "answer"
  });

  this.nextButton = $("<input>");
  this.nextButton.attr({
    type: "button",
    id: "button",
    value: "Next"
  });

  this.form.append(this.question);
  this.form.append(this.inputAnswer);
  this.form.append(this.nextButton);

  this.container.append(this.form);

  this.container.css({
    float: "left",
    border: "2px solid black",
    "margin-top": "20px"
  });
  this.quizContainer.append(this.container);
};

QuizCreator.prototype.createPage = function(){
  var pageElements = {
    question: this.question,
    inputAnswer: this.inputAnswer
  }
  var details = {
    rangeX: this.rangeX,
    rangeY: this.rangeY,
    operators: this.operators
  }
  this.page = new Page(pageElements,details);
  this.page.init();
};

QuizCreator.prototype.bindClickToNext = function(){
  this.nextButton.on("click", $.proxy(function(){

    this.page.getInputValue();

    var presentScore = "Your score for the previous question is ";
    if(this.page.userAnswer == this.page.correctAns){
      presentScore +=  "2";
      this.score += 2;
    } else {
      presentScore += "0";
      this.totalPages.push(this.page);
    }

    this.currentScorePara.text(presentScore);
    this.inputAnswer.val("");

    if(++this.count == this.numOfQuestions){
      this.lastPage();
      this.form.remove();
    } else{
      this.createPage();
    }
  }, this));
};

QuizCreator.prototype.lastPage = function() {
  var scorePara = $("<p></p>");
  scorePara.text("Your total score is " + this.score);

  this.container.append(scorePara);
  var wrongAnswersList = $("<ol></ol>");
  this.totalPages.forEach(function(page, index){
    var ques = "What is " + page.randomNum1 + " " + page.operator + " " + page.randomNum2 + "?";

    var listItem = $("<li></li>");
    var divInsideList = $("<div></div>");
    listItem.append(divInsideList);
    divInsideList.html("Question: " + ques + "<br>" + "Correct Ans: " +  page.correctAns + "<br>" + "Your answer: " + page.userAnswer + "<br>");
    wrongAnswersList.append(listItem);
  });
  this.container.append(wrongAnswersList);
};

function Page(pageElements, details) {
  this.question = pageElements.question;
  this.inputAnswer = pageElements.inputAnswer;
  this.rangeX = details.rangeX;
  this.rangeY = details.rangeY;
  this.operators = details.operators;
}

Page.prototype.init = function() {
  this.createRandomNumbers();
  this.calculateCorrectAns();
  this.createQuestion();
}

Page.prototype.createRandomNumbers = function() {
  this.randomNum1 = Math.floor(Math.random() * (this.rangeY - this.rangeX) + this.rangeX);
  this.randomNum2 = Math.floor(Math.random() * (this.rangeY - this.rangeX) + this.rangeX);
};

Page.prototype.createRandomOperator = function() {
  return Math.floor(Math.random()*this.operators.length)
};

Page.prototype.calculateCorrectAns = function() {
  var randomOperator = this.createRandomOperator();
  this.operator = this.operators.join("")[randomOperator];
  this.correctAns = eval("this.randomNum1" + this.operator  +"this.randomNum2");
};

Page.prototype.createQuestion = function() {
  var questionText = "What is " + this.randomNum1 + " " + this.operator + " " + this.randomNum2 + " ?"
  this.question.text(questionText);
};

Page.prototype.getInputValue = function() {
  this.userAnswer = this.inputAnswer.val();
};

$(document).ready(function(){
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
  operators: ['+', '-' ],
  operatorsX: 1,
  operatorsY: 3
}

  var quizCreator2 = new QuizCreator(details);
  quizCreator2.init();
});
