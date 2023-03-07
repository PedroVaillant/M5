// Importes
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const port = 3000;

// Express
const app = express();

// Handlebars
app.engine("hbs", exphbs.engine());
app.set("view engine", "hbs");

app.use(express.static("public"));

//====================================================================== Rotas =============================================================================================//
//---------------------------------------- home.hbs ----------------------------------------------//
// Página Home
app.get("/", (req, res) => {
  res.render("home", { layout: false });
});

app.use(express.urlencoded({ extended: true }));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Brinquedos ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//---------------------------------------- brinquedocadastro.hbs ---------------------------------//
// Página Cadastro
app.get("/cadastrobrinquedo", (req, res) => {
  res.render("brinquedocadastro", { layout: false });
});

// Função de cadastro
app.post("/brinquedo/cadastrar", (req, res) => {
  const nome = req.body.nome;
  const marca = req.body.marca;
  const material = req.body.material;
  const preco = req.body.preco;

  const sql = `INSERT INTO brinquedos (nome, marca, material, preco) VALUES ('${nome}', '${marca}', '${material}','${preco}' )`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/catalogobrinquedos");
    console.log("Brinquedo cadastrado com sucesso!");
  });
});
//---------------------------------------- brinquedocatalogo.hbs -------------------------------------//
// Página onde mostra a lista de todos os brinquedos
app.get("/catalogobrinquedos", (req, res) => {
  const sql = "SELECT * FROM brinquedos";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    console.log(listar);
    res.render("brinquedocatalogo", { layout: false, listar });
  });
});

// Função de buscar, que leva para o brinquedobuscar.hbs
app.post("/resultado/brinquedo/", (req, res) => {
  const { busca } = req.body;

  const sql = `SELECT * FROM brinquedos WHERE id = '${busca}' OR nome LIKE '%${busca}%'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const buscarbrinquedo = data[0];
    res.render("brinquedobuscar", { layout: false, buscarbrinquedo });
  });
});

//---------------------------------------- brinquedobuscar.hbs / brinquedoid.hbs ------------------------------------------//
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
    res.redirect("/catalogobrinquedos");
  });
});

//---------------------------------------- editarbrinquedo.hbs ---------------------------------------//
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
    res.render("brinquedoeditar", { layout: false, editbrinquedo });
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
    res.redirect("/catalogobrinquedos");
  });
});

//---------------------------------------- brinquedoid.hbs ---------------------------------------//
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
    res.render("brinquedoid", { layout: false, listardados });
  });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Funcionarios ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//---------------------------------------- funcionariocadastro.hbs ----------------------------------------------//
// Página Cadastro
app.get("/cadastrofuncionario", (req, res) => {
  res.render("funcionariocadastro", { layout: false });
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
//---------------------------------------- funcionariolista.hbs -------------------------------------//
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
    res.render("funcionariolista", { layout: false, listar });
  });
});

// Função de buscar, que leva para o buscarfuncionario.handlebars
app.post("/resultado/funcionario/", (req, res) => {
  const cpf = req.body.cpf;

  const sql = `SELECT * FROM funcionario WHERE cpf = ${cpf}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const buscarfuncionario = data[0];
    res.render("funcionariobuscar", { layout: false, buscarfuncionario });
  });
});

//---------------------------------------- funcionariobuscar.hbs ------------------------------------------//
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

//---------------------------------------- funcionarioeditar.hbs ---------------------------------------//
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
    res.render("funcionarioeditar", { layout: false, editfuncionario });
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

//---------------------------------------- funcionariocpf.hbs ---------------------------------------//
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
    res.render("funcionariocpf", { layout: false, listardados });
  });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Jogos de mesa ++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//---------------------------------------- jogosdemesacadastro.hbs ----------------------------------------------//
// Página Cadastro
app.get("/cadastrojogosdemesa", (req, res) => {
  res.render("jogosdemesacadastro", { layout: false });
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

    res.redirect("/catalogojogosdemesa");
    console.log("jogodemesa cadastrado com sucesso!");
  });
});
//---------------------------------------- jogosdemesacatalogo.hbs -------------------------------------//
// Página onde mostra a lista de todos os clientes
app.get("/catalogojogosdemesa", (req, res) => {
  const sql = "SELECT * FROM jogodemesa";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    console.log(listar);
    res.render("jogosdemesacatalogo", { layout: false, listar });
  });
});

// Função de buscar, que leva para o buscarjogodemesa.handlebars
app.post("/resultado/jogosdemesa/", (req, res) => {
  const id = req.body.id;

  const sql = `SELECT * FROM jogodemesa WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const buscarjogodemesa = data[0];
    res.render("jogosdemesabuscar", { layout: false, buscarjogodemesa });
  });
});

//---------------------------------------- jogosdemesabuscar.hbs / jogodemesaid.hbs ------------------------------------------//
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
    res.redirect("/catalogojogosdemesa");
  });
});

//---------------------------------------- jogosdemesaeditar.hbs ---------------------------------------//
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
    res.render("jogosdemesaeditar", { layout: false, editjogodemesa });
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
    res.redirect("/catalogojogosdemesa");
  });
});

//---------------------------------------- jogodemesaid.hbs ---------------------------------------//
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
    res.render("jogodemesaid", { layout: false, listardados });
  });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Gift Card ++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
app.get("/cadastrogiftcard", (req, res) => {
  res.render("giftcardcadastro", { layout: false });
});

app.post("/buscar/giftcard/", (req, res) => {
  const { busca } = req.body;

  const sql = `SELECT * FROM giftcard WHERE id = '${busca}' OR nome LIKE '%${busca}%'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listargiftcard = data[0];
    res.render("giftcardid", { layout: false, listargiftcard });
  });
});

