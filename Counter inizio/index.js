// scrivi qui il tuo codice

let counter = 0;

const count = document.getElementById("count");
const buttons = document.querySelectorAll(".button-xs");

buttons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        const style = e.currentTarget.classList;
        if (style.contains("minus")) {
            counter--;
        } else if (style.contains("plus")) {
            counter++;
        } else {
            counter = 0;
        }

        if(counter > 0){
            count.style.color= "lightGreen"
        }else if(counter <0){
            count.style.color = "red";
        }else{
            count.style.color =  "white"; 
        }

        count.textContent= counter;
    })
})