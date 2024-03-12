const button = document.querySelector(".button")
const ul = document.querySelector(".list")
let task = document.getElementById("input-task")

let idButton = 0
let arrayTask = []

if(localStorage.getItem('arrayTask') !== null) {
    showLi()
}

task.addEventListener("keydown", function(ev){
    if(ev.key === "Enter"){
        addArray()
    }
})

button.addEventListener("click", addArray)

function addArray(){
    task = document.getElementById("input-task") 
    arrayTask = JSON.parse(localStorage.getItem('arrayTask')) || []
    arrayTask.push(task.value)
    task.value = ""
    
    localStorage.setItem('arrayTask', JSON.stringify(arrayTask));
    showLi()
}

function showLi(){
    ul.innerText = ""
    let id = -1

    arrayTask = JSON.parse(localStorage.getItem('arrayTask'))
    
    arrayTask.forEach((item) => {
        const li = document.createElement("li")
                        
        const buttonExclude = document.createElement("button")

        buttonExclude.id = ++id
        buttonExclude.className = "buttons"
        
        const imgExclude = document.createElement("img")
        imgExclude.classList = "imgExclude"
        
        imgExclude.src = "img/exclude.png"
        buttonExclude.appendChild(imgExclude)
        
        li.append(item, buttonExclude)
        ul.appendChild(li)
    })

    let buttons = document.querySelectorAll(".buttons")
    buttons.forEach(function(btn){
        btn.addEventListener("click", function(){
            idButton = btn.id
            exclude()
        })
    })
}

function exclude(){
    arrayTask = JSON.parse(localStorage.getItem('arrayTask'));
    arrayTask.forEach(function(val, index){
        console.log(index)
        if(index==idButton){
            arrayTask.splice(idButton, 1)
            localStorage.setItem('arrayTask', JSON.stringify(arrayTask));
            showLi()
        }
    })
}