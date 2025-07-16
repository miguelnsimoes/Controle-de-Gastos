const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");



function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const preco = prompt("Digite o preço do produto: ")

            if(preco === null || preco.trim() === ""){
                alert("Preço não informado. O produto não foi adicionado.");
                return;
            }   

        
        const maxText = taskText.substring(0, 35);
        const li = document.createElement("li");

        li.innerHTML = `

            
            <span>${maxText}</strong></span><br>
            <span>- R$${preco}</span>
            <button class="editButton" onclick="editTask(this)">Editar</button>
            <button class="deleteButton" onclick="deleteTask(this)">Remover</button>
        `;

        taskList.appendChild(li);      
        taskInput.value = "";
    }
} 



function editTask(button) {
    const li = button.parentElement;

    // Salva os spans para reutilizar depois
    const spans = li.querySelectorAll("span");
    const nomeSpan = spans[0];
    const precoSpan = spans[1];

    // Remove os botões antigos
    const oldButtons = li.querySelectorAll("button");
    oldButtons.forEach(btn => btn.remove());

    // Cria botão para editar o nome
    const editNameBtn = document.createElement("button");
    editNameBtn.textContent = "Editar Nome";
    editNameBtn.onclick = function () {
        const novoNome = prompt("Novo nome:", nomeSpan.textContent);
        if (novoNome !== null && novoNome.trim() !== "") {
            nomeSpan.textContent = novoNome.trim();
        }
        restoreButtons(li);
    };

    // Cria botão para editar o preço
    const editPriceBtn = document.createElement("button");
    editPriceBtn.textContent = "Editar Preço";
    editPriceBtn.onclick = function () {
        const novoPreco = prompt("Novo preço:", precoSpan.textContent.replace("- R$", "").trim());
        if (novoPreco !== null && novoPreco.trim() !== "") {
            precoSpan.textContent = `- R$${novoPreco.trim()}`;
        }
        restoreButtons(li);
    };

    // Adiciona os dois novos botões no li
    li.appendChild(editNameBtn);
    li.appendChild(editPriceBtn);
}


// Essa função volta os botões "Editar" e "Remover"
function restoreButtons(li) {
    // Remove todos os botões antigos
    const oldButtons = li.querySelectorAll("button");
    oldButtons.forEach(btn => btn.remove());

    // Cria botão de Editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.className = "editButton";
    editBtn.onclick = function () {
        editTask(this);
    };

    // Cria botão de Remover
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remover";
    deleteBtn.className = "deleteButton";
    deleteBtn.onclick = function () {
        deleteTask(this);
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
}

function deleteTask(button){

    const li = button.parentElement;
    taskList.removeChild(li);

}

