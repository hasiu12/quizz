// Zmienne globalne
let currentQuestion = 0; // Indeks aktualnego pytania
let userAnswer; // Wybrana przez u�ytkownika odpowied�
let answerChecked = false; // Czy odpowied� zosta�a sprawdzona
let correctAnswers = 0; // Liczba poprawnych odpowiedzi
let wrongAnswers = 0; // Liczba b��dnych odpowiedzi
let quizData; // Dane z pliku JSON
let initialDataLoaded = false; // Czy dane zosta�y ju� wczytane
let isLastAnswerNone = false;
const noneOfTheAboveOption = '�adne z powy�szych';
const numberOfQuestions = 15;
const allOfTheAboveOption = 'wszystkie powy�sze';
let odpowiedzi = [];
let userAnswers = new Array(numberOfQuestions).fill(null);
let quizzes = [];
let variant = false;
let negativ = false;
let isFirstQuiz = true;

// Funkcja pobieraj�ca dane z pliku JSON
async function fetchData() {
    console.log('Fetching quiz data...');
    if (!initialDataLoaded) {
        try {
            // Pobierz dane z JSONbin.io
            const response = await fetch('https://api.jsonbin.io/v3/b/6452eae69d312622a356f1fc', {
                headers: {
                    'X-Master-Key': '$2b$10$BbsRmIDNnUiQ7WXSyaL.HuG/KKFiqa5.2mnBS2v3nzTA60pusrz1.'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonResponse = await response.json(); // Pobierz dane z odpowiedzi
            quizData = jsonResponse.record; // Przypisz dane do quizData
            const allQuestions = quizData.slice(); // Stw�rz kopi� wszystkich pyta�

            initialDataLoaded = true;
            generateQuizzes(allQuestions);
        } catch (error) {
            console.error('Error while fetching JSON data:', error);
        }
    }
    if (variant === false) {
        shuffleArray(quizData);
    }

    displayQuestion();

}

document.getElementById('startQuiz').addEventListener('click', function () {
    
    answerChecked = false;
    updateStats(false, false);
    updateStatsDisplay();
    visualNewQuizz();
    fetchData(); // Pobierz dane z pliku JSON
    if (isFirstQuiz) {
        isFirstQuiz = false;
    }
});

document.getElementById('submit').addEventListener('click', function () {
    if (!answerChecked) {
        // Pobierz zaznaczon� odpowied�
        const checkedAnswer = document.querySelector('input[name="answer"]:checked');

        if (checkedAnswer) {
            userAnswer = parseInt(checkedAnswer.value); // Przekszta�� warto�� zaznaczonej odpowiedzi na liczb�
            checkAnswer(); // Sprawd� odpowied�
            answerChecked = true;
        } else {
            // Usu� event listener na zdarzenie 'keydown' przed wy�wietleniem alertu
            document.removeEventListener('keydown', handleNumericKeyPress);

           // alert('Wybierz odpowied� przed sprawdzeniem!'); // Wy�wietl ostrze�enie, je�li nie zaznaczono �adnej odpowiedzi

            // Dodaj ponownie event listener na zdarzenie 'keydown' po zamkni�ciu alertu
            document.addEventListener('keydown', (event) => handleNumericKeyPress(event, answersCopy));
        }
    }
});

document.getElementById('endQuiz').addEventListener('click', function () {
    endQuiz();
});

document.getElementById('showResults').addEventListener('click', function () {
    showAllAnswers();

});

document.getElementById('menu').addEventListener('click', function () {
    currentQuestion = 0; // Zresetuj indeks pytania
    correctAnswers = 0; // Zresetuj liczb� poprawnych odpowiedzi
    wrongAnswers = 0; // Zresetuj liczb� b��dnych odpowiedzi
    variant = false;
    visualMenu();

});

document.addEventListener('DOMContentLoaded', () => {
    
    const quizButtons = document.querySelectorAll('.quiz-btn');
    quizButtons.forEach((button) => {
        button.addEventListener('click', handleQuizButtonClick);
    });
    fetchData();
});

document.getElementById('newQuiz').addEventListener('click', function () {

    restartQuiz();

});

