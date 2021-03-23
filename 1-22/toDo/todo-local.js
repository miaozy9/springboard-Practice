const form = document.querySelector('#toDo');
const ul = document.querySelector('#list');

let count = 0;

if(localStorage != null){

    console.log(localStorage)
    
    for(let i = count; i < localStorage.length; i++){
        let restoreElement = JSON.parse(localStorage.getItem(i));
        // console.log(restoreElement)
        let restoreToDo = document.createElement('li');
        restoreToDo.innerText = restoreElement.textStored + " ";
        restoreToDo.id = i;
        // console.log("restoreToDo is " + restoreToDo.outerHTML);
        if(restoreElement.deleted === true){continue;}
        if(restoreElement.done === true){
            restoreToDo.style.textDecoration = "line-through";
            let btn = document.createElement("button")
            btn.innerText = "Delete"
            restoreToDo.append(btn);  
            ul.appendChild(restoreToDo);
        }
        else{
            let btn = document.createElement("button")
            btn.innerText = "Delete"
            restoreToDo.append(btn);  
            ul.appendChild(restoreToDo);
        }
    }
}

count = localStorage.length;

form.addEventListener('submit', function(e){
    e.preventDefault();
    
    let toDo = document.createElement('li');
    toDo.id = count;
    textField = document.getElementById('txt').value
    toDo.innerText = textField + " ";
    let btn = document.createElement("button")
    btn.innerText = "Delete"
    toDo.append(btn);
    ul.appendChild(toDo);

    let newElement = {textStored: textField,
        done: false, deleted: false}
    localStorage.setItem(count, JSON.stringify(newElement));
    count++;
    form.reset();
})

//listen parent only.Event delegation
ul.addEventListener('click', function(e){
    if(e.target.tagName === "LI"){
       e.target.style.textDecoration = "line-through";
       let modElement = JSON.parse(localStorage.getItem(e.target.id));
       modElement.done = true;
       localStorage.setItem(e.target.id,JSON.stringify(modElement));
    }
    else if(e.target.tagName === "BUTTON"){
        let modElement = JSON.parse(localStorage.getItem(e.target.parentNode.id));
        modElement.deleted = true;
        localStorage.setItem(e.target.parentNode.id,JSON.stringify(modElement));
        // console.log(localStorage);
        e.target.parentNode.remove();
    }
})

