let xhttp = new XMLHttpRequest();
let lsProduto = [];

function buscarProduto(){
  xhttp.open("GET","https://pascoa-chiquinha.herokuapp.com/produto/")
  xhttp.send();
  xhttp.onload = function(){
    lsProduto = this.response;
    lsProduto = JSON.parse(lsProduto);
    montarListaProdutosHtml(lsProduto);
    marcaProdutosSelecionadoLocalStorage();
  }
}

function montarListaProdutosHtml(lsProduto){
  let listaProduto = "";
  let i = 0;
  for (produto of lsProduto) {
    listaProduto += `
    <div class="embrulho" >
      <div class="produto">
        <img src="${produto.imagem}" alt="">
        <p> ${produto.nome}
          <span class="valor">${produto.valor.toFixed(2)}</span><br> 
        </p>
        <i class="material-icons carrinho"onclick="addProdutoCarrinho(${i})">&#xe8cc;</i>
      </div>
    </div>`;
    produto.carrinho = false;
    i++;
  }
  document.getElementById("listaProduto").innerHTML = listaProduto;
}

function marcaProdutosSelecionadoLocalStorage() {
  let lista = localStorage.getItem("listaProdutoLocalStorage");
  lista = JSON.parse(lista);
  for ( i in lista) {
    if(lista[i].carrinho){
      addProdutoCarrinho(i);
    }
  }
}

function addProdutoCarrinho(i){
  let produto = lsProduto[i];
  if(produto.carrinho == false){
    produto.carrinho = true;
    document.getElementsByClassName("carrinho")[i].style.color = "#e66b6b";
  }else{
    produto.carrinho = false;
    document.getElementsByClassName("carrinho")[i].style.color = "#0000007d";
  }
  localStorage.setItem("listaProdutoLocalStorage",JSON.stringify(lsProduto));
}

function verListaProdutosSelecionados(){
  let listaProduto = "";
  document.getElementById("listaProduto").innerHTML = "";
  let i = 0;
  let j = 0;
  for ( produto of lsProduto) {
    if(produto.carrinho){
      produto.quantidade = 1;
      listaProduto += `
      <div class="embrulho" >
        <div class="produto">
          <img src="${produto.imagem}" alt="">
          <p> ${produto.nome}
            <span class="valor">${produto.valor.toFixed(2)}</span><br> 
          </p>
          <span class="btMaisMenos">
              <span class="btMais" onclick="add(1,${i},${j})">+</span>
              <span class="btMenos" onclick="add(-1, ${i},${j})">-</span>
          </span>
          <div class="quantidade">1</div>
        </div>
      </div>`;
      i++;
    }
    j++;
  }
  document.getElementById("listaProduto").innerHTML = listaProduto;
}

function add(qt, i, j){
  //console.log(qt+""+i)
  //console.log(lsProduto[j])
  lsProduto[j].quantidade += qt;
  document.getElementsByClassName("quantidade")[i].innerHTML = lsProduto[j].quantidade;
}

buscarProduto()