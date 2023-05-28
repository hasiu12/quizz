function pokazLinki(element) {
    var linki = element.getElementsByClassName("ukryty")[0];
    if (linki.style.display === "none") {
        linki.style.display = "block";
    } else {
        linki.style.display = "none";
    }
}