0//imports
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
const port = 3000

//express
const app = express()

//configurar o handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.use(
    express.urlencoded({
        extended: true
        
}) 
)


//rotas

//rota inicio
app.get('/', (req, res) => {
    res.render('home', { layout: false })

})

//rota para a busca

app.get('/busca', (req, res) => {
    res.render('busca', { layout: false })

})

//rota de busca (busc) que enviar para view produto produto.handlebars
app.post('/buscar/', (req, res) => {
    
    const {busca} = req.body
    
    const sql = `SELECT * FROM giftcard WHERE id = '${busca}' OR nome LIKE '%${busca}%'`
 
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const listargiftcard = data[0]
        res.render('giftcard', {  layout: false, listargiftcard } )

    })
})

// inserir dados (rota)
app.post('/giftcard/insertgiftcard', (req,res)=>{
    const { tipo, nome, preco } = req.body
    
    const sql = `INSERT INTO giftcard (tipo, nome, preco) VALUES ( '${tipo}' ,'${nome}','${preco}' )`
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }

        res.redirect('/')
        console.log("Cadastro com sucesso")
})
})

// consulta geral
app.get('/giftcards', (req,res) => {
    const sql = 'SELECT * FROM giftcard'

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const listar = data
 

        res.render('giftcards', { layout: false, listar})
    })
})


// consuta um registro pelo id (giftcard.handlebars)
app.get('/giftcard/:id', (req,res) => {
    const id = req.params.id

    const sql = `SELECT * FROM giftcard WHERE id = '${id}'`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const listargiftcard = data[0]
        res.render('giftcard',{ layout:false, listargiftcard })
    })
})

//ROTA PARA MOSTRAR OS DADOS QUE SERAO EDITADOS  NO  REGISTRO (SEM A VIEW)

app.get('/giftcard/edit/:id', (req, res) =>{
    const id = req.params.id 

    const sql = `SELECT * FROM giftcard WHERE id = '${id}'`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
    
        const giftcard = data[0] 
        res.render('edit', {layout: false, giftcard})
    })
})

//ROTA QUE EDITA OS DADOS

app.post('/alterar/updategiftcard', (req,res) => {

    
    const { id, tipo, nome, preco} = req.body
    

    const sql = `UPDATE giftcard SET tipo = '${tipo}', nome = '${nome}', preco = '${preco}' WHERE id = '${id}' `

    
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }

        console.log("Alterado com sucesso")
        res.redirect(`/giftcard/${id}`)
})
})

//Remover giftcard

app.get('/giftcard/remove/:id', (req,res) =>{
    const id =req.params.id

    const sql = `DELETE FROM giftcard WHERE id = '${id}' `

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return 
        }
        
        res.redirect('/giftcards')
        console.log("excluido com sucesso")

    })
})


    
    


// conexao banco de dados
const conn = mysql.createConnection({
    host: 'localhost',    
    port: '3306',
    user:'root',
    password: '',
    database: 'infanciagirassol'

})

conn.connect(function(err) {
    if(err){
        console.log(err)
    }

    console.log('Conectado com sucesso!')
    
})

// servidor
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
