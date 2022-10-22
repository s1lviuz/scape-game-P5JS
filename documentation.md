# Classes:

# **Entity**: 
**Classe genérica para criar os parâmetros em comum de Entidades como o Jogador e o Inimigo.**

![1](https://i.imgur.com/lCymL2s.png)

## **Constructor**: Criar os parâmetros a seguir. 

**velocity**: Recebe um vetor criado e zerado.

**acceleration**: Recebe um vetor criado e zerado.

**topspeed**: Recebe um número que define a velocidade máxima da Entidade.

**dim**: Recebe o número que define a dimensão total da Entidade.

**hdim**: Representa o raio da dimensão total da Entidade.

**collide**: Recebe um valor booleano que representa o estado de colisão da Entidade.


## **Métodos: Funções relacionadas com a Classe.**

**update**: Adiciona ao vetor velocity o vetor acceleration, configura o limite da velocidade do vetor velocity com o número de topspeed e adiciona ao vetor location (que será apresentado nas próximas classes) o vetor velocity.

**checkCollison**: Função com dois condicionais, o primeiro: Se a localização da Entidade for maior que o comprimento do canvas do desenho ela é deslocada para o outro lado do canvas seguindo o mesmo comportamento. O segundo: Se a localização da Entidade for maior que a altura do Canvas do desenho ela é deslocada para o outro lado do Canvas seguindo o mesmo comportamento. Comportamento genérico que é usado apenas para o Jogador.

# **Player: Estende a classe Entity, representando o jogador.**

![2](https://i.imgur.com/LTCmnRg.png)

## **constructor**: super() representa todos os parâmetros do constructor da classe pai (Entity). Criar os parâmetros a seguir.

**location**: Recebe um vetor com as coordenadas de início do Jogador.

**fillColor**: Recebe a cor de preenchimento do Jogador.

**Métodos**: Funções relacionadas com a Classe.

**display**: Desenha o Jogador com as características: noStroke() (sem contorno), fill() (preenchimento do desenho), ellipse() (desenha a elipse através das coordenadas de localização e dimensão do Jogador).

## **Funções relacionadas ao Jogador**: keyPressed() (tecla pressionada) e keyReleased() (tecla solta).

![3](https://i.imgur.com/eUkQ7LZ.png)

**keyPressed**: Adiciona a aceleração do jogador de acordo com a tecla pressionada no teclado.

![4](https://i.imgur.com/ZYtZQ1F.png)

**keyReleased**: Funciona como um freio para parar o jogador de acordo com a tecla solta do teclado.

# **Enemy: Estende a classe Entity, representando o inimigo do jogador.** 

![5](https://i.imgur.com/pA7XOTo.png)

## **constructor**: super() representa todos os parâmetros do constructor da classe pai (Entity). Criar os parâmetros a seguir.

**fillColor**: Recebe a cor de preenchimento do Jogador.

**visionRange**: Recebe um número que representa a distância total da visão do inimigo.

**hvisionRange**: Representa o raio da distância de visionRange.

**bodySpace**: Representa uma distância relativa à visão do inimigo para ser usada de parametro pra definição do seu ponto inicial de geração.

**location**: Recebe um vetor com as coordenadas de início do Jogador.

**pursuit**: Um valor booleano que define o estado de perseguição do inimigo.

![6](https://i.imgur.com/oxGwoF9.png)

**update**: Estende todos os parâmetros do método update da classe pai (Entity) e checa dois condicionais. O primeiro: Se collide for false, entra no segundo condicional. O segundo: se pursuit for true, ele não faz nada e retorna. Senão, recebe uma aceleração randômica. Essa função representa em resumo a checagem do estado do inimigo: Aleatório, Perseguindo ou em Colisão.

## **Métodos checkTarget e checkCatch**

![7](https://i.imgur.com/sGO68gP.png)

## **checkTarget**:  Recebe o jogador criado por uma classe.

Define a variável targetDistance que recebe a distancia entre os vetores do alvo (jogador) e o inimigo. Depois checa um condicional: Se targetDistance subtraído pelo raio do inimigo for menor que o campo de visão do inimigo (hvisionRange), ele entra em estado de perseguição. Esse estado configura a aceleração do inimigo de acordo com uma direção (direction) que recebe um vetor resultante da subtração dos vetores de localização do alvo e do inimigo, normaliza e multiplica pra que essa aceleração aumente da original. Senão, ele não entra em estado de perseguição.

## **checkCatch**: Recebe o jogador criado por uma classe.

Define a variável targetDistance que recebe a distancia entre os vetores do alvo (jogador) e o inimigo. Depois checa por um condicional se a targetDistance subtraída pelo raio do alvo é menor ou igual ao raio do inimigo. Se sim, o jogo é finalizado e é exibida em tela um mensagem: “Você foi pego!”.

# Funções principais:

![8](https://i.imgur.com/gaFR0bD.png)

## **setup**: Função da P5JS que faz uma configuração inicial carregado apenas uma vez. 
Cria um canvas para o desenho, define o player que recebe um novo objeto da classe Player  e roda a lista de inimigos adicionando a quantidade recebida pela variável enemys.

![9](https://i.imgur.com/bDuwYOU.png)

## **draw**: Função da P5JS que desenha o código em loop. 
Desenha uma área em forma de retângulo que representa os limites do trajeto dos inimigos.
E chama os métodos de todas as Entidades da ordem acima.
