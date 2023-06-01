// Twoja wcześniejsza funkcja
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

function applyCustomBackground() {
    var url = document.getElementById('backgroundUrl').value;
    if (url) {
        document.body.style.backgroundImage = `url('${url}')`;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center top';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.animation = 'none';
        localStorage.setItem('background', url);
        localStorage.setItem('animationState', 'off');
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundAttachment = 'scroll';
        document.body.style.backgroundPosition = 'initial';
        document.body.style.backgroundRepeat = 'repeat';
        document.body.style.backgroundSize = 'auto';
        document.body.style.animation = 'animatedBackground 40s linear infinite';
        localStorage.removeItem('background');
        localStorage.setItem('animationState', 'on');
    }
}

// Funkcja do wczytywania tła przy ładowaniu strony
window.onload = function () {
    var background = localStorage.getItem('background');
    var animationState = localStorage.getItem('animationState');

    if (background) {
        document.body.style.backgroundImage = `url('${background}')`;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center top';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.animation = 'none';
        isAnimated = false;
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundAttachment = 'scroll';
        document.body.style.backgroundPosition = 'initial';
        document.body.style.backgroundRepeat = 'repeat';
        document.body.style.backgroundSize = 'auto';
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

    var transparency = localStorage.getItem('transparency');
    if (transparency) {
        document.querySelector('.container1').style.backgroundColor = 'rgba(255, 255, 255, ' + transparency + ')';
    }
}

// Dodaj zdarzenie scroll


// Funkcja do zmiany przezroczystości
function changeTransparency() {
    var transparency = document.getElementById('transparencyRange').value;
    document.querySelector('.container1').style.backgroundColor = 'rgba(255, 255, 255, ' + transparency + ')';
    localStorage.setItem('transparency', transparency);
}

// Dodaj obsługę zdarzenia change
document.getElementById('transparencyRange').addEventListener('change', changeTransparency);
