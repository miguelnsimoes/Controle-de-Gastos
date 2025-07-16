const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const preco = prompt("Digite o preço do produto:");

        if (preco === null || preco.trim() === "") {
            alert("Preço não informado. O produto não foi adicionado.");
            return;
        }

        const precoNumero = parseFloat(preco.replace(",", "."));

        if (isNaN(precoNumero) || precoNumero < 0) {
            alert("Digite um valor numérico válido e positivo para o preço.");
            return;
        }

        const maxText = taskText.substring(0, 35);
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${maxText}</span><br>
            <span class="preco">- R$${precoNumero.toFixed(2).replace(".", ",")}</span>
            <button class="editButton" onclick="editTask(this)">Editar</button>
            <button class="deleteButton" onclick="deleteTask(this)">Remover</button>
        `;

        taskList.appendChild(li);
        taskInput.value = "";
        atualizarTotal();
    }
}



function editTask(button) {
    const li = button.parentElement;
    const spans = li.querySelectorAll("span");
    const nomeSpan = spans[0];
    const precoSpan = spans[1];

    const oldButtons = li.querySelectorAll("button");
    oldButtons.forEach(btn => btn.remove());

    const editNameBtn = document.createElement("button");
    editNameBtn.textContent = "Editar Nome";
    editNameBtn.onclick = function () {
        const novoNome = prompt("Novo nome:", nomeSpan.textContent);
        if (novoNome !== null && novoNome.trim() !== "") {
            nomeSpan.textContent = novoNome.trim();
        }
        restoreButtons(li);
    };
    

    const editPriceBtn = document.createElement("button");
    editPriceBtn.textContent = "Editar Preço";
    editPriceBtn.onclick = function () {
        const precoAtual = precoSpan.textContent.replace("- R$", "").replace(",", ".").trim();
        const novoPreco = prompt("Novo preço:", precoAtual);

        if (novoPreco !== null && novoPreco.trim() !== "") {
            const novoPrecoNumerico = parseFloat(novoPreco.replace(",", "."));

            if (isNaN(novoPrecoNumerico) || novoPrecoNumerico < 0) {
                alert("Digite um valor numérico válido e positivo para o preço.");
                restoreButtons(li);
                return;
            }

            precoSpan.textContent = `- R$${novoPrecoNumerico.toFixed(2).replace(".", ",")}`;
            atualizarTotal();
        }
        restoreButtons(li);
    };

    li.appendChild(editNameBtn);
    li.appendChild(editPriceBtn);
}



function restoreButtons(li) {
    const oldButtons = li.querySelectorAll("button");
    oldButtons.forEach(btn => btn.remove());

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.className = "editButton";
    editBtn.onclick = function () {
        editTask(this);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remover";
    deleteBtn.className = "deleteButton";
    deleteBtn.onclick = function () {
        deleteTask(this);
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
}




function deleteTask(button) {
    const li = button.parentElement;
    taskList.removeChild(li);
    atualizarTotal();
}




function atualizarTotal() {
    const spansDePreco = taskList.querySelectorAll("li span.preco");
    let total = 0;

    spansDePreco.forEach(span => {
        const texto = span.textContent.replace("- R$", "").replace(",", ".").trim();
        const valor = parseFloat(texto);
        if (!isNaN(valor)) {
            total += valor;
        }
    });

    const spanGasto = document.getElementById("gasto");
    spanGasto.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}
