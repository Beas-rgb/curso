let xhttp = new XMLHttpRequest();
let lsProduto = [];

function buscarProduto() {
  xhttp.open('GET', 'https://pascoa-chiquinha.herokuapp.com/produto/')
  xhttp.send()
  xhttp.onload = function () {
    lsProduto = this.response;
    lsProduto = JSON.parse(lsProduto);
    mostraListaProdutosHtml(lsProduto);
  }
}

function mostraListaProdutosHtml(lsProduto) {
  let listaProduto = "";
  let i = 0;
  for (produto of lsProduto) {
    listaProduto += `
    <div class="embrulho">
    <div class="produtos">
      <img src="${produto.imagem}" alt="" />
      <p>${produto.nome}
        <span class="valor">${produto.valor.toFixed(2)}</span>
      </p>
      <i class="material-icons carrinho" onclick="addProdutoCarrinho(${i})" >&#xe8cc;</i>
    </div>
  </div> `;
   produto.carrinho = false;
   i++;
  }
  document.getElementById("listaProduto").innerHTML = listaProduto;
}

function addProdutoCarrinho(i) {
  let produto = lsProduto[i];
  if(produto.carrinho == false) {
    produto.carrinho = true;
    document.getElementsByClassName("material-icons carrinho")[i].style.color = "#e66b6b";
  }else{
    produto.carrinho = false;
    document.getElementsByClassName("material-icons carrinho")[i].style.color = "#0000007d";
  }

}

function verListaProdutosSelecionados(){
  for (produto of lsProduto) {
    if(produto.carrinho){
      
    }
  }
}

buscarProduto();
