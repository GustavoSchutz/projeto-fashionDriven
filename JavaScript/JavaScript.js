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