
let secaoProdutos      = document.querySelector(".listaProdutos");
let secaoCarrinho      = document.querySelector(".listaCarrinho");
let totalCarrinho      = document.querySelector(".valorCarrinho");
let numCarrinho        = document.querySelector(".qtdCarrinho");




function listarProdutos(arrProdutos,secao){

  secao.innerHTML = ""

  for(let i = 0; i<arrProdutos.length;i++){
    let produto = arrProdutos[i];

    let cardProduto = criandoCard(produto)
    secao.appendChild(cardProduto)
  }
}

listarProdutos(data, secaoProdutos); 




function listarProdutoCarrinho(arrCarrinho){
   secaoCarrinho.innerHTML = ""
  
  for(let i = 0; i < arrCarrinho.length;i++){

    let produtoCarrinho = arrCarrinho[i]

    const novoCard = criarCardCarrinho(produtoCarrinho,i)
    secaoCarrinho.appendChild(novoCard);
   
    
  }
   
  
}

function criarCardCarrinho(produtoCarrinho,i){
  let imagemCarrinho       = produtoCarrinho.img
  let nomeProdutoCarrinho  = produtoCarrinho.nameItem
  let precoProdutoCarrinho = produtoCarrinho.value 
  

  let li                   = document.createElement("li");
  let figure               = document.createElement("figure");
  let divCardCarrinho      = document.createElement("div");
  let divFigure            = document.createElement("div");
  let divCarrinho          = document.createElement("div");
  let imgCarrinho          = document.createElement("img");
  let nomePCarrinho        = document.createElement("h3");
  let valorProdutoCarrinho = document.createElement("p");
  let btnRemoverCarrinho   = document.createElement("button");

  imgCarrinho.src                              = imagemCarrinho
  imgCarrinho.alt                              = nomeProdutoCarrinho              
  nomePCarrinho.innerText                      = nomeProdutoCarrinho
  valorProdutoCarrinho.innerText               = `R$ ${precoProdutoCarrinho}.00`
  btnRemoverCarrinho.innerText                 = `Remover Produto`
  btnRemoverCarrinho.setAttribute("id",i)
  
  divCarrinho.classList.add("arrumar-carrinho");
  divFigure.classList.add("divFigure");
  divCardCarrinho.classList.add("div-card-carrinho")
  
  figure.appendChild(imgCarrinho);
  li.appendChild(divCardCarrinho);
  li.appendChild(divFigure);
  li.appendChild(figure);
  li.appendChild(divCarrinho);
  divCardCarrinho.append(divFigure,divCarrinho);
  divFigure.appendChild(figure);
  divCarrinho.append(nomePCarrinho,valorProdutoCarrinho,btnRemoverCarrinho);
  
  return li
}








function criandoCard(produto){
  
  let imagem       = produto.img
  let nome         = produto.nameItem
  let preco        = produto.value
  let departamento = produto.tag
  let descricao    = produto.description
  let id           = produto.id
  

  let tagLi                 = document.createElement("li");
  let tagFigure             = document.createElement("figure")
  let tagImge               = document.createElement("img");
  let tagSubtitulo          = document.createElement("h5");
  let tagTitulo             = document.createElement("h3");
  let tagPDescricao         = document.createElement("p");
  let tagPreco              = document.createElement("span");
  let tagBtnAdd             = document.createElement("button");

  tagLi.classList.add("cardProduto")
  tagPDescricao.classList.add("paragrafo-description");
  tagPreco.classList.add("paragrafo-valor");
  tagBtnAdd.classList.add("button-adicionar");

  tagImge.src             = imagem
  tagImge.alt             = nome
  tagSubtitulo.innerText  = departamento
  tagTitulo.innerText     = nome
  tagPDescricao.innerText = descricao
  tagPreco.innerText      = ` R$ ${preco}.00`
  tagBtnAdd.innerText     = `Adicionar ao carrinho`
  tagBtnAdd.setAttribute("id",id);

  tagFigure.appendChild(tagImge);
  tagLi.appendChild(tagFigure);
  tagLi.append(tagSubtitulo,tagTitulo,tagPDescricao,tagPreco,tagBtnAdd);

   return tagLi

}



secaoProdutos.addEventListener("click", interceptandoProduto)

let carrinhoCompras = []

function interceptandoProduto(event){
  let tagBtnAdd = event.target

  if(tagBtnAdd.tagName == "BUTTON"){
    
    let idProduto = tagBtnAdd.id

    let produto = data.find(function(produto){
      if(produto.id == idProduto){
        return produto
      }
    })
        adicionarCarrinho(produto)
  }
}
function adicionarCarrinho(produto){

  carrinhoCompras.push(produto)
  listarProdutoCarrinho(carrinhoCompras)
  let valorCarrinho = somaCarrinho();
  totalCarrinho.innerText = valorCarrinho;
  numCarrinho.innerText = carrinhoCompras.length
}


function somaCarrinho(){
  let soma = 0;
  for(let i =0; i < carrinhoCompras.length;i++){
    soma += carrinhoCompras[i].value
  }
  return soma;
}










secaoCarrinho.addEventListener("click", (event) => {

  
  let btnRemove = event.target
  console.log(event.target)
  if (btnRemove.tagName == "BUTTON"){
    let index = btnRemove.id;
    console.log(index);
    carrinhoCompras.splice(index,1);
    listarProdutoCarrinho(carrinhoCompras)
    let valorCarrinho = somaCarrinho();
    totalCarrinho.innerText = valorCarrinho;
    numCarrinho.innerText = carrinhoCompras.length
  }
});






let inputBusca = document.querySelector(".campoBusca input");
let btnBusca   = document.querySelector(".campoBusca button");

btnBusca.addEventListener("click",function(){
 let pesquisaUsuario = inputBusca.value
 let resultadoBusca  = busca(pesquisaUsuario)
  
  listarProdutos(resultadoBusca, secaoProdutos);
});

function busca(valorPesquisa){
  let resultBusca = [];
  
  for(let i = 0; i < data.length;i++ ){

    let pesquisa    = valorPesquisa.toLowerCase()
    let nomeProduto = data[i].nameItem.toLowerCase()
      if(nomeProduto.includes(pesquisa)){
        
        resultBusca.push(data[i])
      }
      
  }
  return resultBusca;
}



