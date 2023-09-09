// select
const modalContainer = document.querySelector(".modal-cont");
const addBtn = document.querySelector(".add-btn");
const colorModalArr = document.querySelectorAll(".color_modal");
const priorityColorsArr = document.querySelectorAll(".toolbox-priority-cont .color");

const textArea = document.querySelector(".textarea-cont")
const mainContainer = document.querySelector("main");


const deleteBtn = document.querySelector(".remove-btn");


// variable 
const uid = new ShortUniqueId({ length: 5 });
const colorsArray = ["red", "blue", "green", "purple"];
let deleteFlag = false;

/*******************************HERE are app level handlers*************************************/
// 0-1 add the event listener to add button so modal should appear 
addBtn.addEventListener("click", function () {
    modalContainer.style.display = "flex";
})

/**** 1-2 adding setting color and change functionality when modal appear*/
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



/********remove all the filter on db clicke***/

for (let i = 0; i < priorityColorsArr.length; i++) {
    let currentColorElem = priorityColorsArr[i];
    currentColorElem.addEventListener("dblclick", function () {
        console.log("dblclick");
        for (let i = 0; i < priorityColorsArr.length; i++) {
            // console.log(colorModalArr[i].classList);
            priorityColorsArr[i].classList.remove("selected");
        }
        /********************ui********************/

        showAllTickets();
    })
}


/**************filtering logic on the tickets**********/
for (let i = 0; i < priorityColorsArr.length; i++) {
    let currentColorElem = priorityColorsArr[i];
    currentColorElem.addEventListener("click", function (event) {
        console.log("click")
        /*******************UI*********************/
        // registering the color
        // remove the selected from everyone
        for (let i = 0; i < priorityColorsArr.length; i++) {
            // console.log(colorModalArr[i].classList);
            priorityColorsArr[i].classList.remove("selected");
        }
        // add to that element thta was clicked
        const targetColorElem = event.target;
        // console.log("````````````````````");
        // console.log(targetColorElem)
        targetColorElem.classList.add("selected");
        /********************ui********************/

        const currentColor = colorsArray[i];
        filterTickets(currentColor);
    })
}

/******1-1 adding listeners to enable ticket creation logic***/
textArea.addEventListener("keypress", function (event) {

    if (event.key == "Enter" && event.shiftKey == false) {
        // make your modal disappear
        modalContainer.style.display = "none";

        // text  from text area 
        const task = textArea.value;
        // currentcolor
        const currColorElem = modalContainer.querySelector(".selected");
        const taskColor = currColorElem.getAttribute("currColor");

        // ->  reset your modal to default
        textArea.value = "";
        /**** 2-1 this function will create the ticket add all the functionalities on card **/
        createTicket(taskColor, task);
    }
})


deleteBtn.addEventListener("click", function () {
    if (deleteFlag == false) {
        deleteBtn.style.color = "red";
        deleteFlag = true;
    } else {
        deleteBtn.style.color = "black";
        deleteFlag = false;

    }
})








/***********************here are helper functions***************************/

function filterTickets(currentColor) {
    console.log("element to be visible will be of color ", currentColor);
    // 1. select all the latest tickets
    const ticketsArr = mainContainer.querySelectorAll(".ticket-cont");

    //  loop through all the tickets
    for (let i = 0; i < ticketsArr.length; i++) {
        const cTicket = ticketsArr[i];
        console.log(cTicket);
        let isPresent = cTicket.querySelector(`.${currentColor}`);
        if (isPresent == null) {
            cTicket.style.display = "none";
        } else {
            cTicket.style.display = "block";
        }
        // only make the ticket visible when the ticket color ==currentColor
    }
}

function showAllTickets() {
    // 1. select all the latest tickets
    const ticketsArr = mainContainer.querySelectorAll(".ticket-cont");
    //  loop through all the tickets
    for (let i = 0; i < ticketsArr.length; i++) {
        const cTicket = ticketsArr[i];
        cTicket.style.display = "block";
        // only make the ticket visible when the ticket color ==currentColor
    }
}



function createTicket(taskColor, task) {
    /*************2-2 added the UI of ticket************/
    const id = uid.rnd();
    /****we are constructing our ticket********/
    const ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket-cont");
    ticketContainer.innerHTML = `<div class="ticket-color ${taskColor}"></div>
            <div class="ticket-id">#${id}</div>
            <div class="ticket-area">${task}</div>
             <i class="fa-solid fa-lock lock_icon"></i>
            `;


    /*******************adding ticket to my app********************/
    mainContainer.appendChild(ticketContainer);

    /***lock and unclock button */
    const lockButton = ticketContainer.querySelector(".lock_icon");
    const ticketArea = ticketContainer.querySelector(".ticket-area");
    const ticketColorElem = ticketContainer.querySelector(".ticket-color");
    // 2-3-1: adding lock and unclock functionality  -> fn call
    handlelockButton(lockButton, ticketArea);

    /*******add the logic of osciallating color*/
    handleChangeColor(ticketColorElem);

    /***********add the logic ticket deleteion*****/
    handeDelete(ticketContainer)
}
// 2-3-2: function that add listener to the lock and unlock of the newly created button   
function handlelockButton(lockButton, ticketArea) {
    lockButton.addEventListener("click", function () {
        // Lock button : <i class="fa-solid fa-lock "></i>
        // Unlock button:     < i class="fa-solid fa-lock-open" ></ >
        const isLocked = lockButton.classList.contains("fa-lock");
        if (isLocked == true) {
            // have unlock it
            lockButton.classList.remove("fa-lock");
            lockButton.classList.add("fa-lock-open");
            // make my ticket task area : editable
            ticketArea.setAttribute("contenteditable", "true")
        } else {
            // lock it 
            lockButton.classList.remove("fa-lock-open");
            lockButton.classList.add("fa-lock");
            ticketArea.setAttribute("contenteditable", "false")
            // make my ticket task area : locked
        }
    })
}
// 2-3-3 
function handleChangeColor(ticketColorElem) {
    // on the ticket we just need to change the colors 

    ticketColorElem.addEventListener("click", function () {
        let cColor = ticketColorElem.classList[1];
        // console.log("cColor", cColor);
        let cidx = colorsArray.indexOf(cColor);
        // 0       1       2         3
        // ["red", "blue", "green", "purple"];
        let nidx = (cidx + 1) % colorModalArr.length;
        // console.log("nidx",nidx);

        let nextColor = colorsArray[nidx];
        ticketColorElem.classList.remove(cColor);
        ticketColorElem.classList.add(nextColor);
    })

}

function handeDelete(ticketContainer) {
    ticketContainer.addEventListener("click", function () {
        if (deleteFlag == true) {
            // let message = prompt("Want to delete");
            // message = message.toLowerCase();
            // if (message == "yes") {
            //     ticketContainer.remove();
            // }
            let res = confirm("do you want to delete it");
            if (res) {
                ticketContainer.remove();
            }

        }
    })
}