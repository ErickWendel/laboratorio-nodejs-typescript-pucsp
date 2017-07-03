//importamos o modulo Hapi.js
import * as hapi from 'hapi'

//importamos o joi, para validacao dos objetos
import * as joi from 'joi'
//importamos o mongoose para manipular acoes do banco de dados
import * as mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/guerreiros')
const connection = mongoose.connection  
connection.once('open', () => {
    console.log('mongodb está ativo!!!')
})
connection.once('error', () => {
    console.log('deu ruim!!!')
})

//o schema, define a forma do objeto dentro
//da collection (similar as tabelas do SQL)
const schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    insertedDate: {
        // se nao colocar o tipo DÁ PAU
        type: Date,
        default: new Date()
    }
})
const model = mongoose.model('guerreiro', schema)


const server = new  hapi.Server()
server.connection({port: 3000})
//passsamos o array de rotas
server.route([
    {
        //definimos o path (caminho da rota)
        path: '/',
        //o método de execução 
        method: 'GET',
        //a açao para quando for get
        handler: async (req, reply) => {
            reply(await model.find())
        }
    },
    {
        //definimos o path (caminho da rota)
        path: '/{id}',
        //o método de execução 
        method: 'GET',
        //a açao para quando for get
        handler: async (req, reply) => {
            const id = req.params.id
            return reply(await model.findById(id))
        }
    },
    {
        //definimos o path (caminho da rota)
        path: '/{id}',
        //o método de execução 
        method: 'DELETE',
        //a açao para quando for get
        handler: async (req, reply) => {
            const id = req.params.id
            await model.remove({_id: id})
            return reply(`Id: ${id} removido com sucesso!`)
        }
    },
    {
        path: '/',
        //Method POST é usado para cadastro de informacoes
        method: 'POST',
        config: {
            //handler é a função que é disparada quando chamar a rota
            //adicionamos o async para trabalhar 
            //com a funcao assincrona
            handler: async (req, reply) =>{
                //o objeto payload usamos para pegar os dados 
                //do corpo da requisição
                const dados = req.payload
                //pegamos os dados da requisicao
                const item = new model(dados)
                const resposta = await item.save()
                return reply(resposta)
            },
            //o validate -> serve para validar os dados da requisição

            validate: {
                payload: {
                    // com o joi, validamos o tamanho da string
                    //e falamos que é obrigatorio
                    nome: joi.string().max(10).min(2).required(),
                    idade: joi.number().required()
                }
            }
        }
    },
    {
        path: '/{id}',
        method: 'PUT',
        config: {
            //handler é a função que é disparada quando chamar a rota
            //adicionamos o async para trabalhar 
            //com a funcao assincrona
            handler: async (req, reply) =>{
                //o objeto payload usamos para pegar os dados 
                //do corpo da requisição
                const dados = req.payload
                const id = req.params.id
                //pegamos os dados da requisicao
                const update = await model.update({_id: id}, dados)
                return reply(update)
            },
            //o validate -> serve para validar os dados da requisição

            validate: {
                payload: {
                    // com o joi, validamos o tamanho da string
                    //e falamos que é obrigatorio
                    nome: joi.string().max(10).min(2).required(),
                    idade: joi.number().required()
                }
            }
        }
    }
])
//startamos o servidor
server.start(() => {
    console.log('rodando com hapi')
})