var quiz = {};
var nextQuestionIndex = 0;
var score = 0;

$(function()
{
	getQuiz();
});

function getQuiz()
{
	console.log("Loading quiz json...");
	$.getJSON("quiz.json",function(json)
	{
		console.log("Quiz json loaded");
		quiz = json;
		startQuiz();
	});
}

function startQuiz()
{
	$("#quiztitle").text(quiz.title);
	nextQuestionIndex = 0;
	score = 0;
	showNextQuestion();
}

function showNextQuestion()
{
	if(nextQuestionIndex < quiz.questions.length)
	{
		console.log(quiz.questions[nextQuestionIndex])
		$("#questiontitle").text(quiz.questions[nextQuestionIndex].question);
		$("#questionoptions").empty();
		for(var i=0; i<quiz.questions[nextQuestionIndex].options.length;i++)
		{
			$("#questionoptions").append('<li class="pointer" data-optionindex="'+i+'" data-questionindex="'+ nextQuestionIndex +'">'+ quiz.questions[nextQuestionIndex].options[i] +'</li>');
		}
		nextQuestionIndex++;
	}
	else
	{
		showUserScore();
	}
}

function showUserScore()
{
	$("#quiztitle").empty();
	$("#questiontitle").empty();
	$("#questionoptions").empty();
	$("#userscore").text(score);
	$("#userscoremessage").fadeIn();
	$("#userscore").fadeIn();
	$("#startover").fadeIn();
}


$("#questionoptions").on("click","li",function()
{
	if($(this).data("optionindex") == quiz.questions[$(this).data("questionindex")].answer)
	{
		score++;
	}
	showNextQuestion();
});


$("#startover").on("click","li",function()
{
	startQuiz();
});