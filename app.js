//let titulo = document.querySelector('h1'); // seleciona o elemento h1 no HTML e altera o seu texto
//titulo.innerHTML = 'Jogo do número secreto'; // modifica o conteúdo do elemento h1

// let paragrafo = document.querySelector('p'); // seleciona o elemento p no HTML e altera o seu texto
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10'; // modifica o conteúdo do elemento p
let listaDeNumerosSorteados = []; // lista
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// função sem retorno e com parâmetro
function exibirTextoNaTela(tag, texto) { // seleciona elementos (forma resumida) no html e altera o seu texto
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // transforma os textos em voz
}

// função sem retorno e sem parâmetro
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Chute um número entre 1 e 50');
}

exibirMensagemInicial();

// função sem retorno e sem parâmetro
function verificarChute() { // compara se o chute é igual ao numero secreto e mostra no console true ou false
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // habilita o botão Novo jogo
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

// função com retorno e sem parâmetro
function gerarNumeroAleatorio() { // gera um número aleatório e retorna o valor na variável numeroSecreto
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // limpa a lista, caso todos os números já tiverem sido sorteados
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // verifica se o elemento está na lista
        return gerarNumeroAleatorio(); // gera outro número aleatório, caso o número já esteja na lista
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // adiciona o número que já foi sorteado na lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// função sem retorno e sem parâmetro
function limparCampo() { // limpa o campo de chute
    chute = document.querySelector('input');
    chute.value = '';
}

// função sem retorno e sem parâmetro
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // habilita o botão Novo jogo somente quando acerta o número secreto
}