// select
const modalContainer = document.querySelector(".modal-cont");
const addBtn = document.querySelector(".add-btn");
const colorModalArr = document.querySelectorAll(".color_modal");
const textArea = document.querySelector(".textarea-cont")
const mainContainer = document.querySelector("main");
// varaible 
const uid = new ShortUniqueId({ length: 5 });
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
        // console.log(task, taskColor);
        // ->  reset your modal to default
        textArea.value = "";
        createTicket(taskColor, task);
    }
})


function createTicket(taskColor, task) {
    /*************added the UI of ticket************/
    const id = uid.rnd();
    const ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket-cont");
    ticketContainer.innerHTML = `<div class="ticket-color ${taskColor}"></div>
            <div class="ticket-id">#${id}</div>
            <div class="ticket-area">${task}</div>
             <i class="fa-solid fa-lock lock_icon"></i>
            `;
            
    mainContainer.appendChild(ticketContainer);

    /***  lock unclock feature */
    const lockButton = ticketContainer.querySelector(".lock_icon");

    handlelockButton(lockButton);

}


function handlelockButton(lockButton) {
    lockButton.addEventListener("click", function () {
        // Lock button : <i class="fa-solid fa-lock "></i>
        // Unlock button:     < i class="fa-solid fa-lock-open" ></ >
        const isLocked = lockButton.classList.contains("fa-lock");

        if (isLocked == true) {
            // have unlock it
            lockButton.classList.remove("fa-lock");
            lockButton.classList.add("fa-lock-open");
        } else {
            // lock it 
            lockButton.classList.remove("fa-lock-open");
            lockButton.classList.add("fa-lock");
        }


    })
}