app.post("/giftcard/addgiftcard", (req, res) => {
  const { tipo, nome, preco } = req.body;

  const sql = `INSERT INTO giftcard (tipo, nome, preco) VALUES ( '${tipo}' ,'${nome}','${preco}' )`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/catalogogiftcard");
    console.log("Cadastro com sucesso");
  });
});

app.get("/catalogogiftcard", (req, res) => {
  const sql = "SELECT * FROM giftcard";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    res.render("giftcardcatalogo", { layout: false, listar });
  });
});

app.get("/giftcard/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM giftcard WHERE id = '${id}'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listargiftcard = data[0];
    res.render("giftcardid", { layout: false, listargiftcard });
  });
});

app.get("/giftcard/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM giftcard WHERE id = '${id}'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const giftcard = data[0];
    res.render("giftcardeditar", { layout: false, giftcard });
  });
});

app.post("/alterar/updategiftcard", (req, res) => {
  const { id, tipo, nome, preco } = req.body;

  const sql = `UPDATE giftcard SET tipo = '${tipo}', nome = '${nome}', preco = '${preco}' WHERE id = '${id}' `;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    console.log("Alterado com sucesso");
    res.redirect(`/giftcard/${id}`);
  });
});

app.get("/giftcard/remove/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM giftcard WHERE id = '${id}' `;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/catalogogiftcard");
    console.log("excluido com sucesso");
  });
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Action Figure ++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
app.get("/cadastroactionfigure", (req, res) => {
  res.render("actionfigurescadastro", { layout: false });
});

app.post("/buscar/actionfigure/", (req, res) => {
  const { busca } = req.body;

  const sql = `SELECT * FROM actionfigure WHERE id = '${busca}' OR nome LIKE '%${busca}%'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listaractionfigure = data[0];
    res.render("actionfigureid", { layout: false, listaractionfigure });
  });
});

app.post("/actionfigure/insertactionfigure", (req, res) => {
  const { tipo, nome, preco } = req.body;

  const sql = `INSERT INTO actionfigure (tipo, nome, preco) VALUES ( '${tipo}' ,'${nome}','${preco}' )`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/");
    console.log("Cadastro com sucesso");
  });
});

app.get("/catalogoactionfigures", (req, res) => {
  const sql = "SELECT * FROM actionfigure";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    res.render("actionfigurescatalogo", { layout: false, listar });
  });
});

app.get("/actionfigure/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM actionfigure WHERE id = '${id}'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listaractionfigure = data[0];
    res.render("actionfigureid", { layout: false, listaractionfigure });
  });
});

app.get("/actionfigure/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM actionfigure WHERE id = '${id}'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const actionfigure = data[0];
    res.render("actionfigureseditar", { layout: false, actionfigure });
  });
});

app.post("/alterar/updateactionfigure", (req, res) => {
  const { id, tipo, nome, preco } = req.body;

  const sql = `UPDATE actionfigure SET tipo = '${tipo}', nome = '${nome}', preco = '${preco}' WHERE id = '${id}' `;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    console.log("Alterado com sucesso");
    res.redirect(`/actionfigure/${id}`);
  });
});

app.get("/actionfigure/remove/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM actionfigure WHERE id = '${id}' `;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/catalogoactionfigures");
    console.log("excluido com sucesso");
  });
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Empresa ++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
app.get("/cadastroempresa", (req, res) => {
  res.render("empresacadastro", { layout: false });
});

app.post("/buscar/empresa/", (req, res) => {
  const { busca } = req.body;

  const sql = `SELECT * FROM empresa WHERE cnpj = '${busca}' OR nome LIKE '%${busca}%'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listarEmpresa = data[0];
    res.render("empresacnpj", { layout: false, listarEmpresa });
  });
});

app.post("/empresa/insertEmpresa", (req, res) => {
  const { cnpj, nome, email, telefone, local } = req.body;

  const sql = `INSERT INTO empresa (cnpj, nome, email, local, telefone) VALUES ( '${cnpj}' ,'${nome}','${email}','${local}','${telefone}' )`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/listaempresas");
    console.log("Cadastro com sucesso");
  });
});

app.get("/listaempresas", (req, res) => {
  const sql = "SELECT * FROM empresa";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;

    res.render("empresaslista", { layout: false, listar });
  });
});

app.get("/empresa/:cnpj", (req, res) => {
  const cnpj = req.params.cnpj;

  const sql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listarEmpresa = data[0];
    res.render("empresacnpj", { layout: false, listarEmpresa });
  });
});

app.get("/empresa/edit/:cnpj", (req, res) => {
  const cnpj = req.params.cnpj;

  const sql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const empresa = data[0];
    res.render("empresaseditar", { layout: false, empresa });
  });
});

app.post("/alterar/updateEmpresa", (req, res) => {
  const { cnpj, nome, email, telefone, local } = req.body;

  const sql = `UPDATE empresa SET nome = '${nome}', email = '${email}', telefone = '${telefone}', local= '${local}' WHERE cnpj = '${cnpj}' `;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    console.log("Alterado com sucesso");
    res.redirect(`/empresa/${cnpj}`);
  });
});

app.get("/empresa/remove/:cnpj", (req, res) => {
  const cnpj = req.params.cnpj;

  const sql = `DELETE FROM empresa WHERE cnpj = '${cnpj}' `;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/listaempresas");
    console.log("excluido com sucesso");
  });
});

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
