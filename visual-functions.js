function visualNewQuizz() {
    document.getElementById('startQuiz').style.display = 'none'; // Ukryj przycisk "Rozpocznij quiz"
    document.getElementById('quizContent').style.display = 'block'; // Wy�wietl zawarto�� quizu
    document.getElementById('instructions1').style.display = 'none';
    document.getElementById('instructions2').style.display = 'none';
    document.getElementById('instructions3').style.display = 'none';
    document.getElementById('quizSelection').style.display = 'none';
}

function visualMenu() {
    document.getElementById('startQuiz').style.display = 'block'; // Ukryj przycisk "Rozpocznij quiz"
    document.getElementById('quizContent').style.display = 'none'; // Wy�wietl zawarto�� quizu
    document.getElementById('instructions1').style.display = 'block';
    document.getElementById('instructions2').style.display = 'block';
    document.getElementById('instructions3').style.display = 'block';
    document.getElementById('quizSelection').style.display = 'block';
    document.getElementById('results').style.display = 'none'; // Ukryj wyniki
    document.getElementById('menu').style.display = 'none';
    document.getElementById('newQuiz').style.display = 'none';
    document.getElementById('allAnswers').style.display = 'none'; // Ukryj wszystkie odpowiedzi
    kblisko();
}

function kblisko() {
    bilsko.style.display = "none";
    kox.style.display = "none";
    poteznybilsko.style.display = "none";
    bilskopajak.style.display = "none";
    results.style.display = "none";
    document.getElementById('quiz-stats').style.display = 'none';
    
}

function visualResetQuizz() {
    document.getElementById('results').style.display = 'none'; // Ukryj wyniki
    document.getElementById('quizContent').style.display = 'block'; // Wy�wietl zawarto�� quizu
    document.getElementById('newQuiz').style.display = 'none';
    document.getElementById('allAnswers').style.display = 'none'; // Ukryj wszystkie odpowiedzi
    document.getElementById('menu').style.display = 'none';
    kblisko();
}

function visualEndQuiz(isPassed) {
    const quizStats = document.getElementById('quiz-stats');
    const bilsko = document.getElementById('bilsko');
    const poteznybilsko = document.getElementById('poteznybilsko');
    const kox = document.getElementById('kox');
    const bilskopajak = document.getElementById('bilskopajak');

        if (isPassed === true) {
            kox.style.display = 'block';
            kox.style.margin = 'auto';
              }
        else if (correctAnswers < 3 && negativ === false) {
            poteznybilsko.style.display = 'block';
            poteznybilsko.style.margin = 'auto';
            bilskopajak.style.display = 'none';
        }
        else if (negativ === true) {
            bilskopajak.style.display = 'block';
            bilskopajak.style.margin = 'auto';
            poteznybilsko.style.display = 'none';
        }
        else {
            bilsko.style.display = 'block';
            bilsko.style.margin = 'auto';
        }


    quizStats.style.display = 'block';

    document.getElementById('quizContent').style.display = 'none'; // Ukryj zawarto�� quizu
    document.getElementById('results').style.display = 'block'; // Wy�wietl wyniki
    document.getElementById('results').classList.add('styled-text');
    const scoreElement = document.getElementById('score');
    scoreElement.classList.add('score-text');
    scoreElement.innerHTML = `Poprawne odpowiedzi: ${correctAnswers}<br><br> B\u0142\u0119dne odpowiedzi: ${wrongAnswers}<br><br>`;
    scoreElement.style.textAlign = 'center'; // Wy�wietl liczb� poprawnych i b��dnych odpowiedzi
    document.getElementById('menu').style.display = 'block'; // Wy�wietl wyniki

    document.getElementById('showResults').style.display = 'block';
    document.getElementById('newQuiz').style.display = 'block'; // Wy�wietl przycisk "Nowy quiz"
}

function updateButtonsVisibility() {
    if (currentQuestion === numberOfQuestions - 1) {
        document.getElementById('submit').style.display = 'none';
        document.getElementById('endQuiz').style.display = 'block';
    } else {
        document.getElementById('submit').style.display = 'block';
        document.getElementById('endQuiz').style.display = 'none';
    }
}