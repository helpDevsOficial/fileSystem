const express = require('express');
const app = express();
const fs = require('fs');


//Criando a rota que irá executar a leitura do arquivo teste.txt de forma assíncrona
app.get('/assincrono', function (req, res) {
    //chamando o método do módulo fs responsável por realizar a leitura de um arquivo
    fs.readFile('teste.txt', function (err, data) {
        if (err) {
            //Verificando se existe um erro, caso exista é lançado uma exceção
            throw err;
        }
        // Mostrando o resultado da leitura
        res.write(data);
        res.end();
    });
    res.write('A aplicacao nao ficou aguardando a finalizacao da leitura do arquivo')
});


//Criando a rota que irá executar a leitura do arquivo teste.txt de forma síncrona
app.get('/sincrono', function (req, res) {
    try {
        res.write('Iniciando a leitura');
        //chamando o método do módulo fs responsável por realizar a leitura de um arquivo de forma síncrona
        let data = fs.readFileSync('teste.txt')
        // Mostrando o resultado da leitura
        res.write(data);
        res.write('Finalizando a leitura');
        res.end();
    } catch (error) {
        throw error
    }
});
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Aplicação está rodando na porta', app.get('port'));
});