getLastOrders();

let imgReferencia;
let selecionaTecido = false;
let selecionaModelo = false;
let selecionaGola = false;

const input = document.querySelector('input');
input.addEventListener('input', ativarBotao);


let userName = prompt("Qual seu nome?");
let newOrderOwner = userName;
let newOrderModel;
let newOrderNeck;
let newOrderMaterial;
let newOrderImage;


function selecionarModelo(elemento) {
    const selecionado = document.querySelector('.modelos .selectedItem');
    const changeBorder = elemento.querySelector('.type');

    selecionaModelo = true;

    if (selecionado !== null) {
        selecionado.classList.remove('selectedItem');
    }
    changeBorder.classList.add('selectedItem');

    newOrderModel = elemento.querySelector('h5').innerHTML;

    if (newOrderModel === "T-Shirt") {
        newOrderModel = 't-shirt';
    } else if (newOrderModel === "Camiseta") {
        newOrderModel = 'top-tank';
    } else {
        newOrderModel = 'long';
    }
    

    ativarBotao()
}
function selecionarGola(elemento) {
    const selecionado = document.querySelector('.golas .selectedItem');
    const changeBorder = elemento.querySelector('.type');

    selecionaGola = true;

    if (selecionado !== null) {
        selecionado.classList.remove('selectedItem');
    }
    changeBorder.classList.add('selectedItem');

    newOrderNeck = elemento.querySelector('h5').innerHTML;

    if (newOrderNeck === "Gola-V") {
        newOrderNeck = 'v-neck';
    } else if (newOrderNeck === "Gola redonda") {
        newOrderNeck = 'round';
    } else {
        newOrderNeck = 'polo';
    }

    ativarBotao()
}
function selecionarTecido(elemento) {
    const selecionado = document.querySelector('.tecidos .selectedItem');
    const changeBorder = elemento.querySelector('.type');

    selecionaTecido = true

    if (selecionado !== null) {
        selecionado.classList.remove('selectedItem');
    }
    changeBorder.classList.add('selectedItem');

    newOrderMaterial = elemento.querySelector('h5').innerHTML;

    if (newOrderMaterial === "Seda") {
        newOrderMaterial = 'silk';
    } else if (newOrderMaterial === "Algodão") {
        newOrderMaterial = 'cotton';
    } else {
        newOrderMaterial = 'polo';
    }

    ativarBotao()
}

function ativarBotao() {
    imgReferencia = document.getElementById("linkReferencia");
    const linkValido = imgReferencia.checkValidity();
    const confirmarPedido = document.querySelector('.confirmarPedido')
    if (linkValido && selecionaGola && selecionaModelo && selecionaTecido) {
        confirmarPedido.classList.add('botaoValido');
        newOrderImage = document.getElementById('linkReferencia').value;
    }
}

function startOrder() {
    const newOrderObject = {};
    newOrderObject.model = newOrderModel;
    newOrderObject.neck = newOrderNeck;
    newOrderObject.material = newOrderMaterial;
    newOrderObject.image = newOrderImage;
    newOrderObject.owner = newOrderOwner;
    newOrderObject.author = newOrderOwner;
    console.log(newOrderObject);

    

    const answer = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', newOrderObject);

    answer.then(postSuccessful);
    answer.catch(postError);
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
}



function postNewOrder() {
    const answer = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', postOrder);

    answer.catch(postError);
    answer.then(postSuccessful);
}

function postError(error) {
    console.log(error.data);
}

function postSuccessful(success) {
    console.log(success.data);
}
