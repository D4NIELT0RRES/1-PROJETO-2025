/****************************************************************************************************
 * Objetivo: Desenvolver uma API para um projeto do WhatsApp
 * Data:30/01/2025
 * Autor: Daniel
 * Versão: 1.0
 ****************************************************************************************************/

/*
    Para criar uma API devemos instalar:

    express        npm install express --save         --> Serve para criar uma API
    cors           npm install cors --save            --> Serve para configurar as permissões da API
    body-parser    npm install body-parser --save     --> Serve para manipular os dados do body da API
*/


const listandoContatos = require('./contatos.js')

const getListarDadosPorUsuario = function(telefone){
    
    let inicio = listandoContatos.contatos.whats_users
    let entrada = telefone
    let status = false
    let dados = {}


    inicio.forEach(function(item){
        if(String(item.number) === entrada){
            status = true

            dados.id = item.id
            dados.account = item.account
            dados.inicio_de_conta = item.created_since.start
            dados.fim_de_conta = item.created_since.end
            dados.numero = item.number
        }
    })

    if(status){
        return dados
    }else{
        return false
    }


}
const getDadosDoProfile = function (telefone){
    let inicio = listandoContatos.contatos.whats_users
    let entrada = telefone
    let status = false
    let dados = {}

    inicio.forEach(function(item){
        if(String(item.number) === entrada){
            status = true

            dados.nick = item.nickname
            dados.foto = item.profile_image
            dados.corDoFundo = item.background
        }
    })

    if(status){
        return dados
    }else{
        return false
    }
}
const getDadosDeContatoPorUsuario = function(telefone){
    
    let inicio = listandoContatos.contatos.whats_users
    let entrada = telefone
    let status = false
    let contatos = []

    inicio.forEach(function(item){
        if(String(item.number) == entrada ){
            status = true

            item.contacts.forEach(function(itemDoContato){
                let dados = {}
                 dados.nome = itemDoContato.name
                 dados.descricao = itemDoContato.description
                 dados.imagem = itemDoContato.image

                 contatos.push(dados)
            })
        }
    })

    if(status){
        return contatos
    }else{
        return false
    }
}
const getConversasDeCadaUsuario = function(telefone){

    let inicio = listandoContatos.contatos.whats_users
    let entrada = telefone
    let status = false
    let contatos = []
    let mensagem = []

    inicio.forEach(function(item){
        if(String(item.number) == entrada){
            status = true
            contatos.push(item.contacts)
            
        }
    })

    if(status){
        return contatos
    }else{
        return false
    }

}

const getFiltrarPeloUsuarioENome = function(telefone, contato){
    let inicio = listandoContatos.contatos.whats_users
    let entrada = String(telefone)
    let segundaEntrada = String(contato)
    let status = false
    let conversas = {

        nome:entrada,
        contato: segundaEntrada,
        mensagens:[]
    }

    inicio.forEach(function(item){
        item.contacts.forEach(function(itemDoContato){
            if(String(item.number) === entrada && String(itemDoContato.name) === segundaEntrada){
                status = true
                conversas.mensagens.push(itemDoContato.messages)
            }
        })
    })

    if(status){
        return conversas
    }else{
        return false
    }
}

const pesquisarPalavraChave = function(telefone, palavra, contato){

    let inicio = listandoContatos.contatos.whats_users
    let phone = String(telefone)
    let contat = String(contato)
    let palav = String(palavra)
    let status = false

    let filtrando = {
        nome: phone,
        contato: contat,
        palavra_chave: palav,
        mensagens: []
    }

    inicio.forEach(function(item){
        item.contacts.forEach(function(itemDoContato){
            if(String(itemDoContato.name) == contat && (item.number) == phone){
                status = true
                itemDoContato.messages.forEach(function(itemMensagem){
                    if(String(itemMensagem.content).toLowerCase().includes(palav.toLowerCase())){
                        status = true
                        filtrando.mensagens.push(itemMensagem)
                    }
                })
            }
        })
    })

    if(status == true){
        return filtrando
    }else{
        return false
    }
    
}

console.log(getFiltrarPeloUsuarioENome('11987876567','Ana Maria'))

module.exports = {

    getListarDadosPorUsuario,
    getDadosDoProfile,
    getDadosDeContatoPorUsuario,
    getConversasDeCadaUsuario,
    getFiltrarPeloUsuarioENome,
    pesquisarPalavraChave
}