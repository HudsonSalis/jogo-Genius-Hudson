let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const um = document.querySelector('.um');
const dois = document.querySelector('.dois');
const tres = document.querySelector('.tres');
const quatro = document.querySelector('.quatro');
const cinco = document.querySelector('.cinco');
const seis = document.querySelector('.seis');
const sete = document.querySelector('.sete');
const oito = document.querySelector('.oito');
const nove = document.querySelector('.nove');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 8);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
       
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    },number - 100);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        let audio2 = new Audio('./songs/acerto.mp3');
        audio2.play();

        setTimeout(() => {
            nextLevel();
        },250);

        
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected2');


    setTimeout(() => {
        checkOrder();
            createColorElement(color).classList.remove('selected2');

    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return um;
    }
    else if(color == 1) {
        return dois;
    } 
    else if (color == 2) {
        return tres;
    } 
    else if (color == 3) {
        return quatro;
    }
    else if(color == 4) {
        return cinco;
    } 
    else if (color == 5) {
        return seis;
    } 
    else if (color == 6) {
        return sete;
    }
    else if(color == 7) {
        return oito;
    } 
    else if (color == 8) {
        return nove;
    }
    
}

//funcao para proximo nivel do jogo
let nextLevel = () => {

    setTimeout(() => {
        score++;
        shuffleOrder();
    },500)
  
}

//funcao para game over
let gameOver = () => {

    let audio = new Audio('./songs/erro.mp3');
    audio.play();
    order = [];
    clickedOrder = [];

    Swal.fire({
        title: `Fim de jogo\nPontuação: ${score}\n\nContinuar?`,
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: `Não`,
      }).then((result) => {
        if (result.isConfirmed) {
            playGame();
        } else if (result.isDenied) {
            console.log("not today")
        }
      })
 
}

//funcao de inicio do jogo
let playGame = () => {
    
    order = [];
    clickedOrder = [];
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    setTimeout(() => {
        score = 0;
        nextLevel();
    },500)
   
}

//eventos de clique para as cores
um.onclick = () => click(0);
dois.onclick = () => click(1);
tres.onclick = () => click(2);
quatro.onclick = () => click(3);
cinco.onclick = () => click(4);
seis.onclick = () => click(5);
sete.onclick = () => click(6);
oito.onclick = () => click(7);
nove.onclick = () => click(8);


//inicio do jogo
playGame();