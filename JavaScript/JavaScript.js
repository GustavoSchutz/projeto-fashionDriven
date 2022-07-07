getLastOrders();

let imgReferencia;
let selecionaTecido = false;
let selecionaModelo = false;
let selecionaGola = false;

const input = document.querySelector('input');
input.addEventListener('input', ativarBotao);


let userName = prompt("Qual seu nome?");

function selecionarModelo(elemento) {
    const selecionado = document.querySelector('.modelos .selectedItem');
    selecionaModelo = true;

    if (selecionado !== null) {
        selecionado.classList.remove('selectedItem');
    }
    elemento.classList.add('selectedItem')

    ativarBotao()
}
function selecionarGola(elemento) {
    const selecionado = document.querySelector('.golas .selectedItem');
    selecionaGola = true;

    if (selecionado !== null) {
        selecionado.classList.remove('selectedItem');
    }
    elemento.classList.add('selectedItem')

    ativarBotao()
}
function selecionarTecido(elemento) {
    const selecionado = document.querySelector('.tecidos .selectedItem');
    selecionaTecido = true

    if (selecionado !== null) {
        selecionado.classList.remove('selectedItem');
    }
    elemento.classList.add('selectedItem')

    ativarBotao()
}

function ativarBotao() {
    imgReferencia = document.getElementById("linkReferencia");
    const linkValido = imgReferencia.checkValidity();
    const confirmarPedido = document.querySelector('.confirmarPedido')
    if (linkValido && selecionaGola && selecionaModelo && selecionaTecido) {
        confirmarPedido.classList.add('botaoValido')
    }
}

// =================================

function getLastOrders() {
    const resposta = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");

    resposta.then(writeLastOrders);
    resposta.catch(writeGetError);
}

function writeLastOrders(ordersObject) {

    console.log(ordersObject)
    console.log(ordersObject.data.length)
    const elemento = document.querySelector(".pedidos");

    elemento.innerHTML = "";

    for (i = 0; i < ordersObject.data.length; i++) {
        elemento.innerHTML += `
        <div id=" ${ordersObject.data[i].id}" class="pedido">
            <img src=${ordersObject.data[i].image} alt="">
            <div class="criador">
                <strong>Criador: </strong><span>${ordersObject.data[i].owner}</span>
            </div>
        </div>
        `
    }

}

function writeGetError(error) {
    console.log(error.data)
    alert("houve um equivico!!")
}