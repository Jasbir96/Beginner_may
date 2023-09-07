// select
const modalContainer = document.querySelector(".modal-cont");
const addBtn = document.querySelector(".add-btn");
const colorModalArr = document.querySelectorAll(".color_modal");
const textArea = document.querySelector(".textarea-cont")
// add the event listener
addBtn.addEventListener("click", function () {
    modalContainer.style.display = "flex";
})

// select all the color box
for (let i = 0; i < colorModalArr.length; i++) {
    let currentColorElem = colorModalArr[i];
    currentColorElem.addEventListener("click", function (event) {
        // remove the selected from everyone
        for (let i = 0; i < colorModalArr.length; i++) {
            // console.log(colorModalArr[i].classList);
            colorModalArr[i].classList.remove("selected");
        }
        // add to that element thta was clicked
        const targetColorElem = event.target;
        // console.log("````````````````````");
        // console.log(targetColorElem)
        targetColorElem.classList.add("selected");
    })
}


textArea.addEventListener("keypress", function (event) {
    if (event.key == "Enter" && event.shiftKey == false) {
        modalContainer.style.display = "none";
        // -> create the ticket
        // text 
        const task = textArea.value;
        // currentcolor
        const currColorElem = modalContainer.querySelector(".selected");
        const taskColor = currColorElem.getAttribute("currColor");
        console.log(task, taskColor);
        // ->  reste your modal to default
    }
})


