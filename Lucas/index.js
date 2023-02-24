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
  const cpf = req.body.cpf;
  const nome = req.body.nome;
  const cargo = req.body.cargo;
  const idade = req.body.idade;

  const sql = `INSERT INTO funcionario (cpf, nome, cargo, idade) VALUES ('${cpf}', '${nome}', '${cargo}','${idade}' )`;
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
  const cpf = req.body.cpf;

  const sql = `SELECT * FROM funcionario WHERE cpf = ${cpf}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const buscarfuncionario = data[0];
    res.render("buscarfuncionario", { layout: false, buscarfuncionario });
  });
});

//---------------------------------------- buscarfuncionario.handlebars ------------------------------------------//
// Página onde consulta as informações do funcionario por cpf
app.get("/funcionario/:cpf", (req, res) => {
  const cpf = req.params.cpf;

  const sql = `SELECT * FROM funcionario WHERE cpf = ${cpf}`;

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
app.get("/funcionario/excluir/:cpf", (req, res) => {
  const cpf = req.params.cpf;

  const sql = `DELETE FROM funcionario WHERE cpf = '${cpf}'`;

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
app.get("/funcionario/editar/:cpf", (req, res) => {
  const cpf = req.params.cpf;

  const sql = `SELECT * FROM funcionario WHERE cpf = ${cpf}`;

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
  const cpf = req.body.cpf; 
  const nome = req.body.nome;
  const cargo = req.body.cargo;
  const idade = req.body.idade;

  const sql = `UPDATE funcionario SET cpf = '${cpf}', nome = '${nome}', cargo = '${cargo}', idade = '${idade}' WHERE cpf = ${cpf}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/listadefuncionarios");
  });
});

//---------------------------------------- funcionarioCPF.handlebars ---------------------------------------//
// Página onde mostra somente a informação daquele cpf
app.get("/funcionarioCPF/:cpf", (req, res) => {
  const cpf = req.params.cpf;

  const sql = `SELECT * FROM funcionario WHERE cpf = ${cpf}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listardados = data;

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
  database: "infanciagirassol",
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