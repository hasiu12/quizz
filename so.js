// Zmienne globalne
let currentQuestion = 0; // Indeks aktualnego pytania
let userAnswer; // Wybrana przez u¿ytkownika odpowiedŸ
let answerChecked = false; // Czy odpowiedŸ zosta³a sprawdzona
let correctAnswers = 0; // Liczba poprawnych odpowiedzi
let wrongAnswers = 0; // Liczba b³êdnych odpowiedzi
let quizData; // Dane z pliku JSON
let initialDataLoaded = false; // Czy dane zosta³y ju¿ wczytane
let isLastAnswerNone = false;
const noneOfTheAboveOption = '¿adne z powy¿szych';
let numberOfQuestions = 15;
const allOfTheAboveOption = 'wszystkie powy¿sze';
let odpowiedzi = [];
let userAnswers = new Array(numberOfQuestions).fill(null);
let quizzes = [];
let variant = false;
let negativ = false;
let isFirstQuiz = true;
let allQuestions;
// Funkcja pobieraj¹ca dane z pliku JSON
async function fetchData() {
    console.log('Fetching quiz data...');
    if (!initialDataLoaded) {
        try {
            // Pobierz dane z JSONbin.io
            const response = await fetch('https://api.jsonbin.io/v3/b/647ca2a09d312622a36a564c', {
                headers: {
                    'X-Master-Key': '$2b$10$BbsRmIDNnUiQ7WXSyaL.HuG/KKFiqa5.2mnBS2v3nzTA60pusrz1.'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonResponse = await response.json(); // Pobierz dane z odpowiedzi
            allQuestions = jsonResponse.record; // Przypisz dane do allQuestions
            quizData = allQuestions.slice(); // Stwórz kopię wszystkich pytań w quizData

            initialDataLoaded = true;
        } catch (error) {
            console.error('Error while fetching JSON data:', error);
        }
    } else { 
        quizData = allQuestions.slice(); // Przypisz dane do quizData
    }

    if (!variant) {
        shuffleArray(quizData);
    }

    displayQuestion();
}


document.getElementById('startQuiz').addEventListener('click', function () {
   
    numberOfQuestions=15;
    answerChecked = false;
    updateStats(false, false);
    updateStatsDisplay();
    visualNewQuizz();
     // Pobierz dane z pliku JSON
    if (!initialDataLoaded || variant) {
        variant = false;
        isFirstQuiz = false;
        fetchData();
    }
});

let isNumericKeyPressHandled = false; // Zmienna flagowa dla zdarzenia 'keydown'

document.getElementById('submit').addEventListener('click', function () {
    if (!answerChecked) {
        // Pobierz zaznaczoną odpowiedź
        const checkedAnswer = document.querySelector('input[name="answer"]:checked');

        if (checkedAnswer) {
            userAnswer = parseInt(checkedAnswer.value);
            checkAnswer();
            answerChecked = true;
        } else {
            // Usuń event listener na zdarzenie 'keydown' tylko jeśli nie zostało jeszcze obsłużone
            if (!isNumericKeyPressHandled) {
                document.removeEventListener('keydown', handleNumericKeyPress);
                isNumericKeyPressHandled = true;
            }

            alert('Wybierz odpowiedź przed sprawdzeniem!');

            // Dodaj ponownie event listener na zdarzenie 'keydown' po zamknięciu alertu
           // document.addEventListener('keydown', (event) => handleNumericKeyPress(event, answersCopy));
            isNumericKeyPressHandled = false;
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
    correctAnswers = 0; // Zresetuj liczbê poprawnych odpowiedzi
    wrongAnswers = 0; // Zresetuj liczbê b³êdnych odpowiedzi
    visualMenu();

});



document.getElementById('newQuiz').addEventListener('click', function () {

    restartQuiz();

});

async function createCustomQuizWithRange(startId, endId) {
  await fetchData(); // Pobierz wszystkie dane quizu

  // Stwórz nowy zestaw danych quizu zawierający tylko pytania o określonych ID z zakresu
  let customQuizData = quizData.filter((question) => {
    return question.id >= startId && question.id <= endId;
  });

  // Zastąp quizData naszym nowym zestawem danych quizu
  quizData = customQuizData;
    visualNewQuizz();
    variant = true;
  numberOfQuestions = customQuizData.length;

  currentQuestion = 0; // Zacznij od pierwszego pytania
  displayQuestion(); // Wyświetl pytanie
}

// Możemy teraz dodać przycisk, który po kliknięciu wywoła `displayQuestionById`
// Przykładowo, jeżeli chcemy wyświetlić pytanie o ID 135:



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

// Funkcja tworz¹ca element HTML z odpowiedzi¹
function createAnswerElement(answer, index, shuffledIndex) {
    const li = document.createElement('li'); // Stwórz element listy
    const input = document.createElement('input'); // Stwórz element input
    const label = document.createElement('label'); // Stwórz element label
    const answerContainer = document.createElement('div');

    // Ustaw atrybuty dla elementu input
    input.type = 'radio';
    input.name = 'answer';
    input.value = index;
    input.id = `answer-${index}`;

    // Ustaw atrybuty dla elementu label
    label.htmlFor = `answer-${index}`;
    label.textContent = answer;

    // Dodaj zdarzenie click do elementu answerContainer
    answerContainer.addEventListener('click', () => {
        // SprawdŸ, czy input nie jest ju¿ zaznaczony
        if (!input.checked) {
            // Jeœli nie, zaznacz go
            input.checked = true;
        }
    });

    // Dodaj zdarzenie click do elementu input
    input.addEventListener('click', (event) => {
        // Zapobiegaj podwójnemu wywo³aniu zdarzenia click
        event.stopPropagation();
    });

    // Dodaj klasê 'answer-container' do elementu answerContainer
    answerContainer.classList.add('answer-container');
    // Dodaj element input do answerContainer
    answerContainer.appendChild(input);

    // Dodaj elementy input i label do elementu listy
    answerContainer.appendChild(label);
    li.appendChild(answerContainer);

    // Aktualizacja atrybutów elementu label
    label.htmlFor = `answer-${index}`;
    label.textContent = answer;
    label.classList.add('answer-text'); // Dodaj klasê 'answer-text'

    return li; // Zwróæ element listy z odpowiedzi¹
}

function endQuiz() {
    // Sprawdzanie ostatniej odpowiedzi
    if (!answerChecked) {
        const checkedAnswer = document.querySelector('input[name="answer"]:checked');
        if (checkedAnswer) {
            const checkedValue = parseInt(checkedAnswer.value);
            if (checkedValue === -1) {
                userAnswer = '¿adne z powy¿szych';
            } else {
                userAnswer = checkedValue;
            }
            const correctAnswer = quizData[currentQuestion].correctAnswer;

            if (userAnswer === correctAnswer) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
            answerChecked = true;
        } else {
            // alert('Wybierz odpowiedŸ przed zakoñczeniem quizu!');
            return;
        }
    }
    quizData[currentQuestion].userAnswer = userAnswer; // Zapisz odpowiedŸ u¿ytkownika w quizData

    const isCompleted = true; // Quiz zawsze zostanie ukoñczony, gdy wywo³asz tê funkcjê
    const isPassed = (correctAnswers / numberOfQuestions) >= 0.65;
    updateStats(isCompleted, isPassed);
    //updateStatsDisplay();
    
    visualEndQuiz(isPassed);
}


// Funkcja zamieniaj¹ca ostatni¹ odpowiedŸ na "¿adne z powy¿szych"
function replaceLastAnswerWithNone(answersElement, answers) {
    const noneExists = checkIfNoneExists(answers);
    const allExists = checkIfAllExists(answers);

    if (!noneExists && !allExists) {
        const lastIndex = answers.length - 1;

        // Pobierz ostatni element odpowiedzi
        const lastAnswer = answersElement.children[lastIndex];
        const input = lastAnswer.querySelector('input');
        const label = lastAnswer.querySelector('label');

        // Zaktualizuj atrybuty dla ostatniej odpowiedzi
        input.value = -1;
        input.id = `answer-${lastIndex}`;
        label.htmlFor = `answer-${lastIndex}`;
        label.textContent = '\u017badne z powy\u017cszych';

        // Zaktualizuj listê odpowiedzi
        answers[lastIndex].answer = '¿adne z powy¿szych';
    }
}

// Funkcja resetuj¹ca zaznaczenie odpowiedzi
function resetAnswer() {
    const checkedAnswer = document.querySelector('input[name="answer"]:checked'); // Pobierz zaznaczon¹ odpowiedŸ
    if (checkedAnswer) {
        checkedAnswer.checked = false; // Odznacz zaznaczon¹ odpowiedŸ
    }
    answerChecked = false; // Ustaw, ¿e odpowiedŸ nie zosta³a sprawdzona
}
let spaceKeyEnabled = true; // Flaga informująca, czy klawisz spacji jest dostępny
const spaceKeyDelay = 5000; // Opóźnienie w milisekundach (0.5 sekundy)

let spaceKeyPressed = false;
function handleNumericKeyPress(event, answersCopy) {
  const key = event.key;
  const numericKeys = ['1', '2', '3', '4', '5'];

  const numberOfAnswers = answersCopy.length; // Pobierz ilość odpowiedzi

  if (numericKeys.includes(key)) {
    const answerIndex = parseInt(key) - 1;
    if (answerIndex >= 0 && answerIndex < numberOfAnswers) { // Sprawdź, czy wybrany indeks odpowiedzi jest w zakresie
      const answerInput = document.getElementById(`answer-${answersCopy[answerIndex].index}`);
      if (answerInput) {
        answerInput.checked = true;
      }
    }
  } else if (key === ' ') {
    event.preventDefault(); // Zapobiegamy domyślnemu działaniu spacji (przewijanie strony)

    // Jeśli wcześniej został już wcisnięty klawisz spacji, przerywamy działanie
    if (spaceKeyPressed) {
      return;
    }

    spaceKeyPressed = true;

    if (currentQuestion === numberOfQuestions - 1) {
      if (!answerChecked) {
        document.getElementById('endQuiz').click();
      }
    } else if (!answerChecked) {
      document.getElementById('submit').click();
    }
    updateButtonsVisibility();

    // Resetowanie zmiennej spaceKeyPressed po 1 sekundzie
    setTimeout(() => {
      spaceKeyPressed = false;
    }, 300);
  }
}


function checkIfNoneExists(answers) {
    for (const answer of answers) {
        if (answer.toLowerCase() === 'żadne z powy¿szych') {
            return true;
        }
    }
    return false;
}

function checkIfAllExists(answers) {
    for (const answer of answers) {
        if (answer.toLowerCase() === 'wszystkie powyższe') {
            return true;
        }
    }
    return false;
}

function showAllAnswers() {
    kblisko();
    document.getElementById('menu').style.display = 'block'; // Wyœwietl wyniki
    const answersContainer = document.getElementById('allAnswers');
    answersContainer.innerHTML = '';
    odpowiedzi = odpowiedzi.slice(0, numberOfQuestions);
    quizData.forEach((data, index) => {
        if (!odpowiedzi[index]) {
            return;
        }

        const questionElement = document.createElement('div');

        if (variant) {
            const explainButton = document.createElement('button');
            explainButton.textContent = 'Wyjaœnij';
            explainButton.addEventListener('click', () => {
                explainAnswer(index);
            });
            questionElement.appendChild(explainButton);
        }

        questionElement.innerHTML = `<h3>Pytanie ${index + 1}: ${data.question}</h3>`;


        if (odpowiedzi[index].length > 0) {
            const correctAnswerIndex = data.correctAnswer;

            odpowiedzi[index].forEach((answer, answerIndex) => {
                const answerElement = document.createElement('p');

                if (answer.index === data.userAnswer) {
                    answerElement.style.color = 'red';
                }
                if (answer.index === correctAnswerIndex) {
                    answerElement.style.color = 'green';
                }


                answerElement.innerHTML = `${answerIndex + 1}. ${answer.answer}`;
                questionElement.appendChild(answerElement);
                answerElement.classList.add('answer-container');
                answerElement.style.cursor = 'default';
            });
        }

        answersContainer.appendChild(questionElement);
    });

    document.getElementById('allAnswers').style.display = 'block';
}

function explainAnswer(questionIndex) {
    const explanation = quizData[questionIndex].explanation;
    alert(explanation);
}

function restartQuiz() {
    visualResetQuizz();
    currentQuestion = 0; // Zresetuj indeks pytania
    correctAnswers = 0; // Zresetuj liczbê poprawnych odpowiedzi
    wrongAnswers = 0; // Zresetuj liczbê b³êdnych odpowiedzi

    fetchData(); // Pobierz dane z pliku JSON
}   

// Funkcja sprawdzająca odpowiedź i zliczająca wyniki
function checkAnswer() {
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    if (userAnswer === correctAnswer) {
        correctAnswers++;
    } else {
        wrongAnswers++;
    }

    quizData[currentQuestion].userAnswer = userAnswer; // Zapisz odpowiedź użytkownika w quizData

    currentQuestion++;

    if (currentQuestion < numberOfQuestions) {
        let delay = 10;
        // Jeśli jest to pierwszy quiz i pierwsze pytanie, zwiększ opóźnienie
        if (isFirstQuiz && currentQuestion === 1) {
            delay = 1000; // Ustaw większe opóźnienie, na przykład 1000 ms (1 sekunda)
        }
        setTimeout(() => {
            displayQuestion();
            resetAnswer();
        }, delay);
    }
}

function createShuffledAnswersCopy(answers) {
  const answersCopy = answers.map((answer, index) => ({ answer, index }));
  const shuffledAnswers = shuffleArray1(answersCopy);
  return shuffledAnswers;
}

async function displayQuestion() {
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');

  // Ustaw treść pytania na stronie
  questionElement.classList.add('question-container');
  questionElement.innerHTML = `Pytanie ${currentQuestion + 1}/${numberOfQuestions}<br>${quizData[currentQuestion].question}`;

  // Wyczyść listę odpowiedzi
  answersElement.innerHTML = '';

  const answersCopy = createShuffledAnswersCopy(quizData[currentQuestion].answers);
  odpowiedzi[currentQuestion] = answersCopy;

  answersCopy.forEach(({ answer, index }) => {
    const li = createAnswerElement(answer, index);
    answersElement.appendChild(li);
  });



  // Obsługa zdarzeń klawisza "keydown"
  document.addEventListener('keydown', (event) => {
    setTimeout(() => {
      handleNumericKeyPress(event, answersCopy);
    }, spaceKeyEnabled ? 0 : spaceKeyDelay);
  });


    questionElement.classList.add('question-text');


    // Jeśli jesteśmy przy ostatnim pytaniu, ukryj przycisk "Następne pytanie" i wyświetl przycisk "Zakończ quiz"
    updateButtonsVisibility();
    resetAnswer();
}

// Funkcja mieszająca elementy tablicy
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Zamienia miejscami elementy i oraz j w tablicy
    }
}

function shuffleArray1(array) {
    const noneExists = checkIfNoneExists(quizData[currentQuestion].answers);
    const allExists = checkIfAllExists(quizData[currentQuestion].answers);

    if (!noneExists && !allExists) {
        for (let i = array.length - 2; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    } else {
        const endIndex = array.length - (allExists && noneExists ? 4 : 3);
        for (let i = endIndex; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        if (allExists) {
            const allIndex = quizData[currentQuestion].answers.findIndex(answer =>
                answer.toLowerCase() === 'wszystkie powyższe'
            );
            [array[array.length - 2], array[allIndex]] = [array[allIndex], array[array.length - 2]];
        }
        if (noneExists) {
            const noneIndex = quizData[currentQuestion].answers.findIndex(answer =>
                answer.toLowerCase() === 'żadne z powyższych'
            );
            [array[array.length - 1], array[noneIndex]] = [array[noneIndex], array[array.length - 1]];
        }
    }
    return array;
}

function updateStatsDisplay() {
    document.getElementById('attempts').textContent = localStorage.getItem('attempts') || '0';
    document.getElementById('completed').textContent = localStorage.getItem('completed') || '0';
    document.getElementById('passed').textContent = localStorage.getItem('passed') || '0';
}

function updateStats(isCompleted, isPassed) {
    const attempts = parseInt(localStorage.getItem('attempts') || '0') + 1;
    const completed = parseInt(localStorage.getItem('completed') || '0') + (isCompleted ? 1 : 0);
    const passed = parseInt(localStorage.getItem('passed') || '0') + (isPassed ? 1 : 0);
    const failedInARow = parseInt(localStorage.getItem('failedInARow') || '0');
    let negativePoints = parseInt(localStorage.getItem('negativePoints') || '0');
    negativ = false;

    if (isPassed) {
        localStorage.setItem('failedInARow', '0');
    } else {
        const updatedFailedInARow = failedInARow + 1;
        localStorage.setItem('failedInARow', updatedFailedInARow);

        if (updatedFailedInARow >= 10) {
            negativePoints += 1;
            localStorage.setItem('negativePoints', negativePoints);
            localStorage.setItem('failedInARow', '0');
            negativ = true;
        }
    }

    localStorage.setItem('attempts', attempts);
    localStorage.setItem('completed', completed);
    localStorage.setItem('passed', passed);
}


    document.getElementById('2003').addEventListener('click', function () {
    createCustomQuizWithRange(1, 30);
});
    document.getElementById('2005').addEventListener('click', function () {
    createCustomQuizWithRange(31, 44);
});
document.getElementById('2006a').addEventListener('click', function () {
    createCustomQuizWithRange(45, 70);
});
document.getElementById('2006b').addEventListener('click', function () {
    createCustomQuizWithRange(71, 96);
});
document.getElementById('2007').addEventListener('click', function () {
    createCustomQuizWithRange(97, 127);
});





document.getElementById('2017').addEventListener('click', function () {
    createCustomQuizWithRange(149, 168);
});

document.getElementById('2022').addEventListener('click', function () {
    createCustomQuizWithRange(128, 148);
});