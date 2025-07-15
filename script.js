const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");



function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {

        const maxText = taskText.substring(0, 35);

        const li = document.createElement("li");

        li.innerHTML = `

            <span>${maxText}</span>
            <button class="editButton" onclick="editTask(this)">Editar</button>
            <button class="deleteButton" onclick="deleteTask(this)">Remover</button>
        `;

        taskList.appendChild(li);
        taskInput.value = "";
    }
}



function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar Item:", span.textContent);

    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}



function deleteTask(button) {
    const li = button.parentElement;
    taskList.removeChild(li);
}
