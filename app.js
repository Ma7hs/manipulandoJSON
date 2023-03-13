/*
Objetivo: Criar uma API para manipulação de dados de ESTADOS e CIDADES
Autor: Matheus Siqueira
Data: 10/03/2023
Versão: 1.0


Express - Vamos utilizar o Express que permite uma integração entre o protocolo HTTP com o código
    O EXPRESS faz a função de:
        1 ----> GET (Recebe os dados)
        2 ----> POST (Inserir novos dados )
        3 ----> DELETE (Apagar dados existentes)
        4 ----> PUT (Atualizar dados existentes)


Cors - Gerenciador de permissões para o protocolo HTTP
    npm install cors --save        
    

Body-parser - É uma dependência que permite manipular dados enviados pelo BODY da requisição
    npm install body-parser --save

*/


//Import das dependências necessárias para criar a API
const express = require('express'); //Requisições
const cors = require('cors'); //Permissão de Requisições
const bodyParser = require('body-parser'); //Manipular os dados da requisição
const {
    request,
    response
} = require('express');
const estados_cidades = require('./modulo/estados_cidades.js');

//Cria um objeto com as informações da CLASS EXPRESS
const app = express();

app.use((request, response, next) => {

    //Permisão de gerenciamento da origem das requisições
    response.header('Access-Control-Allow-Origin', '*'); //Nesse caso o * diz que a API será pública
    response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS'); // Aqui colocamos quais permissões iremos utilizar dentro da nossa aplicacao

    //Ativo no CORS das requisições as permissões estabelecidas
    app.use(cors());

    //Usamos o NEXT para ir para a próxima FUNCTION que teremos dentro da aplicação
    next();
});

//Criar endPoints

//endPoint para listar os estados
app.get('/getEstados', cors(), async function (request, response, next) {

    const estadosCidades = require('./modulo/estados_cidades.js');
    let listaDeEstados = estadosCidades.getListaDeEstados();
    if (listaDeEstados) {
        response.json(listaDeEstados);
        response.status(200);
    } else {
        response.status(500)
    }
})


app.get('/estado/sigla/:uf', cors(), async function (request, response, next) {
    const estadosCidades = require('./modulo/estados_cidades.js');
    let siglaEstado = request.params.uf.toUpperCase();
    let dadosEstado = {};
    let statusCode;

    if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
        {
           dadosEstado.message =  "Não foi possível processar a requisição pois a sigla do estado não foi encontrada ou não atende a quantidade de 2 caracteres"
            statusCode =  400
        }
    } else {
        let estado = estadosCidades.getDadosEstado(siglaEstado)
        if (estado) {
            statusCode =  200
            dadosEstado = estado
        } else {
            statusCode = 404
        }
    }
    response.status(statusCode)
    response.json(dadosEstado)
})

//Permite carregar os endpoints criado  s e aguardar as requisições 
// pelo protocolo HTTP na porta 8080

app.get('/estado/capital/:uf', cors(), async function(request, response, next){
    const estadosCidades = require('./modulo/estados_cidades.js');
    let siglaEstado = request.params.uf.toUpperCase();
    let dadosEstado = {};
    let statusCode;

    if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
        {
           dadosEstado.message =  "Não foi possível processar a requisição pois a sigla do estado não foi encontrada ou não atende a quantidade de 2 caracteres"
            statusCode =  400
        }
    } else {
        let estado = estadosCidades.getCapitalEstado(siglaEstado)
        if (estado) {
            statusCode =  200
            dadosEstado = estado
        } else {
            statusCode = 404
        }
    }
    response.status(statusCode)
    response.json(dadosEstado)

})

app.get('/regiao/:regiao', cors(), async function(request, response, next){
    const estadosCidades = require('./modulo/estados_cidades.js');
    let regiao = request.params.regiao
    let dadosRegiao = {};
    let statusCode;

    if (regiao == '' || regiao == undefined || !isNaN(regiao)) {
        {
           dadosRegiao.message =  "Não foi possível processar a requisição pois a região não foi encontrada!"
            statusCode =  400
        }
    }else{
        let regiaoEstados = estadosCidades.getEstadoRegiao(regiao)
        if(regiao){
            statusCode = 200;
            dadosRegiao =  regiaoEstados
        }else{
            statusCode = 400
        }
    } 

    response.status(statusCode)
    response.json(dadosRegiao)

})

app.get('/capitais', cors(), async function(request, response, next){
    const estadosCidades = require('./modulo/estados_cidades.js');
    let capitaisPais =  {}
    let statusCode;

    let listaCapitais = estadosCidades.getCapitaisPais()
    if(listaCapitais){
        capitaisPais = listaCapitais
        statusCode = 400
    }else{
        statusCode = 200
    }

    response.json(capitaisPais)
    response.json(statusCode)

})


app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080')
})