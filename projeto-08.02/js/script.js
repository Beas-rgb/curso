let xhttp = new XMLHttpRequest()

function buscarProduto() {
  xhttp.open('GET', 'https://pascoa-chiquinha.herokuapp.com/produto/')
  xhttp.send()
  xhttp.onload = function () {
    let lsProduto = this.response;
    lsProduto = JSON.parse(lsProduto);
    mostraListaProdutosHtml(lsProduto);
  }
}

function mostraListaProdutosHtml(lsProduto) {
  let listaProduto = "";
  for (produto of lsProduto) {
    listaProduto += `
    <div class="embrulho">
    <div class="produtos">
      <img src="${produto.imagem}" alt="" />
      <p>
        ${produto.nome}
        <span class="valor">${produto.valor.toFixed(2)}</span>
      </p>
      <i class="material-icons" onclick="addProdutoCarrinho()" >&#xe8cc;</i>
    </div>
  </div> `
  }
  document.getElementById("listaProduto").innerHTML = listaProduto;
}
buscarProduto();
