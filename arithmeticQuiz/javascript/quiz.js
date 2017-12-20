function ArithmeticQuiz(formElements){
  this.totalPages = [];
  this.container = formElements.container;
  this.form = formElements.form;
  this.question  = formElements.question;
  this.inputAnswer = formElements.inputAnswer;
  this.nextButton = formElements.nextButton;
  this.score = 0;
  this.count = 0;
  this.totalQuestion = 20;
  this.correctScore = 2;
  this.incorrectScore = 0;
}

ArithmeticQuiz.prototype.init = function(){
  this.createPage();
  this.bindClickToNext();
  this.currentScorePara = $("<p></p>");
  this.form.append(this.currentScorePara);
};

ArithmeticQuiz.prototype.createPage = function(){
  var pageElements = {
    question: this.question,
    inputAnswer: this.inputAnswer
  }
  this.page = new Page(pageElements);
  this.page.init();
};

ArithmeticQuiz.prototype.bindClickToNext = function(){
  this.nextButton.on("click", $.proxy(function(){

  	this.page.getInputValue();

  	var presentScore = "Your score for the previous question is ";
  	if(this.page.userAnswer == this.page.correctAns){
  		presentScore +=  this.correctScore;
  		this.score += this.correctScore;
  	} else {
  		presentScore += this.incorrectScore;
  		this.totalPages.push(this.page);
  	}

  	this.currentScorePara.text(presentScore);
  	this.inputAnswer.val("");

  	if(++this.count == this.totalQuestion){
  		this.lastPage();
  		this.form.remove();
  	}	else{
  		this.createPage();
  	}
  }, this));
};

ArithmeticQuiz.prototype.lastPage = function() {
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

function Page(pageElements) {
  this.question = pageElements.question;
  this.inputAnswer = pageElements.inputAnswer;
}

Page.prototype.init = function() {
  this.createRandomNumbers();
  this.calculateCorrectAns();
  this.createQuestion();
}

Page.prototype.createRandomNumbers = function() {
  this.randomNum1 = Math.floor(Math.random() * 20);
  this.randomNum2 = Math.floor(Math.random() * 20);
};

Page.prototype.createRandomOperator = function() {
  return Math.floor(Math.random() * 4);
};

Page.prototype.calculateCorrectAns = function() {
  var randomOperator = this.createRandomOperator();
  switch(randomOperator){
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

Page.prototype.createQuestion = function() {
  var questionText = "What is " + this.randomNum1 + " " + this.operator + " " + this.randomNum2 + " ?"
  this.question.text(questionText);
};

Page.prototype.getInputValue = function() {
  this.userAnswer = this.inputAnswer.val();
};
////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){

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
