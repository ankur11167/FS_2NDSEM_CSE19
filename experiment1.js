window.onload = function () {
    console.log("Welcome to My Website");
};

document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        alert("You clicked: " + this.textContent);
    });
});