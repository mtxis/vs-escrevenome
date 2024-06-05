//variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 8;
let raqueteAltura = 90;

//variaveis do Oponente
let xOponente = 585;
let yOponente = 150;
let velocidadeOponente = 8;

let colidiu = false;

//pontos do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("videoplayback.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xOponente, yOponente);
  movimentaMinhaRaquete();
  // verificaColisaoRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  colisaoRaquete(xOponente, yOponente);
  movimentaRaqueteOponente();
  placar();
  marcaPontos();
  //movimenta2Player();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    ponto.play();
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function movimentaRaqueteOponente() {
    velocidadeOponente = yBolinha - yOponente - raqueteComprimento / 2 - 30;
    yOponente += velocidadeOponente
}
function placar(){
  textAlign(CENTER);
  textSize(16);
  fill (color(50,205,50))
  rect (130,10, 40, 20)
  fill (255)
  text(meusPontos, 150, 25);
  fill (color (50,205,50))
  rect (430,10, 40, 20)
  fill (255)
  text (pontosOponente, 450, 25);
}
function marcaPontos(){
  if (xBolinha > 590){
    meusPontos += 1
  }
  if (xBolinha < 15){
    pontosOponente += 1
  }
}
 function movimenta2Player(){
   if(keyIsDown(87)) {
    yOponente -= 10;
  }
  if(keyIsDown(83)) {
    yOponente += 10;
  }
 }