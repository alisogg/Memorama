const pares = document.querySelectorAll('.carta');
let volteada = false;
let bloqueo = false;
let parUno, parDos; 
let cards = []; //guardar cartas volteadas

function confirmarPares() {
    let CartasIguales = parUno.innerHTML === parDos.innerHTML; //comparar cartas
    CartasIguales ? deshabilitar() : unflip(); 
}

function voltear() {
    if (bloqueo) return;
    if (cards.includes(parUno) || cards.includes(parDos)) return; //evitar que se vuelvan a voltear las cartas
    if (this === parUno) return;
    this.classList.add('flip');
    if (!volteada) {
        volteada = true;
        parUno = this;
        return;
    }
    parDos = this;
    confirmarPares(); 
}

function deshabilitar() { //deshabilitar cartas
    cards.push(parUno);
    cards.push(parDos);
    parUno.removeEventListener('click', voltear);
    parDos.removeEventListener('click', voltear);
    if (cards.length === 20) alert("¡Felicidades, has completado el juego!") || setTimeout(() => {
        window.location.reload();
    }, 1000);
    resetBoard(); 
}

function unflip() { 
    bloqueo = true;
    setTimeout(() => {
        parUno.classList.remove('flip');
        parDos.classList.remove('flip');
        resetBoard();
    }, 1000);
    
}

function resetBoard() {
    [volteada, bloqueo] = [false, false];
    [parUno, parDos] = [null, null];
}

(function shuffle() { //funcion para colocar las cartas aleatoriamente en el tablero
    pares.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20); 
        card.style.order = randomPos;
    });
})();

pares.forEach(card => card.addEventListener('click', voltear)); 
