const pares = document.querySelectorAll('.carta');
let volteada = false;
let bloqueo = false;
let parUno, parDos; 
let cards = []; 

function confirmarPares() {
    let CartasIguales = parUno.innerHTML === parDos.innerHTML; 
    CartasIguales ? deshabilitar() : unflip(); 
}

function voltear() {
    if (bloqueo) return;
    if (cards.includes(parUno) || cards.includes(parDos)) return; 
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

function deshabilitar() {
    cards.push(parUno);
    cards.push(parDos);
    parUno.removeEventListener('click', voltear);
    parDos.removeEventListener('click', voltear);
    if (cards.length === 20) alert("¡Felicides, has completado el juego!");
    resetBoard(); 
}

function unflip() {
    bloqueo = true;
    setTimeout(() => {
        parUno.classList.remove('flip');
        parDos.classList.remove('flip');
        resetBoard();
    }, 1500);
    
}

function resetBoard() {
    [volteada, bloqueo] = [false, false];
    [parUno, parDos] = [null, null];
}

(function shuffle() {
    pares.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20); 
        card.style.order = randomPos;
    });
})();

pares.forEach(card => card.addEventListener('click', voltear));
