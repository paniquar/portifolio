/* Lógia de programação

    [x]Saber qunado o usuário clicou no botão
    [x]mudar o posicionamento do modal
    [x]mascara ficar visivel
    []quando clicar na mascara, fechar o modal
*/

const modal = document.querySelector(".modal")
const mascara = document.querySelector(".mascara-mapa")

function MostrarModal(){
    modal.style.left = '50%'
    mascara.style.visibility = 'visible'
}

function EsconderModal(){
      modal.style.left = '-30%'
    mascara.style.visibility = 'hidden'
}

