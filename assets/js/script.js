const cartas = document.querySelectorAll(".card-back");

const contadorTentativas = document.querySelectorAll(".p-hud-row-2")[0];
const contadorPares = document.querySelectorAll(".p-hud-row-2")[1];
const contadorTempo = document.querySelectorAll(".p-hud-row-2")[2];
const botaoReiniciar = document.querySelector(".button-hud-row-2");

let primeiraCarta = null;
let segundaCarta = null;
let bloqueioTabuleiro = false;

let tentativas = 0;
let paresEncontrados = 0;
let segundos = 0;

let intervaloTempo = null;
let tempoIniciado = false;

// Embaralha as cartas
function embaralharCartas() {
  const tabuleiro = document.querySelector(".row-3");
  const cartasArray = Array.from(cartas);

  for (let i = cartasArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [cartasArray[i], cartasArray[j]] = [cartasArray[j], cartasArray[i]];
  }

  cartasArray.forEach((carta) => {
    tabuleiro.appendChild(carta);
  });
}

// Inicia o cronômetro
function iniciarTempo() {
  if (tempoIniciado) {
    return;
  }

  tempoIniciado = true;

  intervaloTempo = setInterval(() => {
    segundos++;

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    contadorTempo.textContent =
      `${String(minutos).padStart(2, "0")}:` +
      `${String(segundosRestantes).padStart(2, "0")}`;
  }, 1000);
}

// Verifica se duas cartas formam um par
function verificarPar() {
  const iconePrimeiraCarta = primeiraCarta.querySelector(".conteudo-frente i");

  const iconeSegundaCarta = segundaCarta.querySelector(".conteudo-frente i");

  const primeiroIcone = iconePrimeiraCarta.className;
  const segundoIcone = iconeSegundaCarta.className;

  tentativas++;

  contadorTentativas.textContent = tentativas;

  if (primeiroIcone === segundoIcone) {
    // As cartas formam um par
    primeiraCarta.classList.add("encontrada");
    segundaCarta.classList.add("encontrada");

    paresEncontrados++;

    contadorPares.textContent = `${paresEncontrados} / 6`;

    primeiraCarta = null;
    segundaCarta = null;

    if (paresEncontrados === 6) {
      finalizarJogo();
    }
  } else {
    // As cartas são diferentes
    bloqueioTabuleiro = true;

    // Adiciona o efeito de tremor às duas cartas
    primeiraCarta.classList.add("shake");
    segundaCarta.classList.add("shake");

    setTimeout(() => {
      // Remove o tremor
      primeiraCarta.classList.remove("shake");
      segundaCarta.classList.remove("shake");

      // Vira as cartas novamente
      primeiraCarta.classList.remove("virada");
      segundaCarta.classList.remove("virada");

      primeiraCarta = null;
      segundaCarta = null;

      bloqueioTabuleiro = false;
    }, 900);
  }
}

// Executa quando uma carta é clicada
function virarCarta() {
  if (bloqueioTabuleiro) {
    return;
  }

  if (
    this.classList.contains("virada") ||
    this.classList.contains("encontrada")
  ) {
    return;
  }

  iniciarTempo();

  this.classList.add("virada");

  if (primeiraCarta === null) {
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;

  verificarPar();
}

// Finaliza a partida
function finalizarJogo() {
  clearInterval(intervaloTempo);

  bloqueioTabuleiro = true;

  setTimeout(() => {
    alert(
      `Parabéns! Você encontrou todos os pares!\n\n` +
        `Tentativas: ${tentativas}\n` +
        `Tempo: ${contadorTempo.textContent}`,
    );
  }, 400);
}

// Reinicia a partida
function reiniciarJogo() {
  clearInterval(intervaloTempo);

  primeiraCarta = null;
  segundaCarta = null;
  bloqueioTabuleiro = false;

  tentativas = 0;
  paresEncontrados = 0;
  segundos = 0;
  tempoIniciado = false;

  contadorTentativas.textContent = "0";
  contadorPares.textContent = "0 / 6";
  contadorTempo.textContent = "00:00";

  cartas.forEach((carta) => {
    carta.classList.remove("virada", "encontrada");
  });

  embaralharCartas();
}

document.querySelectorAll(".ripple-effect").forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    const rect = botao.getBoundingClientRect();
    const tamanho = Math.max(rect.width, rect.height) * 2;

    const onda = document.createElement("span");
    onda.classList.add("ripple-wave");

    onda.style.width = `${tamanho}px`;
    onda.style.height = `${tamanho}px`;
    onda.style.left = `${evento.clientX - rect.left - tamanho / 2}px`;
    onda.style.top = `${evento.clientY - rect.top - tamanho / 2}px`;

    botao.querySelectorAll(".ripple-wave").forEach((el) => el.remove());

    botao.appendChild(onda);

    onda.addEventListener("animationend", () => onda.remove());
  });
});

// Adiciona os eventos às cartas
cartas.forEach((carta) => {
  carta.addEventListener("click", virarCarta);
});

// Adiciona o evento ao botão Reiniciar
botaoReiniciar.addEventListener("click", reiniciarJogo);

// Embaralha as cartas ao abrir a página
embaralharCartas();

// botão de informações jogos

const slideButton = document.getElementById("slideButton");
const slidePanel = document.getElementById("slidePanel");

slideButton.addEventListener("click", () => {
  const aberto = slidePanel.classList.toggle("open");

  slideButton.classList.toggle("open", aberto);
  slideButton.setAttribute("aria-expanded", String(aberto));
  slideButton.textContent = aberto ? "🎮" : "🗺️";

  console.log("Painel aberto:", aberto);
});
