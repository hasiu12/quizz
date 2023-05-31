// Twoja wcze�niejsza funkcja
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
        document.body.style.backgroundPosition = 'center top';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = "100%";
        document.body.style.animation = 'none';
        document.querySelector('.container1').style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        localStorage.setItem('background', url);
        localStorage.setItem('animationState', 'off');
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundPosition = '';
        document.body.style.backgroundRepeat = '';
        document.body.style.backgroundSize = '';
        document.body.style.animation = 'animatedBackground 40s linear infinite';
        document.querySelector('.container1').style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        localStorage.removeItem('background');
        localStorage.setItem('animationState', 'on');
    }
}

// Funkcja do wczytywania t�a przy �adowaniu strony
window.onload = function () {
    var background = localStorage.getItem('background');
    var animationState = localStorage.getItem('animationState');

    if (background) {
        document.body.style.backgroundImage = `url('${background}')`;
        document.body.style.backgroundPosition = 'center top';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.animation = 'none';
        document.querySelector('.container1').style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        isAnimated = false;
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundPosition = '';
        document.body.style.backgroundRepeat = '';
        document.body.style.backgroundSize = '';
        document.body.style.animation = 'animatedBackground 40s linear infinite';
        document.querySelector('.container1').style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
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
window.addEventListener('scroll', function () {
    document.body.style.backgroundPosition = 'center ' + (-window.scrollY) + 'px';
});

// Funkcja do zmiany przezroczysto�ci
function changeTransparency() {
    var transparency = document.getElementById('transparencyRange').value;
    document.querySelector('.container1').style.backgroundColor = 'rgba(255, 255, 255, ' + transparency + ')';
    localStorage.setItem('transparency', transparency);
}

// Dodaj obs�ug� zdarzenia change
document.getElementById('transparencyRange').addEventListener('change', changeTransparency);