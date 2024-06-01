// scrivi qui il tuo codice

const title = document.getElementById("title");
const btn = document.querySelector("#btn");

let count = 0;

function nightShift() {
    if (count === 0) {
        document.body.style.backgroundColor = "var(--background-color)";
        btn.style.backgroundColor = "var(--optional)";
        title.style.color = "var(--extra-dark-gray)";
        count++;
    } else {
        document.body.style.backgroundColor = "var(--extra-dark-gray)";
        btn.style.backgroundColor = "var(--primary)";
        btn.style.color = "var(--tertiary)";
        title.style.color = "var(--background-color)";
        count--;
    }
}


btn.addEventListener('click', nightShift)