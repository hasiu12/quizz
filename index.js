// Twoja wczeœniejsza funkcja
function pokazLinki(element) {
    var linki = element.getElementsByClassName("ukryty")[0];
    if (linki.style.display === "none") {
        linki.style.display = "block";
    } else {
        linki.style.display = "none";
    }
}

// Deklaracja zmiennych
const body = document.body;
var isAnimated = true;

// Funkcja prze³¹czaj¹ca t³o
// Funkcja prze³¹czaj¹ca t³o


// Nowa funkcja do zmiany t³a na podstawie URL
// Nowa funkcja do zmiany t³a na podstawie URL
// Nowa funkcja do zmiany t³a na podstawie URL
function applyCustomBackground() {
    var url = document.getElementById('backgroundUrl').value;
    if (url) {
        document.body.style.backgroundImage = `url('${url}')`;
        document.body.style.animation = 'none';
        localStorage.setItem('background', url);
        localStorage.setItem('animationState', 'off');
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.animation = 'animatedBackground 40s linear infinite';
        localStorage.removeItem('background');
        localStorage.setItem('animationState', 'on');
    }
}

// Funkcja do wczytywania t³a przy ³adowaniu strony
window.onload = function () {
    var background = localStorage.getItem('background');
    var animationState = localStorage.getItem('animationState');

    if (background) {
        document.body.style.backgroundImage = `url('${background}')`;
        document.body.style.animation = 'none';
        isAnimated = false;
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.animation = 'animatedBackground 40s linear infinite';
        isAnimated = true;
    }

    if (animationState === 'on') {
        document.body.className = 'animated';
        isAnimated = true;
    } else {
        document.body.className = 'static';
        isAnimated = false;
    }
}