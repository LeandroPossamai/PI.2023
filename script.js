const baseUrl = "http://localhost:3001";
async function buscarProdutos() {
  const res = await fetch(baseUrl + "/produtos");
  const produtos = await res.json();
  return produtos;
}

async function buscarUsuarios() {
  const res = await fetch(baseUrl + "/users");
  const users = await res.json();
  return users;
}

async function mostrarProdutos() {
  const produtos = (await buscarProdutos()) || [];

  const produtosDiv = document.getElementById("produtos");
  produtosDiv.innerHTML = ""; // Limpa o conteúdo atual da div

  produtos.forEach((produto) => {
    const produtoElement = document.createElement("div");
    produtoElement.innerHTML = `
            <h3>${produto.nome}</h3>
            <p><strong>Descrição:</strong> ${produto.descricao}</p>
            <p><strong>Preço:</strong> R$ ${produto.preco}</p>
            <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
            <p><strong>Cor:</strong> ${produto.cor}</p>
            <hr>
        `;
    produtosDiv.appendChild(produtoElement);
  });
}

function enviarDados(event) {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  const form = event.target;
  const formData = new FormData(form);
  const json = {};

  for (const [key, value] of formData.entries()) {
    json[key] = value;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  };

  fetch(baseUrl + "/produtos", options)
    .then((response) => response.json())
    .then((data) => {
      // Faça algo com a resposta do servidor
      console.log(data);
    })
    .catch((error) => {
      // Lida com erros de requisição
      console.error("Erro:", error);
    });
}

function login(event) {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  const form = event.target;
  const formData = new FormData(form);
  const json = {};

  for (const [key, value] of formData.entries()) {
    json[key] = value;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  };

  fetch(baseUrl + "/users/login", options)
    .then((response) => response.json())
    .then((data) => {
      // Faça algo com a resposta do servidor
      console.log(data);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    })
    .catch((error) => {
      // Lida com erros de requisição
      console.error("Erro:", error);
    });
}
function cadastro(event) {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  const form = event.target;
  const formData = new FormData(form);
  const json = {};

  for (const [key, value] of formData.entries()) {
    json[key] = value;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  };

  fetch(baseUrl + "/users", options)
    .then((response) => response.json())
    .then((data) => {
      // Faça algo com a resposta do servidor
      console.log(data);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    })
    .catch((error) => {
      // Lida com erros de requisição
      console.error("Erro:", error);
    });
}
