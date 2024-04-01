fetch('usa_politics_quiz.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(questions => {
    console.log(questions);

    const questionElement = document.getElementById("question");
    const answerbuttons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const previousButton = document.getElementById("previous-btn");
    
    let currentQuestionIndex = 0; 
    let score = 0; 
    
    function startQuiz() {
        currentQuestionIndex = 0; 
        score = 0; 
        nextButton.innerHTML = "Next"; 
        showQuestion(); // Change to lowercase 's'
    }
    
    function showQuestion() { // Change to lowercase 's'
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
        currentQuestion.options.forEach(option => { // Change to 'options'
            const button = document.createElement("button");
            button.innerHTML = option.text; // Change to 'option.text'
            button.classList.add("btn");
            answerbuttons.appendChild(button);
            if (option.correct) {
                button.dataset.correct = option.correct; // Change to 'option.correct'
            }
            button.addEventListener("click", selectAnswer);
        });
    }
    
    function resetState() {
        while (answerbuttons.firstChild){
            answerbuttons.removeChild(answerbuttons.firstChild);
        }
    }
    
    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        
        const previouslySelectedBtn = answerbuttons.querySelector('.selected');
        if (previouslySelectedBtn) {
            previouslySelectedBtn.classList.remove('selected');
        }
    
        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
        }
    
        selectedBtn.classList.add('selected'); 
        Array.from(answerbuttons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
    
        nextButton.style.display = "block";
    }
    
    function showScore() {
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // Use backticks for string interpolation
        nextButton.innerHTML = "Play again";
        nextButton.style.display = "block";
    }
    
    function handleNextButton() {
        currentQuestionIndex++; 
        if(currentQuestionIndex < questions.length){
            showQuestion(); // Change to lowercase 's'
        } else { 
            showScore();
        }
    }
    
    function handlePreviousButton() {
        currentQuestionIndex--; 
        showQuestion(); // Change to lowercase 's'
    }
    
    nextButton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        } else { 
            startQuiz();
        }
    });
    
    previousButton.addEventListener("click", handlePreviousButton); 
    
    startQuiz();
     

})
.catch(error => {
    console.error('There was a problem fetching the data:', error);
  });

