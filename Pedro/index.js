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



//---------------------------------------- addbrinquedos.handlebars ----------------------------------------------//
// Página Cadastro
app.get("/cadastro", (req, res) => {
  res.render("addbrinquedos", { layout: false });
});

// Função de cadastro
app.post("/brinquedo/addbrinquedo", (req, res) => {
  const nome = req.body.nome;
  const marca = req.body.marca;
  const material = req.body.material;
  const preco = req.body.preco;

  const sql = `INSERT INTO brinquedos (nome, marca, material, preco) VALUES ('${nome}', '${marca}', '${material}','${preco}' )`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/listabrinquedos");
    console.log("Brinquedo cadastrado com sucesso!");
  });
});
//---------------------------------------- listaclientes.handlebars -------------------------------------//
// Página onde mostra a lista de todos os clientes
app.get("/listabrinquedos", (req, res) => {
  const sql = "SELECT * FROM brinquedos";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    console.log(listar);
    res.render("listabrinquedos", { layout: false, listar });
  });
});

// Função de buscar, que leva para o buscarbrinquedo.handlebars
app.post("/resultado/", (req, res) => {
  const id = req.body.id;

  const sql = `SELECT * FROM brinquedos WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const buscarbrinquedo = data[0];
    res.render("buscarbrinquedo", { layout: false, buscarbrinquedo });
  });
});

//---------------------------------------- buscarbrinquedo.handlebars / brinquedoid.handelebars ------------------------------------------//
// Página onde consulta as informações por cliente por ID
app.get("/brinquedo/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM brinquedos WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    console.log(listar);
    res.render("brinquedos", { layout: false, listar });
  });
});

// Função de excluir
app.get("/brinquedo/excluir/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM brinquedos WHERE id = '${id}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/listabrinquedos");
  });
});

//---------------------------------------- editbrinquedo.handlebars ---------------------------------------//
// Página de edição das informações do cliente
app.get("/brinquedo/editar/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM brinquedos WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const editbrinquedo = data[0];
    res.render("editbrinquedo", { layout: false, editbrinquedo });
  });
});

// Função de editar
app.post("/brinquedo/updatebrinquedo", (req, res) => {
  const id = req.body.id; 
  const nome = req.body.nome;
  const marca = req.body.marca;
  const material = req.body.material;
  const preco = req.body.preco;

  const sql = `UPDATE brinquedos SET nome = '${nome}', marca = '${marca}', material = '${material}', preco = '${preco}' WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/listabrinquedos");
  });
});

//---------------------------------------- brinquedoid.handlebars ---------------------------------------//
// Página onde mostra somente a informação daquele ID
app.get("/brinquedoid/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM brinquedos WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listardados = data;

    console.log(listardados);
    res.render("brinquedoID", { layout: false, listardados });
  });
});

//===============================================================================================================================================//

// Conexão com DB no mysql
const conn = mysql.createConnection({
  host: "127.0.0.1",
  port: "3307",
  user: "root",
  password: "",
  database: "infanciagirrasol",
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