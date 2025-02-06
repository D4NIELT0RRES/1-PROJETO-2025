/****************************************************************************************************
 * Objetivo: Desenvolver as APIs
 * Data:06/02/2025
 * Autor: Daniel
 * Versão: 1.0
 ****************************************************************************************************/

const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next)=>{
    //Permissão de acesso para liberar quais computadores poderão acessar a API
    response.header('Access-Control-Allow-Origin', '*')
    //Permissão de acesso para liberar os verbos da requisição da API
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())//Ativando as configurações dp cors

    next()//Sem o next é impossível concluir a API
})

const contatoUsuario = require('./modulo/funcoes.js')

app.get('/v1/whatsapp/dados_usuario/:phone', cors(), async function(request,response){

    let telefone = request.params.phone  

    let informacoesDoUsuario = contatoUsuario.getListarDadosPorUsuario(telefone)

    if(informacoesDoUsuario){
        response.status(200)
        response.json(informacoesDoUsuario)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/whatsapp/dados_do_profile/:phone', cors(), async function (request,response) {
    

    let telefone = request.params.phone
    let informacoesDoUsuario = contatoUsuario.getDadosDoProfile(telefone)

    if(informacoesDoUsuario){
        response.status(200)
        response.json(informacoesDoUsuario)
        }else{
            response.status(404)
            response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/whatsapp/v1/whatsapp/dados_de_contato_por_usuario/:phone', cors(), async function (request,response) {

    let telefone = request.params.phone
    let informacoesDoUsuario = contatoUsuario.getDadosDeContatoPorUsuario(telefone)

    if(informacoesDoUsuario){
        response.status(200)
        response.json(informacoesDoUsuario)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/whatsapp/dados_de_contato_para_cada_usuario/:phone', cors(), async function (request,response) {
    
    let telefone = request.params.phone
    let informacoesDoUsuario = contatoUsuario.getConversasDeCadaUsuario(telefone)

    if(informacoesDoUsuario){
        response.status(200)
        response.json(informacoesDoUsuario)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/whatsapp/filtrar_por_usuario_e_nome_do_contato/cont/:phone', cors(), async function (request,response) {
  
    let telefone = request.params.phone
    let contato = request.query.cont

    let informacoesDoUsuario = contatoUsuario.getFiltrarPeloUsuarioENome(telefone,contato)

    if(informacoesDoUsuario){
        response.status(200)
        response.json(informacoesDoUsuario)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/whatsapp/filtrar_com_palavra_chave/key/cont/:phone', cors(), async function (request,response) {
    
    let telefone = request.params.phone
    let contato = request.query.cont
    let chave = request.query.key

    let informacoesDoUsuario = contatoUsuario.pesquisarPalavraChave(telefone,chave,contato)

    if(informacoesDoUsuario){
        response.status(200)
        response.json(informacoesDoUsuario)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.listen('8080', function(){
    console.log('API AGUARDANDO REQUISIÇÕES...')
})