import * as hapi from 'hapi'
import Connection from './src/db/Connection';
import SpartanService from './src/service/SpartanService';
Connection.connect()
import Schemas from './src/db/Schemas'
import Spartan from './src/entities/Spartan';
import * as Mongoose from 'mongoose';
import * as Joi from 'joi'

(<any>Mongoose).Promise = global.Promise
class Server {
    _server: any;
    _spartanService: SpartanService;
    /**
     *
     */
    constructor() {
        this._spartanService = new SpartanService(Schemas.Spartan)
        this._server = new hapi.Server()
    }
    buildRoutes() {
        this._server.route([{
            method: 'GET',
            path: '/',
            handler: async (req, reply): Promise<hapi.Response> => {
                const result = this._spartanService.list()
                return await reply(result)
            }
        },

        {
            method: 'POST',
            path: '/',
            config: {
                handler: async (req, reply): Promise<hapi.Response> => {
                    const spartan = <Spartan>req.payload
                    const result = this._spartanService.create(spartan)
                    return await reply(result)
                },
                validate: {
                    payload: {
                        age: Joi.number().required(),
                        name: Joi.string().max(15).min(5).required()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/{id}',
            handler: async (req, reply) => {
                const id = req.params.id
                const result = this._spartanService.findOne(id)
                return reply(result)
            }
        },
        {
            method: 'DELETE',
            path: '/{id}',
            handler: async (req, reply) => {
                const id = req.params.id
                const result = this._spartanService.delete(id)
                return reply(result)
            }
        },
        {
            method: 'PUT',
            path: '/{id}',
            config: {
                handler: async (req, reply) => {
                    const id = req.params.id
                    const data = <Spartan> req.payload
                    const result = this._spartanService.update(id, data)
                    return reply(result)
                },
                validate: {
                    payload: {
                        age: Joi.number().required(),
                        name: Joi.string().max(15).min(5).required()
                    }
                }
            }
        }

        ])

    }
    connect() {
        this._server.connection({ port: 3000 })
        this.buildRoutes()
        this._server.start((): void => {
            console.log('server running at: 3000')
        })

    }

}
new Server().connect()