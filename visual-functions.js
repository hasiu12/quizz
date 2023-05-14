function visualNewQuizz() {
    document.getElementById('startQuiz').style.display = 'none'; // Ukryj przycisk "Rozpocznij quiz"
    document.getElementById('quizContent').style.display = 'block'; // Wyświetl zawartość quizu
    document.getElementById('instructions1').style.display = 'none';
    document.getElementById('instructions2').style.display = 'none';
    document.getElementById('instructions3').style.display = 'none';
    document.getElementById('quizSelection').style.display = 'none';
    let poprawaElements = document.querySelectorAll('.poprawa'); // Znajdź wszystkie elementy o klasie "poprawa"
    poprawaElements.forEach((element) => { // Dla każdego takiego elementu
        element.style.display = 'none'; // Ukryj element
    });
}

function visualMenu() {
    document.getElementById('startQuiz').style.display = 'block'; // Ukryj przycisk "Rozpocznij quiz"
    document.getElementById('quizContent').style.display = 'none'; // Wyświetl zawartość quizu
    document.getElementById('instructions1').style.display = 'block';
    document.getElementById('instructions2').style.display = 'block';
    document.getElementById('instructions3').style.display = 'block';
    document.getElementById('quizSelection').style.display = 'block';
    document.getElementById('results').style.display = 'none'; // Ukryj wyniki
    document.getElementById('menu').style.display = 'none';
    document.getElementById('newQuiz').style.display = 'none';
    document.getElementById('allAnswers').style.display = 'none'; // Ukryj wszystkie odpowiedzi
    kblisko();
    let poprawaElements = document.querySelectorAll('.poprawa'); // Znajdź wszystkie elementy o klasie "poprawa"
    poprawaElements.forEach((element) => { // Dla każdego takiego elementu
        element.style.display = 'block'; // Ukryj element
    });
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
    document.getElementById('quizContent').style.display = 'block'; // Wyświetl zawartość quizu
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

    bilsko.style.display = 'none';
    poteznybilsko.style.display = 'none';
    kox.style.display = 'none';
    bilskopajak.style.display = 'none';

    let displayCase;

    if (isPassed) {
        displayCase = 'kox';
    } else if (correctAnswers < 3 && !negativ) {
        displayCase = 'poteznybilsko';
    } else if (negativ) {
        displayCase = 'bilskopajak';
    } else {
        displayCase = 'bilsko';
    }

    switch (displayCase) {
        case 'kox':
            kox.style.display = 'block';
            kox.style.margin = 'auto';
            break;
        case 'poteznybilsko':
            poteznybilsko.style.display = 'block';
            poteznybilsko.style.margin = 'auto';
            break;
        case 'bilskopajak':
            bilskopajak.style.display = 'block';
            bilskopajak.style.margin = 'auto';
            break;
        case 'bilsko':
        default:
            bilsko.style.display = 'block';
            bilsko.style.margin = 'auto';
            break;
    }

    quizStats.style.display = 'block';

    document.getElementById('quizContent').style.display = 'none'; // Ukryj zawartość quizu
    document.getElementById('results').style.display = 'block'; // Wyświetl wyniki
    document.getElementById('results').classList.add('styled-text');
    const scoreElement = document.getElementById('score');
    scoreElement.classList.add('score-text');
    scoreElement.innerHTML = `Poprawne odpowiedzi: ${correctAnswers}<br><br> B\u0142\u0119dne odpowiedzi: ${wrongAnswers}<br><br>`;
    scoreElement.style.textAlign = 'center'; // Wyświetl liczbę poprawnych i błędnych odpowiedzi
    document.getElementById('menu').style.display = 'block'; // Wyświetl wyniki

    document.getElementById('showResults').style.display = 'block';

    document.getElementById('newQuiz').style.display = 'block'; // Wyświetl przycisk "Nowy quiz"
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
