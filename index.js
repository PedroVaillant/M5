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



//---------------------------------------- addfuncionario.handlebars ----------------------------------------------//
// Página Cadastro
app.get("/cadastro", (req, res) => {
  res.render("addfuncionario", { layout: false });
});

// Função de cadastro
app.post("/funcionario/addfuncionario", (req, res) => {
  const CPF = req.body.CPF;
  const nome = req.body.nome;
  const cargo = req.body.cargo;
  const idade = req.body.idade;

  const sql = `INSERT INTO funcionario (CPF, nome, cargo, idade) VALUES ('${CPF}', '${nome}', '${cargo}','${idade}' )`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/listadefuncionarios");
    console.log("Funcionario cadastrado com sucesso!");
  });
});
//---------------------------------------- listadefuncionarios.handlebars -------------------------------------//
// Página onde mostra a lista de todos os funcionarios
app.get("/listadefuncionarios", (req, res) => {
  const sql = "SELECT * FROM funcionario";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    console.log(listar);
    res.render("listadefuncionarios", { layout: false, listar });
  });
});

// Função de buscar, que leva para o buscarfuncionario.handlebars
app.post("/resultado/", (req, res) => {
  const CPF = req.body.CPF;

  const sql = `SELECT * FROM funcionario WHERE CPF = ${CPF}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const buscarfuncionario = data[0];
    res.render("buscarfuncionario", { layout: false, buscarfuncionario });
  });
});

//---------------------------------------- buscarfuncionario.handlebars / brinquedoid.handelebars ------------------------------------------//
// Página onde consulta as informações do funcionario por CPF
app.get("/funcionario/:CPF", (req, res) => {
  const CPF = req.params.CPF;

  const sql = `SELECT * FROM brinquedos WHERE CPF = ${CPF}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    console.log(listar);
    res.render("funcionario", { layout: false, listar });
  });
});

// Função de excluir
app.get("/funcionario/excluir/:CPF", (req, res) => {
  const CPF = req.params.CPF;

  const sql = `DELETE FROM funcionario WHERE CPF = '${CPF}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/listadefuncionarios");
  });
});

//---------------------------------------- editfuncionario.handlebars ---------------------------------------//
// Página de edição das informações do cliente
app.get("/funcionario/editar/:CPF", (req, res) => {
  const CPF = req.params.CPF;

  const sql = `SELECT * FROM funcionario WHERE CPF = ${CPF}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const editfuncionario = data[0];
    res.render("editfuncionario", { layout: false, editfuncionario });
  });
});

// Função de editar
app.post("/funcionario/updatefuncionario", (req, res) => {
  const CPF = req.body.CPF; 
  const nome = req.body.nome;
  const cargo = req.body.cargo;
  const idade = req.body.idade;

  const sql = `UPDATE funcionario SET CPF = '${CPF}', nome = '${nome}', cargo = '${cargo}', idade = '${idade}' WHERE CPF = ${CPF}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/listadefuncionarios");
  });
});

//---------------------------------------- funcionarioCPF.handlebars ---------------------------------------//
// Página onde mostra somente a informação daquele CPF
app.get("/funcionarioCPF/:CPF", (req, res) => {
  const CPF = req.params.CPF;

  const sql = `SELECT * FROM funcionario WHERE CPF = ${CPF}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listadefuncionarios = data;

    console.log(listardados);
    res.render("funcionarioCPF", { layout: false, listardados });
  });
});

//===============================================================================================================================================//

// Conexão com DB no mysql
const conn = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
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