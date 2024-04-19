let modalQtd;
let cart = []
let modalKey = 0;

//-----------------Inicio Exibe informações das pizzas -------------------------//

pizzaJson.map((item, index) => {
    //clonando o pizza-item
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);


     //O atributo data-key permite enviar dados através do html, esses dados podem se utilizados posteriormente por uma janela modal ou por qualquer outro componente.
    //definindo um atributo chamado data-key ao elemento .pizza-item contendo o id da pizza que foi selecionada pelo usuário
    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src  = item.img;
    //toFixed = permite definir quantas casas decimais o javascript irá exibir na tela
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (event) => {

        event.preventDefault();

        //iniciando a variável sempre com o valor 1
        modalQtd = 1
        //--------Está variável será usada para identificar em qual pizza o usuário clicar em adicionar pizza ao carrinho
        modalKey = index;
        //queremos pegar a key da pizza ou seja a posição dela no array para sabermos qual pizza foi clicada. Sabemos que todas as pizzas posuem um atrributo data-key com a chave da mesma, assim iremos utilizar o closest para selecionar o elemento e pegar esta key.
        //closest = busca a partir do elemento especificado o elemento mais próximo com a classe ou id especificado, primeiro ele irá procurar dentro de si e depois o elemento mais próximo, seja acima ou abaixo dele.
        //getAttribute =  pega o valor de um atributo
        let key = event.target.closest('.pizza-item').getAttribute('data-key');

        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        //removendo a classe selecionada dos tamanhos de pizza, assim garantimos que nenhuma pizza estará selecionada antes do usuário selecionar um tamanho
        //.pizzaInfo--size.selected = quando no javascript quisermos fazer referência a um elemento que possui duas classes, devemos informar o nome destas classes juntas conforme fizemos abaixo, desta forma o javascript irá entender que deve selecionar apenas o elemento que possuir as duas classes.
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')

        //selecionando todos os elementos pizzaInfo--size pegando o tamanho da pizza e a posição dos elementos
        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {

            //fará que o tamanho grande sempre seja selecionada por padrão ao usuário clicar em uma pizza
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
            //size.querySelector('span').innerHTML = '123';
        });

        //definindo opacidade 0 para que o modal não seja exibido na tela logo de inicio
        document.querySelector('.pizzaWindowArea').style.opacity = 0;

        //exibindo a janela modal na tela ao clicar em uma pizza
        document.querySelector('.pizzaWindowArea').style.display = 'flex';

        //setTimeout = permite executar um código depois de um tempo estipulado, esse tempo será em milisegundos
        setTimeout(() => {
            //definindo a opacidade para 1 para que a modal seja exibida na tela, lembrando, no css temos uma transition e assim qualquer animação adicionada irá demorar o tempo da transition para acontecer, nesse caso será de 0.5s, assim a opacidade irá do 0 ao 1 demorando 0.5 para acontecer, isso irá gerar um efeito de transição suave dando a impressão que a modal está surgindo na tela.
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200)







    });

    document.querySelector('.pizza-area').append(pizzaItem);

});

//-------------------- Fim Exibe informações das pizzas -----------------------------//


//----------------------Funcionalidades janela modal ------------------------------------//

function closeModal(){
    document.querySelector('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

//Estamos usando o forEach para que automaticamente ele selecione automaticamente cada um dos elementos com as classes abaixo e adicione um EventListener nesses elementos, a cada vez que o usuário clicar em algum botão de fechar ele irá detectar o clique e irá chamar a função closeModal para fechar a janela.
document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal())
});

document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    //a cada vez que o usuário clicar no modal a variável modalQtd será incrementada em +1
    modalQtd++;

    //selecionando o elemento onde a quantidade de pizzas irá aparecer e atualizando-o conforme a variável modalQtd

    document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;

});

document.querySelector('.pizzaInfo--qtdmenos').addEventListener('click', () => {
    if (modalQtd > 1) {
        modalQtd--;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd
    }
})