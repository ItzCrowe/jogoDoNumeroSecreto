let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Numero Secreto!');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10!');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    /*console.log(`Seu numero é ${chute}; o numero secreto é ${numeroSecreto}`);
    console.log(chute == numeroSecreto);*/
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute >= numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que o chute`);
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior que o chute!');
        } 
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementos = listaDeNumerosSorteados.length
  if (quantidadeDeElementos == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    limparCampo();
    numeroSecreto =  gerarNumeroAleatorio();
    exibirMensagemInicial();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

