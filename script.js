const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText !== ""){
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="editButton" onClick="editTask">Editar<button>
            <button class="deleteButton" onClick="deleteTask">Remover<button>
        `;
        taskList.appendChild(li);
        taskInput.value = ""
    }
}


function editTask(){
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar Item:", span.textoContent);
    
    if(newText !== null && newText.trim() !== ""){
        span.textoContent = newText.trim();

    }
}