// Importes
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const port = 3000;

// Express
const app = express();

// Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

//====================================================== Rotas ===================================================================//

//---------------------------------------- home.handlebars ----------------------------------------------//
// Página Home
app.get("/", (req, res) => {
  res.render("home", { layout: false });
});

app.use(express.urlencoded({ extended: true }));



//---------------------------------------- addjogodemesa.handlebars ----------------------------------------------//
// Página Cadastro
app.get("/cadastro", (req, res) => {
  res.render("addjogodemesa", { layout: false });
});

// Função de cadastro
app.post("/jogodemesa/addjogodemesa", (req, res) => {
  const genero = req.body.genero;
  const nome = req.body.nome;
  const preco = req.body.preco;
  const descricao = req.body.descricao;

  const sql = `INSERT INTO jogodemesa (genero, nome, preco, descricao) VALUES ('${genero}', '${nome}', '${preco}','${descricao}' )`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/listajogodemesa");
    console.log("jogodemesa cadastrado com sucesso!");
  });
});
//---------------------------------------- listaclientes.handlebars -------------------------------------//
// Página onde mostra a lista de todos os clientes
app.get("/listajogodemesa", (req, res) => {
  const sql = "SELECT * FROM jogodemesa";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    console.log(listar);
    res.render("listajogodemesa", { layout: false, listar });
  });
});

// Função de buscar, que leva para o buscarjogodemesa.handlebars
app.post("/resultado/", (req, res) => {
  const id = req.body.id;

  const sql = `SELECT * FROM jogodemesa WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const buscarjogodemesa = data[0];
    res.render("buscarjogodemesa", { layout: false, buscarjogodemesa });
  });
});

//---------------------------------------- buscarjogodemesa.handlebars / jogodemesaid.handelebars ------------------------------------------//
// Página onde consulta as informações por cliente por ID
app.get("/jogodemesa/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM jogodemesa WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    console.log(listar);
    res.render("jogodemesa", { layout: false, listar });
  });
});

// Função de excluir
app.get("/jogodemesa/excluir/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM jogodemesa WHERE id = '${id}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/listajogodemesa");
  });
});

//---------------------------------------- editjogodemesa.handlebars ---------------------------------------//
// Página de edição das informações do cliente
app.get("/jogodemesa/editar/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM jogodemesa WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const editjogodemesa = data[0];
    res.render("editjogodemesa", { layout: false, editjogodemesa });
  });
});

// Função de editar
app.post("/jogodemesa/updatejogodemesa", (req, res) => {
  const id = req.body.id; 
  const genero = req.body.genero;
  const nome = req.body.nome;
  const preco = req.body.preco;
  const descricao = req.body.descricao;

  const sql = `UPDATE jogodemesa SET genero = '${genero}', nome = '${nome}', preco = '${preco}', descricao = '${descricao}' WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/listajogodemesa");
  });
});

//---------------------------------------- jogodemesaid.handlebars ---------------------------------------//
// Página onde mostra somente a informação daquele ID
app.get("/jogodemesaid/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM jogodemesa WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listardados = data;

    console.log(listardados);
    res.render("jogodemesaID", { layout: false, listardados });
  });
});

//===============================================================================================================================================//

// Conexão com DB no mysql
const conn = mysql.createConnection({
  host: "127.0.0.1",
  port: "3307",
  user: "root",
  password: "",
  database: "lojagirassol",
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }

  console.log("Conectado com sucesso!");
});

// Servidor
app.listen(port, () => {
  console.log(`App rodando ma porta ${port}`);
});